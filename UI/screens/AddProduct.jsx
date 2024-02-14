import { StyleSheet, Text, Alert, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput,ActivityIndicator,Keyboard} from 'react-native';
import React, { useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { launchImageLibrary } from 'react-native-image-picker';
import { Storage } from 'aws-amplify';
import { createProduct } from '../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { useForm, Controller } from 'react-hook-form';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const { width, height } = Dimensions.get('window');
const AddProduct = () => {
const client = generateClient();
 const navigation=useNavigation();
 const { handleSubmit, control, formState: { errors }, reset } = useForm(); 
 const [selected, setSelected] = React.useState("");
 const [loading, setLoading] = useState(false);
 const [successMessage, setSuccessMessage] = useState(false);
 const [productInput, setProductInput] = useState({
    name: '',
    barcode: '',
    price: '',
    manufacturer:'',
    category:'',
    warehouseQuantity: '',
  shelfQuantity:''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      if (response.uri) {
        setSelectedImage(response);
      }
    });
  };
  const handleLoading = () => {
    setLoading(true)
    setSuccessMessage(true);
  }
  const handleSuccessButtonPress= () => {
    setLoading(false)
    setSuccessMessage(false);
    reset(); 
  }
  const onSubmit = async (data) => {
    console.log('Product Input:', data);
    setLoading(true);
    Keyboard.dismiss();
    console.log(setLoading)
    
    try {
      let imageKey = null;
  
      if (selectedImage) {
        imageKey = `products/${selectedImage.fileName}`;
        await Storage.put(imageKey, selectedImage, {
          contentType: selectedImage.type,
        });
      }
  
      const productWithImage = {
        ...data,
        images: imageKey ? [imageKey] : [],
      };
  
      const newProduct = await client.graphql({
        query: createProduct,
        variables: { input: productWithImage },
        authMode: 'apiKey',
      });
      setSuccessMessage(true);
      console.log('New product created:', newProduct.data.createProduct);
      setProductInput({
        name: '',
        barcode: '',
        price: '',
        manufacturer:'',
        category:'',
      });
      reset(); 
      setSelectedImage(null);
    } catch (error) {
    setLoading(false);
      console.error('Error creating product:', error);
      Alert.alert('Login Error', error.message);
    }
    
  };
//   setLoading(false);
 const data = [
    {key:'1', value:'Mobiles'},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Cameras'},
    {key:'4', value:'Computers'},
    {key:'5', value:'Vegetables'},
    {key:'6', value:'Diary Products'},
    {key:'7', value:'Drinks'},
]

  return (
    <View style={styles.container}>
    {loading && (
      <View style={styles.loadingContainer}>
      <AnimatedCircularProgress
  size={120}
  width={15}
  fill={100}
  tintColor={COLORS.secondary}
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
 {!successMessage ? (
    <Text style={styles.loadingText}>Adding Product</Text>
  ) : (
    <View style={styles.successMessageContainer}>
      <Text style={styles.loadingText}>Product Added Successfully</Text>
      <TouchableOpacity
        style={styles.successButton}
        onPress={handleSuccessButtonPress}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  )}
      </View>
     )}
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.arrowBack}  onPress={()=> navigation.goBack()}>
                    <Ionic size={25} color='white' name ='chevron-back-outline'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageContainer} onPress={()=>handleLoading()}>
                <Text style={styles.cashierHeading}>Add Product</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        <View style={styles.listContainer}>
            <ScrollView >
                <View style={styles.cameraContainer}>
                    <TouchableOpacity style={styles.imageContainer} onPress={()=>handleChoosePhoto()}>
                        <Ionic style={styles.cameraImage} size={105} color='rgba(200, 200, 200,4)' name ='camera-outline'/>
                        <Ionic style={styles.plusImage} size={38} color={COLORS.primary} name ='add-circle'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.addPictureText}>Add Picture</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='pricetags-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                         <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      style={styles.formInput}
                      placeholder='Name'
                      placeholderTextColor='rgba(170, 170, 170,4)'
                      onChangeText={field.onChange}
                      value={field.value}
                    />
                  )}
                  name="name"
                  defaultValue=""
                />
                {errors.name && <Text style={styles.errorText}>Product Name is required</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='pricetags-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                        <Controller
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <TextInput
      style={styles.formInput}
      placeholder='Barcode'
      placeholderTextColor='rgba(170, 170, 170,4)'
      onChangeText={field.onChange}
      value={field.value}
    />
  )}
  name="barcode"
  defaultValue=""
/>
{errors.barcode && <Text style={styles.errorText}>Barcode is required</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='bag-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Controller
  control={control}
  render={({ field }) => (
    <TextInput
      style={styles.formInput}
      placeholder='Manufacturer'
      placeholderTextColor='rgba(170, 170, 170,4)'
      onChangeText={field.onChange}
      value={field.value}
    />
  )}
  name="manufacturer"
  defaultValue=""
/> 
                        </View>
                    </View>
                </View>
                <View style={styles.formInputContainerSelected}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={33} color='rgba(180, 180, 180,4)' name ='list-circle-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                        <SelectList 
                            setSelected={(val) => setSelected(val)} 
                            data={data} search={false} 
                            renderRightIcon={{size:30,}}
                            save="value"
                            placeholder="Category"
                            boxStyles={{ borderWidth:0,left:-16}} 
                            arrowicon={ <Ionic style={{top:3,left:7}} size={28} color='rgba(180, 180, 180,4)' name ='chevron-down-outline'/>}
                            inputStyles={{fontSize:18.5,top:1,fontFamily:'Poppins-Regular',color:'rgba(180, 180, 180,4)'}}
                            dropdownTextStyles={{ fontFamily:'Poppins-Regular',fontSize:15,color:'rgba(180, 180, 180,4)' }}
                            />
                        </View>
                    </View>
                </View>
            
                <View style={styles.formInputContainer}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='cash-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                    <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput
                        style={styles.formInput}
                        placeholder='Price in PKR'
                        placeholderTextColor='rgba(170, 170, 170,4)'
                        onChangeText={field.onChange}
                        value={field.value}
                        />
                    )}
                    name="price"
                    defaultValue=""
                    />
                    {errors.price && <Text style={styles.errorText}>Price is required</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='cash-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                    <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput
                        style={styles.formInput}
                        placeholder='Quantity in Warehouse'
                        placeholderTextColor='rgba(170, 170, 170,4)'
                        onChangeText={field.onChange}
                        value={field.value}
                        />
                    )}
                    name="warehouseQuantity"
                    defaultValue=""
                    />
                    {errors.price && <Text style={styles.errorText}>Price is required</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='cash-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                    <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextInput
                        style={styles.formInput}
                        placeholder='Quantity at Shelf'
                        placeholderTextColor='rgba(170, 170, 170,4)'
                        onChangeText={field.onChange}
                        value={field.value}
                        />
                    )}
                    name="shelfQuantity"
                    defaultValue=""
                    />
                    {errors.price && <Text style={styles.errorText}>Price is required</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.saveContainer}>
                    <View style={styles.saveWrapper}>
                        <TouchableOpacity style={styles.resetButton}>
                            <Text style={styles.resetText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton}  onPress={handleSubmit(onSubmit)} >
                            <Text style={styles.saveText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
   </View>
  )
}

export default AddProduct

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.primary,
        zIndex:-1,
    },
    safeArea:{
        backgroundColor:COLORS.primary,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        zIndex:-1,
    },
    headerContainer:{
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        width:width,
    },
    cashierHeading:{
        color:'white',
        fontSize:24,
        fontFamily:'Poppins-Regular',
        top:2,
    },
    arrowBack:{
        position:'absolute',
        left:10,
    },
    listContainer:{
        flex:5.5,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:'white',  
        zIndex:-1
    },
  
    cameraContainer:{
        // color:'darkgray',
        height:160,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        borderBottomWidth:1,
        borderColor:'lightgray'
    },
    plusImage:{
        position:"absolute",
        right:-6,
        bottom:6,
        backgroundColor:'white'
    },
    addPictureText:{
        fontSize:19,
        color:'rgba(180, 180, 180,4)',
        fontFamily:'Poppins-Regular'
    },
    formInputContainer:{
        borderBottomWidth:1,
        borderColor:'lightgray',
        paddingVertical:12,
        paddingRight:20,
        paddingLeft:17,
        
    },
    formInputContainerSelected:{
        borderBottomWidth:1,
        borderColor:'lightgray',
        paddingVertical:10,
        paddingRight:20,
        paddingLeft:17,
    },

    formInputWrapper:{
        flex:1,
        flexDirection:'row',
        paddingHorizontal:10,
    },
    formInput:{
        flex:1,
        fontSize:18.5,
        top:6,
        fontFamily:'Poppins-Regular',
        justifyContent:'center',
        alignItems:'center',
        color:'black'
    },
    formInputSize:{
        flex:1,
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
    },
    saveContainer:{
        paddingVertical:20,
        top:10,
    },
    saveWrapper:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
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
        width:150,
        paddingVertical:8,
        borderRadius:30,
        borderWidth:1,
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
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        position:'absolute',
        zIndex:999999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    
})