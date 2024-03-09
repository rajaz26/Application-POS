import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert
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
import { createBill, createBillItem, updateBill, updateBillItem } from '../src/graphql/mutations';
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
  const [cameraActive, setCameraActive] = useState(true);
  const [cameraKey, setCameraKey] = useState(1);

  const [version, setVersion] = useState(null);
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
  const refreshCamera = () => {
    setCameraKey(prevKey => prevKey + 1);
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
toggleBillModal();    
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
        
        <Text style={styles.scannedText}>Total Bill Amount: PKR {totalBillAmount.toFixed(2)}</Text>
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
  
        const existingProductIndex = scannedProducts.findIndex(p => p.barcode === barcodeValue);
  
        if (existingProductIndex !== -1) {
          console.log("Existing barcode");
          console.log("Bill item before updating:", scannedProducts[existingProductIndex]);
  
          let updatedScannedProducts = [...scannedProducts];
          let productToUpdate = updatedScannedProducts[existingProductIndex];
          
          productToUpdate.quantity += 1;
          productToUpdate.subtotal = productToUpdate.quantity * productToUpdate.price; 
          try {
              const response = await client.graphql({
                  query: updateBillItem,
                  variables: {
                      input: {
                          id: productToUpdate.id,
                          quantity: productToUpdate.quantity,
                          subtotal: productToUpdate.subtotal,
                          _version: productToUpdate._version,
                      },
                  },
                  authMode: 'apiKey',
              });
  
              productToUpdate._version = response.data.updateBillItem._version;
              console.log("Bill item after updating:", productToUpdate);
  
              setScannedProducts(updatedScannedProducts);
          } catch (error) {
              console.error("Error updating bill item:", error);
          }
      } else {
          console.log("New barcode");
  
            const productDetailsResponse = await client.graphql({
                query: ProductByBarcode,
                variables: { barcode: barcodeValue },
                authMode: 'apiKey',
            });
  
            if (productDetailsResponse.data.productByBarcode.items.length > 0) {
                const productDetails = productDetailsResponse.data.productByBarcode.items[0]; 
                
                const billId = await ensureBillCreated(); 
                const billItemResponse = await client.graphql({
                    query: createBillItem,
                    variables: {
                        input: {
                            productBillItemsId: productDetails.id,
                            quantity: 1,
                            productPrice: productDetails.price,
                            subtotal: productDetails.price, 
                            billItemsId: billId, 
                            manufacturer:productDetails.manufacturer,
                            category:productDetails.category,
                        },
                    },
                    authMode: 'apiKey',
                });
                console.log("New Bill Item created ", billItemResponse );
           
                const newProductDetails = {
                    productId:productDetails.id,
                    price:productDetails.price,
                    quantity: 1,
                    id: billItemResponse.data.createBillItem.id,
                    _version: billItemResponse.data.createBillItem._version,
                    subtotal: productDetails.price,
                    barcode: barcodeValue,
                    _deleted: billItemResponse.data.createBillItem._deleted,
                    name: productDetails.name,
                    barcode:productDetails.barcode,
                };
                setScannedProducts([...scannedProducts, newProductDetails]);
            }
        }
    } catch (error) {
        console.error("Error handling barcode scan:", error);
    }
  
    if (manualBarcode !== '') setManualBarcode('');
    console.log("Scanned Products:", scannedProducts);
  };
  
  const ensureBillCreated = async () => {
    if (!currentBillId) {
        const userAttributes = await fetchUserAttributes();
        const billResponse = await client.graphql({
            query: createBill,
            variables: {
                input: {
                    cashier: userAttributes.sub,
                    totalAmount: 0,
                    status: 'PENDING',
            
                },
            },
            authMode: 'apiKey',
        });
        const newBillId = billResponse.data.createBill.id;
        setCurrentBillId(newBillId);
        setVersion(billResponse.data.createBill._version);
        return newBillId;
    }
    return currentBillId;
  };
  
useEffect(() => {
  const total = scannedProducts.reduce((acc, curr) => acc + (curr.subtotal || 0), 0);
  setTotalBillAmount(total);
}, [scannedProducts]);


const handleConfirmPressed = () => {
  console.log("Accumulated product details:", scannedProducts, "Total Bill Amount:", totalBillAmount);
    if (scannedProducts.length > 0) {
      navigation.navigate('ConfirmBill', {
        scannedProductsList: scannedProducts,
        totalBillAmountValue: totalBillAmount,
        currentBillId: currentBillId,
        version: version,
      });
      setScannedProducts([]);
    } else {
      Alert.alert('Scan a product first.');
    
  };
};

  
  React.useEffect(() => {
    barcodes.forEach(handleBarcodeScanned);
  }, [barcodes]);

  useEffect(() => {
    if (route.params?.scannedProductsList) {
      setScannedProducts(route.params.scannedProductsList);
    }
  }, []);
  
  const handleRefreshConfirm = () => {
    Alert.alert(
      "Refresh List",
      "Are you sure you want to refresh the scanned products list? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => refreshScannedProductsList() }
      ],
      { cancelable: false }
    );
  };
  
  const refreshScannedProductsList = () => {
    setScannedProducts([]);
    console.log("Scanned products list has been refreshed.");
  };

  

  return (
    device != null &&
    hasPermission && (
      <View style={styles.container}>

<Camera
    key={cameraKey}
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
              <Ionic size={25} color={'white'} name="print-outline" />
              <Text style={styles.buttonTextShow}>Confirm</Text>
            </TouchableOpacity>
        )}
        {scannedProducts.length > 0 && (
            <TouchableOpacity  style={styles.confirmButton} onPress={handleRefreshConfirm}>
              <Ionic size={25} color={'white'} name="refresh-outline" />
              <Text style={styles.buttonTextShow}>Clear</Text>
            </TouchableOpacity>
        )}

<TouchableOpacity onPress={refreshCamera} style={styles.confirmButton}>
<Ionic size={25} color={'white'} name="camera-outline" />
  <Text style={styles.buttonTextShow}>Refresh</Text>
  <Text style={styles.buttonTextShow}>Camera</Text>
</TouchableOpacity>

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
    backgroundColor: COLORS.secondary, 
  },
  scanButtonNotPressed: {
    backgroundColor: COLORS.primary, 
  },
});
