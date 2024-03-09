import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Alert, Image } from 'react-native';
import { COLORS } from '../assets/theme';
import { createPurchaseOrder } from '../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-native-datepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { getUrl, uploadData } from 'aws-amplify/storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const UploadPurchase = () => {
    const [date, setDate] = useState('');
    const [vendor, setVendor] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(true);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isEmptyField, setIsEmptyField] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const userId= useSelector((state) => state.user.userId);
    const [purchaseOrderInput, setPurchaseOrderInput] = useState({
        date: '',
        vendor: '',
        amount: '',
        userId:'',
        image: '',
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const client = generateClient();
    const navigation = useNavigation();
    const { handleSubmit, control, formState: { errors }, reset } = useForm();
    const handleLoading = () => {
        setLoading(true)
        setSuccessMessage(true);
      }
      const handleSuccessButtonPress= () => {
        setLoading(false)
        setSuccessMessage(false);
        reset(); 
      }
    const handleChoosePhoto = () => {
        launchImageLibrary({}, (response) => {
          console.log(response);
          if (response.assets && response.assets.length > 0) {
            const imageUri = response.assets[0].uri;
            setSelectedImage(imageUri); 
            setSelectedImageUri(response.assets[0]); 
            console.log(selectedImage);
          } else {
            console.log('No image selected or unexpected response structure');
          }
        });
    };
      
    const uploadImageToS3 = async (imageUri, fileName) => {
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            console.log("image ::: "+imageUri);
            console.log("bloob: "+blob);
    
            const uploadResult = await uploadData({
                key: fileName,
                data: blob,
                options: {
                    contentType: 'image/jpeg', 
                    accessLevel :'guest',
                }
            }).result;
            console.log('Upload success:', uploadResult);
            return uploadResult.key; 
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };
    
    const getImageUrlFromS3 = async (fileKey) => {
      try {
          console.log("file key is here: " + fileKey);
          
          // Fetch the signed URL for the uploaded file
          const getUrlResult = await getUrl({
              key: fileKey,
              options: {
                  accessLevel: 'guest',
                  useAccelerateEndpoint: true, 
              },
          });
          
          console.log('***************************Signed Image :', getUrlResult);
          console.log('***************************Signed Image URL:', getUrlResult.url);
          return getUrlResult.url; // Return the signed URL
      } catch (error) {
          console.error('Error getting image URL:', error);
          throw error;
      }
    };
      
    
    const onSubmit = async () => {
        console.log('Product Input:');
        setLoading(true);
        Keyboard.dismiss();
        if (!date || !vendor || !amount || !selectedImage) {
            setIsEmptyField(true);
            setLoadingMessage(false);
            setError(true);
            setErrorMessage("Kindly fill the fields");
            return;
        }

        try {
            const fileName = `po-image-${Date.now()}.jpeg`;
            console.log('Here 1');
            const fileKey = await uploadImageToS3(selectedImage, fileName);
            console.log('Here 2');
            console.log('File uploaded with key:', fileKey);
        
            const imageUrl = await getImageUrlFromS3(fileKey);
            console.log('S3 Image URL:', imageUrl);
            console.log("url bamzi : "+imageUrl.toString());
            
            const purchaseOrderData = {
                date: date,
                vendor: vendor,
                amount: amount,
                image: [imageUrl],
                purchaser: userId,
            };
            console.log("Purchase input",purchaseOrderData);
            const newPurchaseOrder = await client.graphql({
                query: createPurchaseOrder,
                variables: { input: {
                    date: date,
                    vendor: vendor,
                    amount: amount,
                    image: [imageUrl],
                    purchaser: userId,
                }},
                authMode: 'apiKey',
            });
            setLoadingMessage(false);
            setSuccess(true);
            setDate('');
            setAmount('');
            setVendor('');
            setSelectedImage('');
            setSelectedImageUri('');
            console.log('New Purchase Order created:', newPurchaseOrder.data);
            setPurchaseOrderInput({
                date: '',
                vendor: '',
                amount: '',
                image:'',
                userId:''
            });
            reset(); 
            setSelectedImage(null);
        } catch (error) {
            setLoadingMessage(false);
            setError(true);
            setErrorMessage(error);
            console.error('Error creating PO', error);
            Alert.alert('Login Error', error.message);
        }
    };
    
    return (
        <View style={{flex:1}}>
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
{loadingMessage ? (
  <Text style={styles.loadingText}>Adding Purchase Order</Text>
) : success ? (
  <View style={styles.successMessageContainer}>
    <Text style={styles.loadingText}>PO Added Successfully</Text>
    <TouchableOpacity
      style={styles.successButton}
      onPress={handleSuccessButtonPress}>
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  </View>
) : error ? (
  <View style={styles.successMessageContainer}>
    <Text style={styles.loadingText}>Adding PO FAILED</Text>
    <Text style={styles.loadingTextSubtitle}>{errorMessage}</Text>
    <TouchableOpacity
      style={styles.successButton}
      onPress={handleSuccessButtonPress}>
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  </View>
) : null}

      </View>
     )}
            <View style={styles.headerContainer}>
            
                {/* {isEmptyField && (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.errorText}>Please fill in all fields and upload an image</Text>
                    </View>
                )} */}
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Upload Purchase Order</Text>
                </View>
            </View>
            <View>
                <View>
                    <View>
                        <View style={styles.formInputContainer}>
                            <View style={styles.formInputWrapper}>
                                <View style={styles.imageContainer}>
                                    <Text style={styles.label}>Date</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        value={date}
                                        onChangeText={setDate}
                                        style={styles.formInput}
                                        placeholderTextColor='rgba(170, 170, 170,4)'
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.formInputContainer}>
                            <View style={styles.formInputWrapper}>
                                <View style={styles.imageContainer}>
                                    <Text style={styles.label}>Vendor</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        value={vendor}
                                        onChangeText={setVendor}
                                        style={styles.formInput}
                                        placeholderTextColor='rgba(170, 170, 170,4)'
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.formInputContainer}>
                            <View style={styles.formInputWrapper}>
                                <View style={styles.imageContainer}>
                                    <Text style={styles.label}>Amount</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        value={amount}
                                        onChangeText={setAmount}
                                        style={styles.formInput}
                                        placeholderTextColor='rgba(170, 170, 170,4)'
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.formInputContainer}>
                            <View style={styles.uploadContainer}>
                                <View style={styles.uploadWrapper}>
                                    <TouchableOpacity style={styles.resetButton} onPress={handleChoosePhoto}>
                                    {selectedImageUri ? (
          <Image source={{uri: selectedImageUri.uri}} style={styles.selectedImage} />
        ) : (
          <Text style={styles.uploadText}>Upload Image</Text>
        )}
                                    </TouchableOpacity>
                                   
                                </View>
                            </View>
                        </View>
             
                        <View style={styles.saveContainer}>
                            <View style={styles.saveWrapper}>
                                <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
                                    <Text style={styles.saveText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UploadPurchase;

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
    alignItems:'center'
},
saveButton:{
    backgroundColor:COLORS.primary,
    width:150,
    paddingVertical:8,
    borderRadius:30,
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