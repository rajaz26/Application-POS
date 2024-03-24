import React, {useState, useEffect, useRef} from 'react';
import { Alert,Animated, StyleSheet, Text, View, TouchableOpacity, ScrollView,Modal,TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
// import RNFetchBlob from 'rn-fetch-blob';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { generateClient } from 'aws-amplify/api';
import { createBillItem, deleteBill, deleteBillItem, updateBill, updateBillItem, updateProduct } from '../src/graphql/mutations';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { getBill, getBillItem, getProduct } from '../src/graphql/queries.js';
import { useSelector } from 'react-redux';

const ShowBill = ({route}) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const userName = useSelector((state) => state.user.username);
    const storeName = useSelector((state) => state.user.storeName);
    const client = generateClient();
    const billid = route.params.billId;
    const [billtotal, setBillTotal] = useState( route.params.billtotal);
    const billVersion= route.params.billVersion;
    const [isEditing, setIsEditing] = useState(false);
    const [manualEntryModalVisible, setManualEntryModalVisible] = useState(false);
    const [manualBarcode, setManualBarcode] = useState('');
    const [billItems, setBillItems] = useState([]);
    const modalBarcodeRef = useRef('');
    useEffect(() => {
        setIsEditing(false);
        setManualBarcode('');
        const fetchBillItems = async () => {
            if (billid) {
                const billItemsData = await getBillItemsByBillId(billid);
                setBillItems(billItemsData);
            } else {
                console.error('Bill ID is null');
            }
        };
        fetchBillItems();
    }, [billid]);

    
    const confirmDeleteBillItem = (itemId, itemVersion,itemSubtotal) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => deleteBillItemFunction(itemId, itemVersion,itemSubtotal),
                },
            ],
            { cancelable: true }
        );
    };

    const deleteBillItemFunction = async (itemId, itemVersion, subtotalToDelete) => {
        try {
            console.log("Item Id", itemId);
            console.log("Item Version", itemVersion);
            console.log("Subtotal", subtotalToDelete);
            const deleteBillItemMutation = await client.graphql({
                query: deleteBillItem,
                variables: { input: { id: itemId, _version: itemVersion } },
                authMode: 'apiKey',
            });
    
            console.log("BillItemDeleted", deleteBillItemMutation);
            console.log("Bill Total", billtotal);
            // Update the bill total by subtracting the subtotal of the deleted item
            const updatedTotal = billtotal - subtotalToDelete;
            setBillTotal(updatedTotal);
    
            // Update the bill in the database with the new total
            updateBillInDB(billid, updatedTotal, billVersion);
    
            // Update the product quantity in shelf
            const productName = deleteBillItemMutation.data.deleteBillItem.productName;
            const updatedQuantity = -1 * deleteBillItemMutation.data.deleteBillItem.quantity; // Negative quantity for deduction
            updateProductQuantityInShelf(productName, updatedQuantity);
    
            console.log("Bill total and product quantity updated successfully");
        } catch (error) {
            console.error("Error in deleting the Bill Item", error);
        }
    }
    
    const updateProductQuantityInShelf = async (productName, quantityChange) => {
        try {
            // Fetch the product data by name
            const productData = await client.graphql({
                query: getProductByName, // Import getProductByName query if not already imported
                variables: { name: productName },
                authMode: 'apiKey',
            });
    
            if (!productData || !productData.data || !productData.data.productByName || !productData.data.productByName.items) {
                console.error("Product data or items not found");
                return;
            }
    
            // Access the product items
            const items = productData.data.productByName.items;
    
            // Ensure items array is not empty
            if (items.length === 0) {
                console.error("No items found for the product");
                return;
            }
    
            // Access the first item (assuming there's only one)
            const productItem = items[0];
    
            // Calculate the new quantity in shelf
            const newShelfQuantity = productItem.shelfQuantity + quantityChange;
    
            // Update the product with the new shelf quantity
            const updateProductResponse = await client.graphql({
                query: updateProduct,
                variables: {
                    input: {
                        id: productItem.id,
                        shelfQuantity: newShelfQuantity,
                        _version: productItem._version,
                    },
                },
                authMode: 'apiKey',
            });
    
            console.log("Product quantity in shelf updated successfully", updateProductResponse);
        } catch (error) {
            console.error("Error updating product quantity in shelf:", error);
        }
    };
    
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
  const handleBarcodeScanned = async () => {
    try {
        console.log("New barcode", manualBarcode);

        const productDetailsResponse = await client.graphql({
            query: ProductByBarcode,
            variables: { barcode: manualBarcode },
            authMode: 'apiKey',
        });

        console.log("New barcode SCANNED", productDetailsResponse.data.productByBarcode.items);

        const productDetails = productDetailsResponse.data.productByBarcode.items[0];

        // Check if the product already exists in the bill items
        const existingBillItem = billItems.find(item => item.productName === productDetails.name);
        console.log("Existing Bill Item", existingBillItem);
        console.log("Bill items",billItems);
        console.log("items",productDetails);

        if (existingBillItem) {
            // If the product already exists, update its quantity and subtotal
            const updatedQuantity = existingBillItem.quantity + 1;
            const updatedSubtotal = existingBillItem.productPrice * updatedQuantity;

            const updateBillItemResponse = await client.graphql({
                query: updateBillItem,
                variables: {
                    input: {
                        id: existingBillItem.id,
                        quantity: updatedQuantity,
                        subtotal: updatedSubtotal,
                        _version: existingBillItem._version,
                    },
                },
                authMode: 'apiKey',
            });

            console.log("Bill Item updated successfully", updateBillItemResponse);

            // Update the total amount of the bill
            const updatedTotal = billtotal + (productDetails.price * 1); // Increment by 1
            setBillTotal(updatedTotal);
            updateBillInDB(billid, updatedTotal, billVersion);
        } else {
            // If the product does not exist, create a new bill item
            const billItemResponse = await client.graphql({
                query: createBillItem,
                variables: {
                    input: {
                        productBillItemsId: productDetails.id,
                        quantity: 1,
                        productPrice: productDetails.price,
                        subtotal: productDetails.price,
                        billItemsId: billid,
                        manufacturer: productDetails.manufacturer,
                        category: productDetails.category,
                        productName: productDetails.name,
                    },
                },
                authMode: 'apiKey',
            });

            console.log("New Bill Item created ", billItemResponse.data.createBillItem.subtotal);

            // Update the total amount of the bill
            const updatedTotal = billtotal + billItemResponse.data.createBillItem.subtotal;
            setBillTotal(updatedTotal);
            console.log("Received", billid, updatedTotal, billVersion);
            console.log(updatedTotal);
            updateBillInDB(billid, updatedTotal, billVersion);
        }

        console.log("updated");
    } catch (error) {
        console.error("Error handling barcode scan:", error);
    }
};


// Function to update the total value of the bill in the database
const updateBillInDB = async (billId, total, billVersion) => {
    console.log("Received", billId, total, billVersion);
    try {
        if (total !== null && total !== undefined) {
            const response = await client.graphql({
                query: updateBill,
                variables: {
                    input: {
                        id: billId,
                        totalAmount: total,
                        _version: billVersion,
                    },
                },
                authMode: 'apiKey',
            });
            console.log("Bill updated successfully", response);
        } else {
            console.error("Total amount is null or undefined");
        }
    } catch (error) {
        console.error("Error updating bill:", error);
    }
};

const toggleManualEntryModal = () => {
    setManualEntryModalVisible(!manualEntryModalVisible);
};

const addManualBarcode = () => {
    handleBarcodeScanned();
    toggleManualEntryModal();
};

const handleAddProduct = () => {
    setIsEditing(true);
    // setManualEntryModalVisible(true);
};
const handleShowAdd = () => {
    setIsEditing(true);
    setManualEntryModalVisible(true);
};

const handleCancel = () => {
    setIsEditing(false);
};



const getProductByName = /* GraphQL */ `
query GetProductByName($name: String!) {
  productByName(name: $name) {
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


const getBillItemsByBillIdQuery = /* GraphQL */ `
  query GetBillItemsByBillId($billId: ID!) {
    listBillItems(filter: { 
      billItemsId: { eq: $billId },
      _deleted: { ne: true } 
    }) {
      items {
        id
        productName
        quantity
        productPrice
        subtotal
        category
        manufacturer
        bill {
          id
          cashier
          totalAmount
          status
        }
        store {
          id
          name
        }
        createdAt
        updatedAt
        _version
        _deleted
      }
    }
  }
`;
 
   // Function to get bill items by bill ID
   const getBillItemsByBillId = async (billId) => {
    try {
        const response = await client.graphql({
            query: getBillItemsByBillIdQuery,
            variables: { billId },
            filter: {
                _deleted: {
                    ne: true
                }
            },
            authMode: 'apiKey'
        });
        const billItems = response.data.listBillItems.items;
        console.log("Bill Items",billItems);
        return billItems;
    } catch (error) {
        console.error('Error fetching bill items:', error);
        return [];
    }
};

const handlePrintBill = async () => {
    try {
        // Initialize the printer
        await BluetoothEscposPrinter.printerInit();
        await BluetoothEscposPrinter.printerLeftSpace(0);
        
        // Set printer alignment
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await BluetoothEscposPrinter.setBlob(0);
        await BluetoothEscposPrinter.printText(`${storeName || 'Storename'}\n`, {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 3,
            heigthtimes: 3,
            fonttype: 1
        });
        // Print bill details

        // Print each bill item
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
        await BluetoothEscposPrinter.printText("--------------------------------\n", {});
        
        // Print column headers
        await BluetoothEscposPrinter.printText("PRODUCT NAME        QTY      PRICE      SUBTOTAL\n", {});
      
        billItems.forEach(async (item) => {
            console.log("Items",item)
            let itemName = item.productName.padEnd(20); 
            let itemLine = `${itemName} ${item.quantity.toString().padEnd(7)} ${item.productPrice.toString().padEnd(10)} ${item.subtotal.toFixed(2)}\n`;
            await BluetoothEscposPrinter.printText(itemLine, {});
           
        });
        
        await BluetoothEscposPrinter.printText("--------------------------------\n", {});
        await BluetoothEscposPrinter.printText(`Total: ${billtotal}\n`, {});
        await BluetoothEscposPrinter.printText("--------------------------------\n", {});
        
        await BluetoothEscposPrinter.printText("Thank you for your purchase!\n\n\n", {});
        
    } catch (error) {
        console.error("Failed to print receipt:", error);
    }
  
};

const handleDeleteBill = async () => {
    Alert.alert(
      "Delete Bill",
      "Are you sure you want to delete the bill?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteBillFunction() }
      ],
      { cancelable: false }
    );
  };
  
  const deleteBillFunction = async () => {
    try {
        // Call the GraphQL mutation to delete the bill
        const response = await client.graphql({
            query: deleteBill,
            variables: {
                input: {
                    id: billid,
                    _version: billVersion
                }
            },
            authMode: 'apiKey',
        });

        // Handle success response
        console.log("Bill deleted successfully:", response);

        // Now, delete associated bill items
        await Promise.all(billItems.map(async (item) => {
            await deleteBillItemAfterBill(item.id, item._version);
        }));

        // Update the state or perform any necessary actions after deletion
        // For example, navigate to a different screen or reset state variables
        navigation.navigate('History'); // Close the bill modal if it's open
    } catch (error) {
        console.error("Error deleting bill:", error);
        // Handle error, such as displaying an error message to the user
    }
};

const deleteBillItemAfterBill = async (itemId, itemVersion) => {
    try {
        // Perform deletion of a single bill item
        const deleteBillItemMutation = await client.graphql({
            query: deleteBillItem,
            variables: { input: { id: itemId, _version: itemVersion } },
            authMode: 'apiKey',
        });

        console.log("BillItemDeleted", deleteBillItemMutation);
        console.log("Bill Total", billtotal);
        // Update the bill total by subtracting the subtotal of the deleted item
       
        // Update the product quantity in shelf
        const productName = deleteBillItemMutation.data.deleteBillItem.productName;
        const updatedQuantity = -1 * deleteBillItemMutation.data.deleteBillItem.quantity; // Negative quantity for deduction
        await updateProductQuantityInShelf(productName, updatedQuantity);

        console.log("Bill total and product quantity updated successfully");
    } catch (error) {
        console.error("Error in deleting the Bill Item", error);
    }
};

return (
    <SafeAreaView style={styles.headContainer}>
        {loading && (
            <View style={styles.loadingContainer}>
                <AnimatedCircularProgress
                    size={120}
                    width={15}
                    duration={2200}
                    delay={10}
                    fill={100}
                    tintColor={COLORS.secondary}
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#3d5875"
                />
            </View>
        )}
        <View style={styles.header}>
            <TouchableOpacity style={styles.arrowBackIcon} onPress={() => navigation.goBack()}>
                <Ionic size={24} color={COLORS.primary} name='chevron-back-outline' />
            </TouchableOpacity>
        </View>
        <View style={styles.mainLogo}>
            <Ionic style={styles.logo} size={90} color={'black'} name='logo-behance' />
        </View>
        <View style={styles.mainLogo}>
            <Text style={styles.totalBill}>PKR {billtotal}</Text>
        </View>

        <View style={styles.columnHeadingContainer}>
            <View style={styles.columnHeading}>
                <Text style={styles.headingText1}>ITEM</Text>
                <Text style={styles.headingText}>QTY</Text>
                <Text style={styles.headingText}>PRICE</Text>
                <Text style={styles.headingText}>TOTAL</Text>
                {isEditing && <Text style={styles.headingText}>DEL</Text>}
            </View>
        </View>

        <ScrollView style={styles.scrollView}>
            {billItems.map((item, index) => (
                <View key={item.id} style={styles.billsContainer}>
                    <View style={styles.billValuesContainer}>
                        <View style={styles.itemText}>
                            <Text style={styles.billValues1}>
                                {item.productName}
                            </Text>
                        </View>
                        <View style={styles.valueQty}>
                            <Text style={styles.billValues}>
                                {item.quantity}
                            </Text>
                        </View>
                        <View style={styles.valuePrice}>
                            <Text style={styles.billValues}>
                                {item.productPrice}
                            </Text>
                        </View>
                        <View style={styles.valuePrice}>
                            <Text style={styles.billValues}>
                                {item.subtotal}
                            </Text>
                        </View>
                        {isEditing && (
                         <TouchableOpacity style={styles.deleteBill} onPress={() => confirmDeleteBillItem(item.id, item._version,item.subtotal)}>
                         <Ionic style={styles.trash} size={21.5} color={'red'} name='trash' />
                     </TouchableOpacity>
                        )}
                    </View>
                </View>
            ))}
        </ScrollView>

        <View style={styles.footerContainer}>
            <View style={styles.footerWrapper}>
            {isEditing && <TouchableOpacity style={styles.confirmButton} onPress={handleShowAdd}>
                        <Text style={styles.confirmText}>Add Product</Text>
                    </TouchableOpacity>}

                    {isEditing &&  <TouchableOpacity style={styles.addButton} onPress={handlePrintBill}>
                <Text style={styles.addText}>Print Bill</Text>
            </TouchableOpacity>}
                {isEditing ? (
                    <TouchableOpacity style={styles.confirmButton} onPress={handleAddProduct}>
                        <Text style={styles.confirmText}>Confirm Bill</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.confirmButton} onPress={handleAddProduct}>
                        <Text style={styles.confirmText}>Edit Bill</Text>
                    </TouchableOpacity>
                )}
                {isEditing ? (
                    <TouchableOpacity style={styles.addButton} onPress={handleCancel}>
                        <Text style={styles.addText}>Cancel</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.addButton} onPress={handleDeleteBill}>
                        <Text style={styles.addText}>Delete Bill</Text>
                    </TouchableOpacity>
                )}
            </View>
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
                    ref={modalBarcodeRef}
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
    </SafeAreaView>
);
}

export default ShowBill

const styles = StyleSheet.create({
    headContainer:{ 
        flex:1,
        backgroundColor:'white',
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
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        position:'absolute',
        zIndex:999999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
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
    billValues:{
        fontSize:15,
        right:3,
        color:'gray',
    },
    paidContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    paidText: {
        fontSize: 50, 
        fontWeight: 'bold',
        color: 'green',
    },
    billValues1:{
        fontSize:16,
        color:'gray',
    },
    valueQty:{
        flex:0.2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        right:3, 
    },
    valuePrice:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
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
