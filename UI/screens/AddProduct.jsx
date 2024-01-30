import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity , TextInput} from 'react-native'
import React,{ useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native'; 
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
const { width, height } = Dimensions.get('window');

const AddProduct = () => {
 const navigation=useNavigation();
 const [selected, setSelected] = React.useState("");
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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.arrowBack}  onPress={()=> navigation.goBack()}>
                    <Ionic size={25} color='white' name ='chevron-back-outline'/>
                </TouchableOpacity>
                <Text style={styles.cashierHeading}>Add Product</Text>
            </View>
        </SafeAreaView>
        <View style={styles.listContainer}>
            <ScrollView >
                <View style={styles.cameraContainer}>
                    <TouchableOpacity style={styles.imageContainer}>
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
                            <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/>
                        </View>
                    </View>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='bag-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.formInput}  placeholder='Company'  placeholderTextColor='rgba(170, 170, 170,4)'/>
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
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='expand-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.formInputSize}  placeholder='Size'  placeholderTextColor='rgba(170, 170, 170,4)'/>
                        </View>
                    </View>
                </View>
                <View style={styles.formInputContainer}>
                    <View style={styles.formInputWrapper}>
                        <View style={styles.imageContainer}>
                             <Ionic size={32} color='rgba(180, 180, 180,4)' name ='cash-outline'/>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.formInput}  placeholder='Price in PKR'  placeholderTextColor='rgba(170, 170, 170,4)'/>
                        </View>
                    </View>
                </View>
                <View style={styles.saveContainer}>
                    <View style={styles.saveWrapper}>
                        <TouchableOpacity style={styles.resetButton}>
                            <Text style={styles.resetText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton}>
                            <Text style={styles.saveText}>Save</Text>
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
    },
    safeArea:{
        backgroundColor:COLORS.primary,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
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
    }
    
})