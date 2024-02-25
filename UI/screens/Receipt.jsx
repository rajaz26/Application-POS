import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { selectConnectedDevice } from '../store/bluetoothReducer.js'; // Adjust this path as necessary
import ViewShot from 'react-native-view-shot';
import { COLORS } from '../assets/theme/index.js';
const Receipt = () => {
  const viewShotRef = useRef(null);
  const connectedDevice = useSelector(selectConnectedDevice);

  const sampleBill = {
    store: {
      name: "Khattak Store",
      address: "Yousuf Colony",
    },
    cashier: {
      username: "cashier01",
    },
    items: [
      { product: { name: "Product A", price: 10.00 }, quantity: 2 },
      { product: { name: "Product B", price: 5.50 }, quantity: 1 },
    ],
    totalAmount: 25.50,
    status: "Paid",
  };

  const _formatBill = (bill) => {
    let receipt = "";
    receipt += "Store: " + bill.store.name + "\n";
    receipt += "Address: " + bill.store.address + "\n";
    receipt += "Cashier: " + bill.cashier.username + "\n";
    receipt += "-----------------------------\n";
    bill.items.forEach((item) => {
      receipt += item.product.name + " x " + item.quantity + " = $" + (item.product.price * item.quantity).toFixed(2) + "\n";
    });
    receipt += "-----------------------------\n";
    receipt += "Total: $" + bill.totalAmount.toFixed(2) + "\n";
    receipt += "Status: " + bill.status + "\n";
    receipt += "Thank you for your purchase!\n";
    return receipt;
  };

  const captureAndDisplay = async () => {
    if (!connectedDevice) {
      Alert.alert("Print Error", "No Bluetooth device is connected.");
      return;
    }

    const formattedReceipt = _formatBill(sampleBill);

    try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printText(formattedReceipt, {});
      Alert.alert("Print Success", "Receipt printed successfully.");
    } catch (error) {
      console.error('Error printing receipt:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scrollView}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
    
    <View style={styles.headerContainer}>
      
      <ScrollView style={styles.billContainer}>
          
        <ScrollView style={styles.wrapper}>
          
          <View style={styles.logo}>
            <Image
              style={styles.logoStyles}
              source={require('../assets/images/logo7.png')}
            />
          </View>
          <View style={styles.address}>
            <Text style={styles.addressText}>
              Shop 28, Yousuf Colony
              {'\n'}
              Chaklala Scheme 3, Rawalpindi
            </Text>
          </View>
          <View style={styles.dashedLine} />
          
          <View style={styles.receipt}>
            {/* Receipt Header */}
            <View style={styles.header}>
              
              <Text style={styles.headerText}>QTY</Text>
              <Text style={styles.headerText}>ITEM</Text>
              <Text style={styles.headerText}>PRICE</Text>
              <Text style={styles.headerText}>TOTAL</Text>
            </View>

            {/* Receipt Items */}
            {Array.from({ length: 15}, (_, index) => (
              <View style={styles.itemRow} key={index}>
                <Text style={styles.itemText}>2</Text>
                <Text style={styles.itemText}>Product A</Text>
                <Text style={styles.itemText}>$10.00</Text>
                <Text style={styles.itemText}>$20.00</Text>
              </View>
            ))}
         
            {/* Total */}
            <View style={styles.totalRow}>
              <Text style={[styles.totalText, styles.alignRight]}>TOTAL</Text>
              <Text style={[styles.totalAmount, styles.alignRight]}>$35.00</Text>
            </View>
          </View>
          
          {/* Horizontal Line Below Total */}
          <View style={styles.dashedLine} />
        
        </ScrollView>
   
      </ScrollView>
    </View>
  </ViewShot>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={captureAndDisplay}>
          <Text style={styles.confirmText}>Download</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  footerContainer: {
    position: 'absolute', // Position the footer at the bottom
    bottom: 0, // Align the footer to the bottom
    width: '100%', // Make the footer full width
    justifyContent:'center',
    alignItems:'center'
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    flex:1,
  
  },
  billContainer: {},
  logo: {
    alignItems: 'center',
  },
  logoStyles: {
    width: 60,
    height: 60,
  },
  address: {
    marginVertical: 10,
    textAlign: 'center',
  },
  addressText: {
    textAlign: 'center',
    color:'black'
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },
  receipt: { marginVertical: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  itemText: {
    flex: 1,
    textAlign: 'center',
    color:'black'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  totalText: {
    flex: 0,
    fontWeight: 'bold',
    textAlign: 'right', // Align to the right
    marginRight: 10,
    color:'black'
  },
  totalAmount: {
    flex: 0,
    fontWeight: 'bold',
    textAlign: 'right', // Align to the right
    color:'black'
  },
  alignRight: {
    textAlign: 'right',
  },
  footerWrapper: {
    borderTopWidth: 1,
    borderColor: 'gray',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 25,
    marginBottom: 10,
  },
  confirmText: {
    fontSize: 19,
    color: 'white',
    fontFamily: 'Poppins-Regular',
    top: 2,
  },
  capturedImageContainer: {
    flex:0,
    width: '100%',
    height: '100%',
    borderWidth:1,
    backgroundColor:'red',
  },
});

export default Receipt;
