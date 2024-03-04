import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button,
} from 'react-native';
// import beep from '../android/app/src/main/res/raw/beep.mp3';
// import SoundPlayer from 'react-native-sound-player'
// import TrackPlayer from 'react-native-track-player';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { COLORS } from '../assets/theme';
import { useNavigation } from '@react-navigation/native'; 
import Ionic from 'react-native-vector-icons/Ionicons';
import {generateClient} from 'aws-amplify/api';
import Sound from 'react-native-sound';
import { createBill, createBillItem, updateBill } from '../src/graphql/mutations';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
export default function Scan({route}) {
  Sound.setCategory('Playback');
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(true);
  const [scannedBarcodes, setScannedBarcodes] = React.useState([]);
  const [totalBillAmount, setTotalBillAmount] = useState(0);
  const [scannedProducts, setScannedProducts] = useState([]);
  const [manualEntryModalVisible, setManualEntryModalVisible] = React.useState(false);
  const [manualBarcode, setManualBarcode] = React.useState('');
  const [billModalVisible, setBillModalVisible] = React.useState(false);
  const [currentBillId, setCurrentBillId] = useState(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const client = generateClient();
   // Assume these are part of your component's state or global variables

  const navigation = useNavigation();
  const [frameProcessor, barcodes] = useScanBarcodes(
    [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.CODE_39,
      BarcodeFormat.CODE_128,
    ],
    {
      checkInverted: true,
    }
  );
  const ProductByBarcode = /* GraphQL */ `
  query ProductByBarcode($barcode: String!) {
    productByBarcode(barcode: $barcode) {
      items {
        id
        name
        barcode
        image
        price
        manufacturer
        category
        warehouseQuantity
        shelfQuantity
      }
    }
  }
  
`;

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);


  const toggleScanning = () => {
    setIsScanning((prevState) => !prevState);
  };
  const startScanning = () => {
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };
  const toggleManualEntryModal = () => {
    setManualBarcode('');
    setManualEntryModalVisible(!manualEntryModalVisible);
  };

  const toggleBillModal = () => {
    setBillModalVisible(!billModalVisible);
  };

  const addManualBarcode = async () => {
    if (manualBarcode) {
  
      const manualBarcodeObject = { displayValue: manualBarcode, format: 'MANUAL' };
      await handleBarcodeScanned(manualBarcodeObject); 

      setManualBarcode('');
      toggleManualEntryModal(); 
    }
  };
  
  const showScannedBarcodes = async () => {
    if (!currentBillId) {
        console.error("No bill available to finalize.");
        return;
    }

    try {
        // Calculate the total bill amount from scanned products
        const totalBillAmount = scannedProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);
        
        console.log("Finalizing Bill with Total Amount:", totalBillAmount);
        
        // Update the existing bill with the total amount and change its status to "PAID"
        const updateBillInput = {
            id: currentBillId,
            totalAmount: totalBillAmount,
            status: "PAID",
            
        };

        const updateBillResponse = await client.graphql({
            query: updateBill,
            variables: { input: updateBillInput },
            authMode: 'apiKey',
        });

        console.log("Bill Finalized Successfully", updateBillResponse);
        
        // Reset currentBillId for future transactions
        setCurrentBillId(null);

        // Clear scanned products for future transactions
        
        setScannedProducts([]); // Assuming you have a setter to update the UI or state

        // Optionally, display a success message or navigate the user to a confirmation screen

    } catch (error) {
        console.error("Error finalizing the bill:", error);
    }
    finally{
      toggleBillModal(); 
    }
    // Close the bill modal or perform any other UI cleanup
    // Ensure toggleBillModal is defined and accessible
};

  const renderScannedBarcodes = () => {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Scanned Products:</Text>
        {scannedProducts.map((product, index) => (
          <Text key={index} style={styles.scannedText}>
            {`${product.name} (Quantity: ${product.quantity})`}
          </Text>
        ))}
        <TouchableOpacity onPress={toggleBillModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const handleBarcodeScanned = async (barcode) => {
    if (!isScanning && manualBarcode === '') return;
    setIsScanning(false);

    try {
        const barcodeValue = barcode.displayValue || manualBarcode;
        console.log("Scanned barcode:", barcodeValue);

        // Fetch product details based on the barcode
        const productDetailsResponse = await client.graphql({
            query: ProductByBarcode,
            variables: { barcode: barcodeValue },
            authMode: 'apiKey',
        });

        if (productDetailsResponse.data.productByBarcode.items.length > 0) {
            const productDetails = productDetailsResponse.data.productByBarcode.items[0];

            // Ensure a Bill is created for the first scanned product
            const ensureBillCreated = async () => {
                if (!currentBillId) {
                    const userAttributes = await fetchUserAttributes();
                    const billResponse = await client.graphql({
                        query: createBill,
                        variables: {
                            input: {
                                cashier: userAttributes.sub, // Assuming fetchUserAttributes returns an object with a sub property
                                totalAmount: 0, // Will be updated when finalizing the bill
                                status: 'PENDING',
                            },
                        },
                        authMode: 'apiKey',
                    });
                    const newBillId = billResponse.data.createBill.id;
                    setCurrentBillId(newBillId); // Update the currentBillId state
                    console.log("New Bill Created with ID:", newBillId);
                    return newBillId; // Return newBillId for immediate use
                }
                return currentBillId;
            };

            const billId = await ensureBillCreated(); // Ensure bill is created and get the billId

            // Create a BillItem for the scanned product using the ensured billId
            await client.graphql({
                query: createBillItem,
                variables: {
                    input: {
                        productBillItemsId: productDetails.id,
                        quantity: 1, // Or actual scanned quantity
                        productPrice: productDetails.price,
                        subtotal: productDetails.price, // For 1 item; adjust for actual quantity
                        billItemsId: billId, // Associate with the current or new Bill
                    },
                },
                authMode: 'apiKey',
            });

            console.log("BillItem created for product", productDetails.name);

            // Add the product to scannedProducts state
            const updatedProduct = { ...productDetails, quantity: 1 }; // Adjust for actual quantity
            setScannedProducts((prevProducts) => [...prevProducts, updatedProduct]);
        }
    } catch (error) {
        console.error("Error handling barcode scan:", error);
    }

    if (manualBarcode !== '') {
        setManualBarcode('');
    }

    // Update the total bill amount
    const total = scannedProducts.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    setTotalBillAmount(total);
};



  useEffect(() => {
    const total = scannedProducts.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    setTotalBillAmount(total);
}, [scannedProducts]);

const handleConfirmPressed = () => {
  console.log("Accumulated product details:", scannedProducts, "Total Bill Amount:", totalBillAmount);
  navigation.navigate('ConfirmBill', { scannedProducts: scannedProducts, totalBillAmount: totalBillAmount });
};

  
  React.useEffect(() => {
    barcodes.forEach(handleBarcodeScanned);
  }, [barcodes]);

  React.useEffect(() => {
    if (route.params?.scannedProducts) {
        // Merge passed scannedProducts with current list, or handle as needed
        setScannedProducts([...scannedProducts, ...route.params.scannedProducts]);
    }
}, [route.params?.scannedProducts]);

  return (
    device != null &&
    hasPermission && (
      <View style={styles.container}>
      <Camera
  style={StyleSheet.absoluteFill}
  device={device}
  isActive={true} 
  frameProcessor={frameProcessor}
  frameProcessorFps={5}
/>
        
        {/* <TouchableOpacity
          onPress={toggleScanning}
          style={[
            styles.scanButton,
            isScanning ? styles.continueButton : styles.startButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              isScanning && styles.continueButtonText,
            ]}
          >
            {isScanning ? 'Continue Scanning' : 'Start Scanning'}
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPressIn={startScanning} // Start scanning on button press
          onPressOut={stopScanning} // Stop scanning on button release
          style={[
            styles.scanButton,
            isScanning ? styles.scanButtonPressed : styles.scanButtonNotPressed, // Change style based on scanning state
          ]}
        >
          <Text style={styles.buttonText}>
            {isScanning ? 'Scanning...' : 'Hold to Scan'}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>

        
        <TouchableOpacity
          onPress={toggleManualEntryModal}
          style={styles.showModal}
        >
          <Ionic size={25} color={'white'} name="create-outline" />
          <Text style={styles.buttonTextShow}>Manual</Text>
        </TouchableOpacity>
        
        
        
        {scannedProducts.length > 0 && (
          <TouchableOpacity onPress={showScannedBarcodes} style={styles.showButton}>
            <Ionic size={25} color={'white'} name="newspaper-outline" />
            <Text style={styles.buttonTextShow}>Bill</Text>
          </TouchableOpacity>
        )}
          {scannedProducts.length > 0 && (
            <TouchableOpacity  style={styles.confirmButton} onPress={handleConfirmPressed}>
              <Ionic size={25} color={'white'} name="newspaper-outline" />
              <Text style={styles.buttonTextShow}>Confirm</Text>
            </TouchableOpacity>
        )}
       </View>
        <Modal
          visible={manualEntryModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleManualEntryModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Barcode Manually:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter barcode"
              onChangeText={(text) => setManualBarcode(text)}
              value={manualBarcode}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={addManualBarcode} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleManualEntryModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        <Modal
          visible={billModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={toggleBillModal}
        >
          {renderScannedBarcodes()}
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scanButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 30,
    right: 5,
    borderRadius: 10,
  },
  startButton: {
    backgroundColor: COLORS.primary,
  },
  continueButton: {
    backgroundColor: COLORS.secondary,
  },
  continueButtonText: {
    color: COLORS.primary,
  },
  manualCodeEntryButton: {
    backgroundColor: COLORS.SECONDARY, // Updated button color
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, // Rounded button
  },
  buttonContainer:{
    position: 'absolute',
    right: 20,
    top: 120,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'space-evenly',
    paddingVertical:20,
  },
  buttonText: {
    color: 'white',
    top: 2,
    fontFamily: 'Poppins-Regular',
  },
  showButton: {
    // position: 'absolute',
    // right: 30,
    // top: 50,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30,
  },
  showModal: {
    // position: 'absolute',
    // right: 20,
    // top: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30,
  },
  confirmButton: {
    // position: 'absolute',
    // right: 20,
    // top: 200,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:30,
  },
  buttonTextShow: {
    color: 'white',
    top: 2,
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    color: COLORS.primary,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 200, // Adjust width as needed
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: COLORS.SECONDARY, // Updated button color
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, // Rounded button
    margin: 5,
  },
  modalButtonText: {
    color: COLORS.PRIMARY, // Updated text color
    fontFamily: 'Poppins-Regular', // Updated font
  },
  modalText: {
    color: COLORS.primary, // Updated text color
    fontFamily: 'Poppins-Regular', // Updated font
    fontSize: 16,
    marginBottom: 5,
  },
  scannedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    paddingHorizontal :20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, 
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  scanButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 30,
    right: 5,
    borderRadius: 10,
  },
  scanButtonPressed: {
    backgroundColor: COLORS.secondary, // Color when button is pressed
  },
  scanButtonNotPressed: {
    backgroundColor: COLORS.primary, // Default color
  },
});
