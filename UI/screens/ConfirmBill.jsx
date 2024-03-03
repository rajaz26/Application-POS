import { StyleSheet, Text, View ,TouchableOpacity,ScrollView,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import RNFetchBlob from 'rn-fetch-blob';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
const { width, height } = Dimensions.get('window');


const ConfirmBill = ({route}) => {
    const navigation=useNavigation();
    const { scannedProducts, totalBillAmount } = route.params;
    const handleAddProduct = () => {
        navigation.navigate('Scan', { scannedProducts: scannedProducts });
    };
    const printReceipt = async () => {
        try {
          // Initialize Printer
          await BluetoothEscposPrinter.printerInit();
          await BluetoothEscposPrinter.printerLeftSpace(0);
          await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
          await BluetoothEscposPrinter.setBlob(0);
          await BluetoothEscposPrinter.printText("Khattak Store\n", {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 3,
            heigthtimes: 3,
            fonttype: 1
          });
          await BluetoothEscposPrinter.printText("Yousuf Colony\n", {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 1,
            heigthtimes: 1,
            fonttype: 1
          });
          await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
          await BluetoothEscposPrinter.printText("Cashier: cashier01\n", {});
          await BluetoothEscposPrinter.printText("--------------------------------\n", {});
    
          scannedProducts.forEach(async (item) => {
            let itemLine = `${item.name} x ${item.quantity} = ${item.amount.toFixed(2)}\n`;
            await BluetoothEscposPrinter.printText(itemLine, {});
          });
    
          await BluetoothEscposPrinter.printText("--------------------------------\n", {});
          await BluetoothEscposPrinter.printText(`Total: ${totalBillAmount.toFixed(2)}\n`, {});
          await BluetoothEscposPrinter.printText("Thank you for your purchase!\n\n\n", {});
        } catch (error) {
          console.error("Failed to print receipt:", error);
        }
      };
    
    // const convertImageToBase64 = () => {
    //     const imageUrl = 'https://upload.wikimedia.org/wikipedia/en/6/61/Tang_drinkmix_logo.png';
    //     RNFetchBlob.fetch('GET', imageUrl, {})
    //       .then((res) => {
    //         // The image is now in base64 format
    //         let base64Str = res.base64();
    //         console.log(base64Str);
    //         // You can handle the base64 string here - display it, store it, or send it to a server
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   };
  return (
    
    <SafeAreaView style={styles.headContainer}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.arrowBackIcon}  onPress={()=> navigation.goBack()}>
                <Ionic size={24} color={COLORS.primary} name ='chevron-back-outline'/>
            </TouchableOpacity>
        </View>
        <View style={styles.mainLogo}>
            <Ionic style={styles.logo}  size={90} color={'black'} name ='logo-behance'/>
        </View>
        <View style={styles.mainLogo}>
    <Text style={styles.totalBill}>PKR {totalBillAmount.toFixed(2)}</Text>
</View>

        <View style={styles.columnHeadingContainer}>
            <View  style={styles.columnHeading}>
                <Text style={styles.headingText1}>ITEM</Text>
                <Text style={styles.headingText}>QTY</Text>
                <Text style={styles.headingText}>PRICE</Text>
                <Text style={styles.headingText}>TOTAL</Text>
                <Text  style={styles.headingText}>DEL</Text>
            </View>
        </View>
        

        <ScrollView  style={styles.scrollView}>
        {scannedProducts.map((product, index) => (
            <View  key={product.id || index} style={styles.billsContainer}>
                <View style={styles.billValuesContainer}>
                    <View style={styles.itemText}>
                        <Text style={styles.billValues1}>
                            {product.name}
                        </Text>
                    </View>
                    <View style={styles.valueQty}>
                        <Text style={styles.billValues}>
                            {product.quantity}
                        </Text>                  
                    </View>
                    <View style={styles.valuePrice}>
                        <Text style={styles.billValues}>
                            {product.price}
                        </Text>
                    </View>  
                    <View style={styles.valuePrice}>
                        <Text style={styles.billValues}>
                            {product.amount}
                        </Text>
                    </View>    
                    <TouchableOpacity style={styles.deleteBill}>
                        <Ionic style={styles.trash}  size={21.5} color={'red'} name ='trash'/>
                    </TouchableOpacity>
                </View>
            </View>
             ))}
        </ScrollView>
        <View style={styles.footerContainer}>
            <View style={styles.footerWrapper}>
                <TouchableOpacity style={styles.confirmButton} onPress={printReceipt}>
                    <Text style={styles.confirmText}>Confirm Bill</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.confirmButton} onPress={convertImageToBase64}>
            <Text style={styles.confirmText}>Convert Image to Base64</Text>
          </TouchableOpacity> */}

                <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                    <Text style={styles.addText}>Add Product</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default ConfirmBill

const styles = StyleSheet.create({
    headContainer:{ 
        flex:1,
        backgroundColor:'white',
    },
    header:{
       marginTop:25,
        flex:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:30
    },
    settingsText:{
        fontSize:24,
        color:COLORS.primary,
        top:2,
        fontFamily:'Poppins-Regular',
    },
    arrowBackIcon:{
        position:'absolute',
        left:8
    },
    mainLogo:{
        flex:0,
        justifyContent:'center',
        alignItems:'center'
    },
    totalBill:{
        color:COLORS.primary,
        fontSize:30,
        fontFamily:'Poppins-SemiBold',
        marginTop:15,

    },
    columnHeadingContainer:{
        flex:0,
        backgroundColor:COLORS.primary,
        height:50,
        justifyContent:'center',
        marginTop:22,
        marginHorizontal:10,
        borderRadius:15,

    },
    columnHeading:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        color:'white',
        paddingRight:2,
    },
    headingText1:{
        color:'white',
        fontSize:15,
        flex:0.8,
        left:5,
    },
    headingText:{
        color:'white',
        fontSize:15,

    },
    billValuesContainer:{
        flex:1,
        height:50,
        marginTop:8,
        marginHorizontal:10,
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        color:'white',
        paddingHorizontal:12,
        borderColor:'rgba(180, 180, 180,4)',
    },
    billValuesContainer1:{
        flex:0,
        height:50,
        marginTop:8,
        marginHorizontal:10,
       borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        color:'white',
        paddingHorizontal:12,
        borderColor:'rgba(180, 180, 180,4)'
        
    },
    billValues:{
        fontSize:15,
        right:3,
        color:'gray',

    },
    billValues1:{
        fontSize:16,
        color:'gray',
    },
    valueQty:{
        flex:0.2,flexDirection:'row',justifyContent:'center',alignItems:'center',right:3, 
  
    },
    valuePrice:{
        flex:0.5,flexDirection:'row',justifyContent:'center',alignItems:'center',
    },
  
    itemText:{
        flex:1.5,
        paddingLeft:4,        
    },
    footerWrapper:{
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:13,
    },
    confirmButton:{
        backgroundColor:COLORS.primary,
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        width:300,
        marginHorizontal:10,
        paddingVertical:8,
        borderRadius:25,
        marginBottom:10,
    },
    confirmText:{
        fontSize:18,
        color:'white',
        fontFamily:'Poppins-Regular',
        top:2,
    },
    addButton:{
        backgroundColor:'white',
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        width:300,
        marginHorizontal:10,
        paddingVertical:8,
        borderRadius:25,
        borderWidth:1,
        borderColor:COLORS.primary,
    },
    addText:{
        fontSize:18,
        color:COLORS.primary,
        fontFamily:'Poppins-Regular',
        top:2,
    }

})