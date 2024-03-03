import { StyleSheet, Text, Alert, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput,ActivityIndicator,Keyboard} from 'react-native';
import React, {useEffect, useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native';
import { Dimensions,Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadData, getUrl,remove } from 'aws-amplify/storage';
import { deleteProduct,updateProduct } from '../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { useForm, Controller } from 'react-hook-form';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const { width, height } = Dimensions.get('window');


const Product = ({ route }) => {

const  product  = route.params.item;
useEffect(() => {
}, [product,startingProductImageUrl]);

const [startingProductImageUrl, setStartingProductImageUrl] = useState(product.image);
const client = generateClient();
 const navigation=useNavigation();
 const { handleSubmit, control, formState: { errors }, reset } = useForm(); 
 const [selected, setSelected] = React.useState("");
 const [loading, setLoading] = useState(false);
 const [successMessage, setSuccessMessage] = useState(false);
 const [isEditing, setIsEditing] = useState(false);
 const [selectedImage, setSelectedImage] = useState(null);
 useEffect(() => {
}, [selectedImage]); 

const [productInput, setProductInput] = useState({
  id:product.id,
  name: product.name,
  barcode: product.barcode,
  price: product.price,
  manufacturer: product.manufacturer,
  category: product.category,
  warehouseQuantity: product.warehouseQuantity,
  shelfQuantity: product.shelfQuantity,
  image: product.image,
  _version:product._version,
});
useEffect(() => {
  setProductInput({
    id: product.id,
    name: product.name,
    barcode: product.barcode,
    price: product.price,
    manufacturer: product.manufacturer,
    category: product.category,
    warehouseQuantity: product.warehouseQuantity,
    shelfQuantity: product.shelfQuantity,
    image: product.image,
    _version: product._version,
  });
}, [product]);
  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      console.log(response);
      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        console.log("local @@@@@@@@"+imageUri);
        setProductInput(prevState => ({
          ...prevState,
          image: imageUri,
        }));
      } else {
        console.log('No image selected or unexpected response structure');
      }
    });
  };
  const extractFilename = (url) => {
    console.log("url product",url);
    const regex = /[\w-]+\.jpeg/;
    const matches = url.match(regex);
    return matches ? matches[0] : null;
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => confirmDelete() }, // Wrap the call in an arrow function
      ],
      { cancelable: false }
    );
  };
  const confirmDelete = async () => {
    setLoading(true);
    console.log("trying to delete : " + productInput.id);
    const deleteProductInput = {
      id: product.id,
      _version: product._version,
    };

    try {
        await client.graphql({
            query: deleteProduct,
            variables: {input:deleteProductInput},
            authMode:'apiKey'
        });

        console.log('Product deleted successfully.');
        setLoading(false);
        Alert.alert(
          'Deletion Successful',
          'The product is deleted successfully');
        navigation.navigate("ProductsList");
    } catch (error) {
        console.error('Error deleting product:', error);
        setLoading(false);
        Alert.alert(
          'Deletion Unsuccessful',
          'The product deletion failed!')
    }
    try {
      const fileName=extractFilename(productInput.image);
      console.log("xxxx1"+fileName);
      await remove({ key: fileName});
    } catch (error) {
      console.log('Error ', error);
    }
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
            //   expiresIn: 9000909,
              useAccelerateEndpoint: true, 
          },
      });
      
      console.log('***************************Signed Image :', getUrlResult);
      console.log('***************************Signed Image URL:', getUrlResult.url);
      return getUrlResult.url; 
  } catch (error) {
      console.error('Error getting image URL:', error);
      throw error;
  }
};
  
  const handleLoading = () => {
    setLoading(true)
    setSuccessMessage(true);
  }
  const handleSuccessButtonPress= () => {
    setLoading(false)
    setSuccessMessage(false);

  }

const UploadNewImage=async()=>{
  try {
    const fileName = `product-image-${Date.now()}.jpeg`;
    console.log('Uploading new image...');
    const fileKey = await uploadImageToS3(productInput.image, fileName);
    console.log('New image uploaded with key:', fileKey);
    const newImageUrl = await getImageUrlFromS3(fileKey);
  
    console.log("New Image URL:", newImageUrl);
    console.log("New Image URL String ****:", newImageUrl);
    return newImageUrl.toString();
  } catch (error) {
    console.error("An error occurred during the upload process:", error);
}
}
const handleUpdateData = async () => {
  setLoading(true);
  
  console.log("this should be delete $$%$%$"+startingProductImageUrl);
  console.log("this should be delete $$%$%$2"+productInput.image);
  if (startingProductImageUrl !== productInput.image) {
    try {
      const fileName=extractFilename(startingProductImageUrl);
      console.log("xxxx1"+fileName);
      await remove({ key: fileName});
    } catch (error) {
      console.log('Error ', error);
    }
    try {
      const newImageFromS3=await UploadNewImage();
      console.log("navi image ********"+newImageFromS3);
      
      console.log("Updated productInput with old image:", productInput.image);
      productInput.image=newImageFromS3;
      setStartingProductImageUrl(newImageFromS3);
       console.log("Updated productInput with new image:", productInput.image);
      
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }   
  try {
    console.log('Updating product with input:', productInput);
    const updatedProduct = await client.graphql({

      query: updateProduct,
      variables: { input: productInput },
      authMode: 'apiKey',
    });
    setLoading(false);
    console.log('Updated Product:', updatedProduct);
  } catch (error) {
    setLoading(false);
    console.error('Error updating product:', error);
  }
};
  const onSubmit = async (data) => {
    handleUpdateData();
  };
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
    <View style={styles.successMessageContainer}>
      <Text style={styles.loadingText}>updating Product</Text>
      <TouchableOpacity
        style={styles.successButton}
        onPress={handleSuccessButtonPress}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
      </View>
     )}
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.arrowBack}  onPress={()=> navigation.goBack()}>
                    <Ionic size={25} color='white' name ='chevron-back-outline'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageContainer} onPress={()=>handleLoading()}>
                <Text style={styles.cashierHeading}>{product.name}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        <View style={styles.listContainer}>
            <ScrollView >
            <View style={styles.cameraContainer}>
    {!isEditing && product.image && (
        <Image source={{ uri: productInput.image }} onError={(error) => console.log("Image loading error:", error)} style={styles.productImage} />
    )}
    {isEditing && (
      
        <TouchableOpacity style={styles.imageContainer} onPress={handleChoosePhoto}>
            <Image source={{ uri: productInput.image }} onError={(error) => console.log("Image loading error:", error)} style={styles.productImage} />
            <Ionic style={styles.plusImage} size={38} color={COLORS.primary} name='add-circle' />
        </TouchableOpacity>
    )}
    {isEditing && (
        <TouchableOpacity>
            <Text style={styles.addPictureText}>change Picture</Text>
        </TouchableOpacity>
    )}
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
                      onChangeText={(text) => setProductInput(prevState => ({ ...prevState, name: text }))}
                      value={productInput.name}
                      editable={isEditing}
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
      onChangeText={(text) => setProductInput(prevState => ({ ...prevState, barcode: text }))}
      value={productInput.barcode}
      editable={isEditing}
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
      onChangeText={(text) => setProductInput(prevState => ({ ...prevState, manufacturer: text }))}
      value={productInput.manufacturer}
      editable={isEditing}
    />
  )}
  name="manufacturer"
  defaultValue=""
/> 
                        </View>
                    </View>
                </View>{isEditing ? (
  <View style={styles.formInputContainerSelected}>
    <View style={styles.formInputWrapper}>
      <View style={styles.imageContainer}>
        <Ionic size={33} color='rgba(180, 180, 180,4)' name='list-circle-outline'/>
      </View>
      <View style={styles.inputContainer}>
        <SelectList 
          setSelected={(val) => {
            setSelected(val);
            setProductInput(prevState => ({ ...prevState, category: val }));
          }} 
          data={data} 
          search={false} 
          renderRightIcon={{size:30,}}
          save="value"
          placeholder={productInput.category}
          boxStyles={{ borderWidth:0,left:-16}} 
          arrowicon={<Ionic style={{top:3,left:7}} size={28} color='rgba(180, 180, 180,4)' name='chevron-down-outline'/>}
          inputStyles={{fontSize:18.5,top:1,fontFamily:'Poppins-Regular',color:'rgba(180, 180, 180,4)'}}
          dropdownTextStyles={{ fontFamily:'Poppins-Regular',fontSize:15,color:'rgba(180, 180, 180,4)' }}
        />
      </View>
    </View>
  </View>
) : (
  <View style={styles.formInputContainerSelected}>
    <View style={styles.formInputWrapper}>
      <View style={styles.imageContainer}>
        <Ionic size={33} color='rgba(180, 180, 180,4)' name='list-circle-outline'/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.formInput}>
          {productInput.category}
        </Text>
      </View>
    </View>
  </View>
)}

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
                        onChangeText={(text) => setProductInput(prevState => ({ ...prevState, price: text }))}
                        value={productInput.price.toString()}
                        editable={isEditing}
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
                        onChangeText={(text) => setProductInput(prevState => ({ ...prevState, warehouseQuantity: text }))}
                        value={productInput.warehouseQuantity.toString()}
                        editable={isEditing}
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
                        onChangeText={(text) => setProductInput(prevState => ({ ...prevState, shelfQuantity: text }))}
                        value={productInput.shelfQuantity.toString()}
                        editable={isEditing}
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
                    <TouchableOpacity 
                      style={styles.resetButton} 
                      onPress={() => {
                          if (isEditing) {
                              handleUpdateData();
                              setIsEditing(false); // After updating data, set isEditing to false
                          } else {
                              setIsEditing(true); // If not editing, toggle editing mode
                          }
                      }}
                    >
    <Text style={styles.resetText}>{isEditing ? 'Save' : 'Edit'}</Text>
</TouchableOpacity>

                        <TouchableOpacity style={styles.saveButton} onPress={handleDelete}>
                         <Text style={styles.saveText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
   </View>
  )
}

export default Product

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
        right:-36,
        bottom:6,
        backgroundColor:'white'
    },
    addPictureText:{
        fontSize:14,
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
    productImage: {
      width: 130,
      height: 130,
      borderRadius: 65, // Half of the width/height
      alignSelf: 'center',
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