import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Alert, Image } from 'react-native';
import { COLORS } from '../assets/theme';
import { getPurchaseOrder } from '../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { useNavigation } from '@react-navigation/native';
import { deletePurchaseOrder, updatePurchaseOrder } from '../src/graphql/mutations';
import Ionic from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
const PurchaseOrder = ({ route }) => {
    const [purchaseOrder, setPurchaseOrder] = useState(null);
    const [image, setImage] = useState(false);
    const [editing, setEditing] = useState(false);
    const client = generateClient();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [purchaseOrderDate, setPurchaseOrderDate] = useState(route.params.purchaseOrderDate);
    const [purchaseOrderAmount, setPurchaseOrderAmount] = useState(route.params.purchaseOrderAmount);
    const [purchaseOrderVendor, setPurchaseOrderVendor] = useState(route.params.purchaseOrderVendor);
    const [purchaseOrderImage, setPurchaseOrderImage] = useState(null);
    const purchaseOrderVersion=route.params.purchaseOrderVersion;
    const purchaseOrderId = route.params.purchaseOrderId;
    const [purchaseOrderInput, setPurchaseOrderInput] = useState({
        id: purchaseOrderId,
        date:purchaseOrderDate,
        amount:purchaseOrderAmount,
        vendor:purchaseOrderVendor,
        image: purchaseOrderImage,
        _version:purchaseOrderVersion
      });
      useEffect(() => {
        console.log("User Effect",purchaseOrderInput)
        setPurchaseOrderInput({
          id: purchaseOrder?.id,
          date:purchaseOrder?.date,
          amount:purchaseOrder?.amount,
          vendor:purchaseOrder?.vendor,
          image: purchaseOrder?.image,
        });
      }, [purchaseOrder]);

      const handleChoosePhoto = () => {
        launchImageLibrary({}, (response) => {
          if (response.assets && response.assets.length > 0) {
            const imageUri = response.assets[0].uri;
            setPurchaseOrderInput((prevState) => ({
              ...prevState,
              image: imageUri,
            }));
          } else {
            console.log('No image selected or unexpected response structure');
          }
        });
      };
    
      const uploadImageToS3 = async (imageUri, fileName) => {
        try {
          const response = await fetch(imageUri);
          const blob = await response.blob();
    
          const uploadResult = await uploadData({
            key: fileName,
            data: blob,
            options: {
              contentType: 'image/jpeg',
              accessLevel: 'guest',
            },
          }).result;
    
          return uploadResult.key;
        } catch (error) {
          console.error('Upload error:', error);
          throw error;
        }
      };
    
      const getImageUrlFromS3 = async (fileKey) => {
        try {
          const getUrlResult = await getUrl({
            key: fileKey,
            options: {
              accessLevel: 'guest',
              useAccelerateEndpoint: true,
            },
          });
    
          return getUrlResult.url;
        } catch (error) {
          console.error('Error getting image URL:', error);
          throw error;
        }
      };
    
      const handleUpdatePurchaseOrder = async () => {
        setLoading(true);
        console.log("Updating",purchaseOrderInput);
        try {
          if (purchaseOrderInput.image !== purchaseOrder.image) {
            try {
              const fileName = extractFilename(purchaseOrder.image);
              await remove({ key: fileName });
            } catch (error) {
              console.log('Error deleting previous image:', error);
            }

            try{
                const fileName = `purchase-order-image-${Date.now()}.jpeg`;
                const fileKey = await uploadImageToS3(purchaseOrderInput.image, fileName);
                const newImageUrl = await getImageUrlFromS3(fileKey);
                purchaseOrderInput.image = newImageUrl;
            }catch(error){
                console.log(error)
            }
          }
          console.log("UPDATING PURCHASE ORDER WITH DATA",purchaseOrderInput)
          const updatedPurchaseOrder = await client.graphql({
            query: updatePurchaseOrder,
            variables: { input: purchaseOrderInput },
            authMode: 'apiKey',
          });
      
          setLoading(false);
          console.log('Updated Purchase Order:', updatedPurchaseOrder);
        } catch (error) {
          setLoading(false);
          console.error('Error updating purchase order:', error);
        }
      };
      
    
      const onSubmit = async () => {
        handleUpdatePurchaseOrder();
      };
    
      
    const getPurchaseOrder = /* GraphQL */ `
    query GetPurchaseOrder($id: ID!) {
      getPurchaseOrder(id: $id) {
        id
        purchaser
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        storePurchaseOrdersId
        __typename
      }
    }
  `;
    

        useEffect(() => {
            
            const fetchPurchaseOrder = async () => {
                setLoading(true);
               console.log("Start");
                try {
                    const { data } = await client.graphql({
                        query: getPurchaseOrder,
                        variables: { id: purchaseOrderId },
                        authMode: 'apiKey',
                    });
                    console.log("Received", purchaseOrder);
                    setPurchaseOrderImage(data.getPurchaseOrder.image[0]);
                    setLoading(false);
                    console.log("PO Image", purchaseOrderImage);
                    console.log("FINISH");
                } catch (error) {
                    console.error('Error fetching PO:', error);
                
                }
            };
        
            fetchPurchaseOrder();
        }, purchaseOrderId);

        useEffect(() => {
            setImage(true);
            console.log("Second", purchaseOrderId);
        },[purchaseOrderId]);

    const handleEdit = () => {
        setEditing(true);
    }
    // const handleUpdate = () => {
    //     setEditing(false);
    // }
    

 const handleUpdate = async () => {
    
    Keyboard.dismiss();
    const purchaseOrderInput = {
        id: purchaseOrderId,
        image: [purchaseOrderImage],
        vendor: purchaseOrderVendor,
        amount: purchaseOrderAmount,
        date: purchaseOrderDate,
        _version: purchaseOrderVersion,
    };
    console.log("PO Input",purchaseOrderInput);
    try {
      const response = await client.graphql({
        query: updatePurchaseOrder,
        variables: { input: purchaseOrderInput },
        authMode: 'apiKey',
      });
      console.log('PO updated:', response.data.updatePurchaseOrder);
      Alert.alert('PO updated successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Error updating po:', error);
      Alert.alert('Failed to update po.');
    }
  };

  const showConfirmationDialog = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this Purchase Order?", 
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDelete() }
      ],
      { cancelable: false }
    );
  };
  const handleDelete = async () => {
    Keyboard.dismiss();
    const purchaseOrderInput = {
        id: purchaseOrderId,
        _version: purchaseOrderVersion,
    };
    console.log("PO Input",purchaseOrderInput);
    try {
      const response = await client.graphql({
        query: deletePurchaseOrder,
        variables: { input: purchaseOrderInput },
        authMode: 'apiKey',
      });
      console.log('PO Deleted:', response.data.deletePurchaseOrder);
      Alert.alert('PO Deleted successfully!');
      setEditing(false);
    } catch (error) {
      console.error('Error deleting PO:', error);
      Alert.alert('Failed to deletig po.');
    }
  };
    const handleConfirm = () => {
        // Run your update query here
        setEditing(false); // Set editing back to false after confirmation
    }
        
    return (
        <View style={{flex:1}}>
            <View style={styles.headerContainer}>
                <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.arrowBackIcon}  onPress={()=> navigation.navigate('PurchaseHistory')}>
            <Ionic size={24} color='white' name ='chevron-back-outline'/>
        </TouchableOpacity>
                    <Text style={styles.headerText}>Purchase Order</Text>
                </View>
            </View>
            
            <View>
                <View>
                    <View style={styles.formInputContainer}>
                        <View style={styles.formInputWrapper}>
                            <View style={styles.imageContainer}>
                                <Text style={styles.label}>Date</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                {editing ? (
                                    <TextInput
                                        style={styles.formInput}
                                        value={purchaseOrderDate}
                                        onChangeText={setPurchaseOrderDate}
                                    />
                                ) : (
                                    <Text style={styles.formInput}>{purchaseOrderDate}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.formInputContainer}>
                        <View style={styles.formInputWrapper}>
                            <View style={styles.imageContainer}>
                                <Text style={styles.label}>Vendor</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                {editing ? (
                                    <TextInput
                                        style={styles.formInput}
                                        value={purchaseOrderVendor}
                                        onChangeText={setPurchaseOrderVendor}
                                    />
                                ) : (
                                    <Text style={styles.formInput}>{purchaseOrderVendor}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.formInputContainer}>
                        <View style={styles.formInputWrapper}>
                            <View style={styles.imageContainer}>
                                <Text style={styles.label}>Amount</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                {editing ? (
                                    <TextInput
                                    style={styles.formInput}
                                    value={String(purchaseOrderAmount)} // Convert to string using String()
                                    onChangeText={setPurchaseOrderAmount}
                                />                                
                                ) : (
                                    <Text style={styles.formInput}>{purchaseOrderAmount}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.formInputContainer}>
                    <View style={styles.uploadContainer}>
                    <View style={styles.uploadWrapper}>
    {editing ? (
        <TouchableOpacity style={styles.resetButton} onPress={handleChoosePhoto}>
            {loading ? (<Text style={styles.loading}>Loading ...</Text>) : (<Image source={image ? { uri: purchaseOrderImage } : require("../assets/images/person.jpg")} style={styles.selectedImage} />)}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.resetButton}>
            {loading ? (<Text style={styles.loading}>Loading ...</Text>) : (<Image source={image ? { uri: purchaseOrderImage } : require("../assets/images/person.jpg")} style={styles.selectedImage} />)}
        </TouchableOpacity>
    )}
</View>
</View>

                    </View>
                     <View style={styles.formInputContainer}>
                        <View style={styles.uploadContainerButton}>
                            <View style={styles.uploadWrapperButton}>
                                {editing ?
                                (  <TouchableOpacity style={styles.updateButton} onPress={handleUpdatePurchaseOrder}>
                                    <Text style={styles.updateText}>Update</Text>
                                </TouchableOpacity>):(  <TouchableOpacity style={styles.updateButton} onPress={handleEdit}>
                                    <Text style={styles.updateText}>Edit</Text>
                                </TouchableOpacity>)}
                                <TouchableOpacity style={styles.deleteButton} onPress={showConfirmationDialog}>
                                    <Text style={styles.deleteText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PurchaseOrder;

const styles = StyleSheet.create({
    headerContainer:{
        flex:0,
        backgroundColor:COLORS.primary,
    },
    // loadingContainer: {
    //     ...StyleSheet.absoluteFillObject,
    //     position:'absolute',
    //     zIndex:999999,
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    arrowBackIcon:{
        position:'absolute',
        top:50,
        left:8
    },
    headerWrapper:{
        paddingVertical:45,
        borderBottomRightRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    headerText:{
        fontFamily:'Poppins-Regular',
        fontSize:21,
        color:'white'
    },
    label:{
        fontFamily:'Poppins-Regular',
        color:COLORS.primary,
        fontSize:18.5,
        top:5,
    },
  formInputContainer:{
    borderBottomWidth:1,
    borderColor:'lightgray',
    paddingRight:20,
    paddingLeft:17,
    paddingBottom:20,
    paddingTop:20,
    width:'100%',

},
formInputContainerSelected:{
    borderBottomWidth:1,
    borderColor:'lightgray',
    paddingVertical:10,
    paddingRight:20,
    paddingLeft:17,
},

formInputWrapper:{
    flex:0,
    flexDirection:'row',
    paddingHorizontal:10,
},
formInput:{
    flex:0,
    width:'100%',
    fontSize:18.5,
    top:6,
    right:10,
    fontFamily:'Poppins-Regular',
    justifyContent:'center',
    alignItems:'center',
    color:'rgba(140, 140, 140,4)',
    textAlign:'center',
},
formInputSize:{
    flex:0,
    fontSize:19,
    top:6,
    fontFamily:'Poppins-Regular',
    justifyContent:'center',
    alignItems:'center',
    color:'black'
},
imageContainer:{
    flex:0,
    justifyContent:'center',
    alignItems:'center',
    // paddingVertical:10,
},

inputContainer:{
    flex:1,
    paddingLeft:20,
    justifyContent:'center',
    alignItems:'center',
},
saveContainer:{
    paddingVertical:20,
    paddingHorizontal:15,
},
saveWrapper:{
    flex:0,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center'
},
uploadContainer:{
    paddingVertical:5,
},
uploadWrapper:{
    flex:0,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:30,
},
uploadContainerButton:{
    paddingVertical:5,

},
uploadWrapperButton:{
    flex:0,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
},
updateButton:{
    backgroundColor:COLORS.secondary,
    paddingVertical:8,
    // paddingHorizontal:50,
    width:150,
    borderRadius:30,
    borderWidth:1.5,
    borderColor:COLORS.primary,
},
deleteButton:{
    backgroundColor:'red',
    paddingVertical:8,
    width:150,
    borderRadius:30,
    borderWidth:1.5,
    borderColor:COLORS.primary,
    
},
resetButton:{
    backgroundColor:'white',
    width:250,
    paddingVertical:8,
    borderRadius:30,
    borderWidth:1.5,
    borderColor:COLORS.primary,
    
},
saveText:{
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color:'white',
    textAlign:'center'
},
resetText:{
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color:COLORS.primary,
    textAlign:'center'
},
deleteText:{
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color:'white',
    textAlign:'center'
},
updateText:{
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color:COLORS.primary,
    textAlign:'center'
},
uploadText:{
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color:COLORS.primary,
    textAlign:'center',

},
selectedImage:{
    height:170,
    resizeMode: 'cover',
    borderRadius:30,
    borderColor:COLORS.primary,
    
},
loading:{
    height:170,
    borderRadius:30,
    borderColor:COLORS.primary,
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color:COLORS.primary,
    textAlign:'center',
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
    top:15,
  },
  successMessageContainer:{
    flex:0,
   alignItems:'center'
  },
  successButton: {
    backgroundColor: COLORS.secondary,
    width: 150,
    paddingVertical: 8,
    borderRadius: 30,
    top:20,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    top:1,
  },
  loadingText:{
    color:'white',
    fontSize:24,
    fontFamily:'Poppins-Regular',
    top:15,
  },
  loadingTextSubtitle:{
    color:'white',
    fontSize:20,
    fontFamily:'Poppins-Regular',
    top:15,
  },
  successMessageContainer:{
    flex:0,
   alignItems:'center'
  },
  successButton: {
    backgroundColor: COLORS.secondary,
    width: 150,
    paddingVertical: 8,
    borderRadius: 30,
    top:20,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    top:1,
  },

})