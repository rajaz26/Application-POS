import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
// import beep from '../android/app/src/main/res/raw/beep.mp3';
// import SoundPlayer from 'react-native-sound-player'
// import TrackPlayer from 'react-native-track-player';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { COLORS } from '../assets/theme';
import { useNavigation } from '@react-navigation/native'; 
import Ionic from 'react-native-vector-icons/Ionicons';
import {generateClient} from 'aws-amplify/api';
import Sound from 'react-native-sound';
import { updateProduct } from '../src/graphql/mutations';
export default function Scan2({route}) {
  Sound.setCategory('Playback');
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalBillAmount, setTotalBillAmount] = useState(0);
  const [scannedProducts, setScannedProducts] = useState([]);
  const [manualEntryModalVisible, setManualEntryModalVisible] = React.useState(false);
  const [manualBarcode, setManualBarcode] = React.useState('');
  const [billModalVisible, setBillModalVisible] = React.useState(false);
  const [cameraKey, setCameraKey] = useState(1);
  const [quantity, setQuantity] = useState(''); // For the quantity input
  const [quantityModalVisible, setQuantityModalVisible] = useState(false); // To control the visibility of the quantity modal
  const [currentProduct, setCurrentProduct] = useState(null);
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
        price
        manufacturer
        category
        warehouseQuantity
        shelfQuantity
        _version
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
  
        const productDetailsResponse = await client.graphql({
            query: ProductByBarcode,
            variables: { barcode: barcodeValue },
            authMode: 'apiKey',
        });
  
        if (productDetailsResponse.data.productByBarcode.items.length > 0) {
            const productDetails = productDetailsResponse.data.productByBarcode.items[0];
            console.log("Reciieved product",productDetails);
            setCurrentProduct(productDetails);
            console.log("Current Product",currentProduct);
            setQuantityModalVisible(true);
        }
    } catch (error) {
        console.error("Error handling barcode scan:", error);
    }
  
    if (manualBarcode !== '') setManualBarcode('');
};

  const handleAddQuantity = () => {
    if (!quantity) {
        alert("Please enter a quantity.");
        return;
    }

    const existingProductIndex = scannedProducts.findIndex(product => product.id === currentProduct.id);

    let updatedScannedProducts;

    if (existingProductIndex !== -1) {
        updatedScannedProducts = [...scannedProducts];
        updatedScannedProducts[existingProductIndex].quantity += parseInt(quantity, 10);
    } else {
        const updatedProductDetails = {
            ...currentProduct,
            quantity: parseInt(quantity, 10), 
        };
        updatedScannedProducts = [...scannedProducts, updatedProductDetails];
    }

    setScannedProducts(updatedScannedProducts);

    setQuantity('');
    setCurrentProduct(null);
    setQuantityModalVisible(false);
};

useEffect(() => {
  const total = scannedProducts.reduce((acc, curr) => acc + (curr.subtotal || 0), 0);
  setTotalBillAmount(total);
}, [scannedProducts]);


const handleConfirmPressed = async () => {
    setLoading(true);
    setSuccessMessage(false);
    setErrorMessage('');
    for (const product of scannedProducts) {
        console.log("product",product);
      const newQuantity = product.warehouseQuantity - product.quantity;
      await updateProductQuantityInBackend(product.id, newQuantity,product._version);
      
    }
  
    console.log("All products updated successfully.");
   
  };

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

  
const updateProductQuantityInBackend = async (productId, newQuantity,version) => {
    console.log("UPDATING PRODUCTS IN BACKEND",productId,newQuantity, version);
    try {
      const response = await client.graphql({
        query: updateProduct,
        variables: {input:{
            id: productId,
            warehouseQuantity: newQuantity,
            _version:version
        }
        },
        authMode: 'apiKey',
      });
      setSuccessMessage(true);
      console.log("Product quantity updated:", response.data.updateProduct);
      setScannedProducts([]);
    } catch (error) {
    setErrorMessage("Updation failed");
      console.error("Error updating product quantity:", error);
    }
  };
  
 
;
const handleGoBack = () => {
    setSuccessMessage(false);
    setErrorMessage('');
    setLoading(false);
    setQuantityModalVisible(false);
  };
  React.useEffect(() => {
    barcodes.forEach(handleBarcodeScanned);
  }, [barcodes]);

  useEffect(() => {
    if (route.params?.scannedProductsList) {
      setScannedProducts(route.params.scannedProductsList);
    }
  }, []);
  


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
  {loading && (
        <View style={styles.loadingContainer}>
          <AnimatedCircularProgress
  size={120}
  width={15}
  duration={2200} 
  delay={0}
  fill={100}
  tintColor={COLORS.secondary}
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
        <View style={{justifyContent:'center',alignItems:'center',marginTop:10,}}>
          <Text style={styles.loadingText}>{successMessage ? "Products Updated Successfully" : "Updating Products..."}</Text>
          </View>
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          {(successMessage || errorMessage) && (
            <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
              <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
        <TouchableOpacity
          onPressIn={startScanning} 
          onPressOut={stopScanning} 
          style={[
            styles.scanButton,
            isScanning ? styles.scanButtonPressed : styles.scanButtonNotPressed, 
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
            <Text style={styles.buttonTextShow}>List</Text>
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
  visible={quantityModalVisible}
  animationType="fade"
  transparent={true}
  onRequestClose={() => setQuantityModalVisible(false)}
>

<Modal
  visible={quantityModalVisible}
  animationType="fade"
  transparent={true}
  onRequestClose={() => setQuantityModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Enter Quantity:</Text>
    <TextInput
      style={styles.input}
      placeholder="Quantity"
      keyboardType="number-pad"
      onChangeText={setQuantity}
      value={quantity}
    />
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity onPress={handleAddQuantity} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setQuantityModalVisible(false)} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>Enter Product Quantity:</Text>
    <TextInput
      style={styles.input}
      placeholder="Quantity"
      keyboardType="number-pad"
      onChangeText={setQuantity}
      value={quantity}
    />
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity onPress={handleAddQuantity} style={styles.modalButton}>
        <Text style={styles.modalButtonText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setQuantityModalVisible(false)} style={styles.modalButton}>
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
    // backgroundColor: COLORS.SECONDARY, 
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
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
    width: 200, 
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    // backgroundColor: COLORS.SECONDARY,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, 
    margin: 5,
  },
  modalButtonText: {
    // color: COLORS.PRIMARY, 
    fontFamily: 'Poppins-Regular', 
  },
  modalText: {
    color: COLORS.primary, 
    fontFamily: 'Poppins-Regular',
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    position:'absolute',
    zIndex:999999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText:{
    color:'white',
    fontSize:24,
    fontFamily:'Poppins-Regular',
    top:1,
    textAlign:'center'
  },
  loadingTextSubtitle:{
    color:'white',
    fontSize:20,
    fontFamily:'Poppins-Regular',
    top:15,
  },
  successMessageContainer:{
    flex:0,
   alignItems:'center',
   justifyContent:'center'
  },
  successButton: {
    backgroundColor: COLORS.secondary,
    width: 150,
    paddingVertical: 8,
    borderRadius: 30,
    top:20,
  },
  loadingOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },

  errorText: {
    color: 'red',
    marginTop: 20,
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  goBackButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.primary,
    textAlign: 'center',
    top:1,
    color:'white'
  },
});
