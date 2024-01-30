import { StyleSheet, Text, View ,TouchableOpacity,ScrollView,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const { width, height } = Dimensions.get('window');

const ConfirmBill = () => {
    const navigation=useNavigation();
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
            <Text style={styles.totalBill}>PKR 45,900.00</Text>
        </View>
        <View style={styles.columnHeadingContainer}>
            <View  style={styles.columnHeading}>
                <Text style={styles.headingText1}>ITEM</Text>
                <Text style={styles.headingText}>QTY</Text>
                <Text style={styles.headingText}>PRICE</Text>
                <Text  style={styles.headingText}>DEL</Text>
            </View>
        </View>
        

        <ScrollView  style={styles.scrollView}>
            <View  style={styles.billsContainer}>
                <View style={styles.billValuesContainer}>
                    <View style={styles.itemText}>
                        <Text style={styles.billValues1}>
                            Knorr Maggi
                        </Text>
                    </View>
                    <View style={styles.valueQty}>
                        <Text style={styles.billValues}>
                            1
                        </Text>                  
                    </View>
                    <View style={styles.valuePrice}>
                        <Text style={styles.billValues}>
                            110
                        </Text>
                    </View>    
                    <TouchableOpacity style={styles.deleteBill}>
                        <Ionic style={styles.trash}  size={21.5} color={'red'} name ='trash'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.billValuesContainer1}>
                    <View style={styles.itemText}>
                        <Text style={styles.billValues1}>
                            Tang 100mL
                        </Text>
                    </View>
                    <View style={styles.valueQty}>
                        <Text style={styles.billValues}>
                            1
                        </Text>                  
                    </View>
                    <View style={styles.valuePrice}>
                        <Text style={styles.billValues}>
                            110
                        </Text>
                    </View>    
                    <TouchableOpacity style={styles.deleteBill}>
                        <Ionic style={styles.trash}  size={21.5} color={'red'} name ='trash'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.billValuesContainer1}>
                    <View style={styles.itemText}>
                        <Text style={styles.billValues1}>
                            Daal Moong 1kg
                        </Text>
                    </View>
                    <View style={styles.valueQty}>
                        <Text style={styles.billValues}>
                            1
                        </Text>                  
                    </View>
                    <View style={styles.valuePrice}>
                        <Text style={styles.billValues}>
                            110
                        </Text>
                    </View>    
                    <TouchableOpacity style={styles.deleteBill}>
                        <Ionic style={styles.trash}  size={21.5} color={'red'} name ='trash'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.billValuesContainer1}>
                    <View style={styles.itemText}>
                        <Text style={styles.billValues1}>
                            Prince busicuit
                        </Text>
                    </View>
                    <View style={styles.valueQty}>
                        <Text style={styles.billValues}>
                            1
                        </Text>                  
                    </View>
                    <View style={styles.valuePrice}>
                        <Text style={styles.billValues}>
                            110
                        </Text>
                    </View>    
                    <TouchableOpacity style={styles.deleteBill}>
                        <Ionic style={styles.trash}  size={21.5} color={'red'} name ='trash'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.billValuesContainer1}>
                    <View style={styles.itemText}>
                        <Text style={styles.billValues1}>
                            Cherry Black Polish
                        </Text>
                    </View>
                    <View style={styles.valueQty}>
                        <Text style={styles.billValues}>
                            1
                        </Text>                  
                    </View>
                    <View style={styles.valuePrice}>
                        <Text style={styles.billValues}>
                            110
                        </Text>
                    </View>    
                    <TouchableOpacity style={styles.deleteBill}>
                        <Ionic style={styles.trash}  size={21.5} color={'red'} name ='trash'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.billValuesContainer1}>
                    <View style={styles.itemText}>
                        <Text style={styles.billValues1}>
                            Colgate MaxFresh
                        </Text>
                    </View>
                    <View style={styles.valueQty}>
                        <Text style={styles.billValues}>
                            1
                        </Text>                  
                    </View>
                    <View style={styles.valuePrice}>
                        <Text style={styles.billValues}>
                            201
                        </Text>
                    </View>    
                    <TouchableOpacity style={styles.deleteBill}>
                        <Ionic style={styles.trash}  size={21.5} color={'red'} name ='trash'/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        <View style={styles.footerContainer}>
            <View style={styles.footerWrapper}>
                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmText}>Confirm Bill</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
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
    },
    headingText1:{
        color:'white',
        fontSize:15,
        flex:0.5,
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
        borderColor:'rgba(180, 180, 180,4)'
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
        color:'gray'
    },
    valueQty:{
        flex:0.2,flexDirection:'row',justifyContent:'center',alignItems:'center',        
    },
    valuePrice:{
        flex:0.8,flexDirection:'row',justifyContent:'center',alignItems:'center',
    },
  
    itemText:{
        flex:1.4,
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