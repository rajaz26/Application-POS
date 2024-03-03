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
  const devices = useCameraDevices();
  const device = devices.back;
  const client = generateClient();
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
// Initialize the sound
// const beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     console.log('Failed to load the sound', error);
//     return;
//   }
//   console.log('Duration in seconds: ' + beep.getDuration() + 'number of channels: ' + beep.getNumberOfChannels());
// });

// const playSound=async()=>{

  
//   await TrackPlayer.setupPlayer();

//     // Add a track to the queue
//     await TrackPlayer.add({
//         id: 'trackId',
//         url: require('../assets/sounds/beep.mp3'),
//         title: 'Track Title',
//         artist: 'Track Artist',
       
//     });

//     // Start playing it
//     await TrackPlayer.play();
// }
// console.log("beep: : ",beep);
// var whoosh = new Sound('beep', Sound.MAIN_BUNDLE, (error) => {
//   const v=new Sound(beep, Sound.MAIN_BUNDLE);
//   console.log("v:",v);
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
 
//   console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

//   // Play the sound with an onEnd callback
//   whoosh.play((success) => {
//     if (success) {
//       console.log('successfully finished playing');
//     } else {
//       console.log('playback failed due to audio decoding errors');
//     }
//   });
// });

// }
// const playBeep = () => {
//   beep.play((success) => {
//     if (success) {
//       console.log('Successfully finished playing');
//     } else {
//       console.log('Playback failed due to audio decoding errors');
//     }
//   });
// };

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
  

  const showScannedBarcodes = () => {
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
        <TouchableOpacity onPress={toggleBillModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const handleBarcodeScanned = async (barcode) => {
    if (!isScanning && manualBarcode === '') {
      return;
    }
    setIsScanning(false);
  
    try {
      const barcodeValue = barcode.displayValue || manualBarcode;
      console.log("Scanned barcode:", barcodeValue);
  
      const productDetailsResponse = await client.graphql({
        query: ProductByBarcode,
        variables: { barcode: barcodeValue },
        authMode: 'apiKey',
      });
      console.log("Product",productDetailsResponse.data);
    // playSound();
      if (productDetailsResponse.data.productByBarcode.items.length > 0) {
        const newProductDetails = productDetailsResponse.data.productByBarcode.items[0];
        console.log("Product",newProductDetails);
        const existingProductIndex = scannedProducts.findIndex(product => product.barcode === newProductDetails.barcode);
  
        if (existingProductIndex !== -1) {
          
          const updatedScannedProducts = [...scannedProducts];
          // updatedScannedProducts[existingProductIndex].quantity = (updatedScannedProducts[existingProductIndex].quantity || 1) + 1;
          // existingProduct.amount = existingProduct.quantity * existingProduct.price; // Calculate amount
          const existingProduct = updatedScannedProducts[existingProductIndex];
          existingProduct.quantity += 1;
          existingProduct.amount = existingProduct.quantity * existingProduct.price;
          setScannedProducts(updatedScannedProducts);
        } else {
        
          // setScannedProducts(prevProducts => [...prevProducts, { ...newProductDetails, quantity: 1 }]);
          const amount = newProductDetails.price; // Since quantity will be 1 for a new product
          setScannedProducts(prevProducts => [...prevProducts, { ...newProductDetails, quantity: 1, amount: amount }]);
        }
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  
    
    if (manualBarcode !== '') {
      setManualBarcode('');
    }
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
