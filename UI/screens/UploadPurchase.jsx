import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
  } from 'react-native';

import React, {useState} from 'react';
import { COLORS } from '../assets/theme'
import Ionic from 'react-native-vector-icons/Ionicons';
const UploadPurchase = () => {
    const [date, setDate] = useState('Enter Date');
    const [vendor, setVendor] = useState(" ");
    const [amount, setAmount] = useState(" ");
  return (
    <View>
      <View style={styles.headerContainer}>
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
                        {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
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
                        {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
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
                        {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
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
            <TouchableOpacity style={styles.resetButton}>
                            <Text style={styles.uploadText}>Upload Image</Text>
            </TouchableOpacity>
            </View>
            </View>
            </View>
            <View style={styles.saveContainer}>
                    <View style={styles.saveWrapper}>
                        <TouchableOpacity style={styles.saveButton}>
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

export default UploadPurchase

const styles = StyleSheet.create({
    headerContainer:{
        flex:0,
        backgroundColor:COLORS.primary,
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
uploadText:{
    fontFamily:'Poppins-Regular',
    fontSize:18,
    color:COLORS.primary,
    textAlign:'center',

}

})