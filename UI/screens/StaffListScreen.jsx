import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native'; 

const StaffListScreen = () => {
 const navigation=useNavigation();
  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.arrowBack}  onPress={()=> navigation.goBack()}>
                    <Ionic size={25} color='white' name ='chevron-back-outline'/>
                </TouchableOpacity>
                <Text style={styles.cashierHeading}>Cashiers</Text>
            </View>
        </SafeAreaView>
        <View style={styles.listContainer}>
            <ScrollView>
            <View style={styles.billContainer}>
                <Image style={styles.logoStyles} source={require("../assets/images/person.jpg")}/>
                <View style={styles.billText}>
                    <View style={styles.intro}>

                    
                    <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                        Raja Zain
                        </Text>
                        <Text  style={styles.billTime}>
                        Joined : 21-08-2023
                        </Text>
                    </View>
                    </View>
                    <View>
                    <View  style={styles.billBottomText}>
                    <TouchableOpacity  style={styles.billViewButton}>
                            <Ionic size={26} color={COLORS.primary} name ='chevron-forward-outline'/>
                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
            <View style={styles.billContainer}>
                <Image style={styles.logoStyles} source={require("../assets/images/person.jpg")}/>
                <View style={styles.billText}>
                    <View style={styles.intro}>

                    
                    <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                        Syed Saif
                        </Text>
                        <Text  style={styles.billTime}>
                        Joined : 10-10-2023
                        </Text>
                    </View>
                    </View>
                    <View>
                    <View  style={styles.billBottomText}>
                    <TouchableOpacity  style={styles.billViewButton2}>
                            <Ionic size={26} color={COLORS.primary} name ='chevron-forward-outline'/>
                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
            <View style={styles.billContainer}>
                <Image style={styles.logoStyles} source={require("../assets/images/person.jpg")}/>
                <View style={styles.billText}>
                    <View style={styles.intro}>

                    
                    <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                        Mirza Abdullah
                        </Text>
                        <Text  style={styles.billTime}>
                        Joined : 21-08-2023
                        </Text>
                    </View>
                    </View>
                    <View>
                    <View  style={styles.billBottomText}>
                    <TouchableOpacity  style={styles.billViewButton2}>
                            <Ionic size={26} color={COLORS.primary} name ='chevron-forward-outline'/>
                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
            <View style={styles.billContainer}>
                <Image style={styles.logoStyles} source={require("../assets/images/person.jpg")}/>
                <View style={styles.billText}>
                    <View style={styles.intro}>

                    
                    <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                        Sibghat
                        </Text>
                        <Text  style={styles.billTime}>
                        Joined : 21-08-2023
                        </Text>
                    </View>
                    </View>
                    <View>
                    <View  style={styles.billBottomText}>
                    <TouchableOpacity  style={styles.billViewButton}>
                            <Ionic size={26} color={COLORS.primary} name ='chevron-forward-outline'/>
                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
            <View style={styles.billContainer}>
                <Image style={styles.logoStyles} source={require("../assets/images/person.jpg")}/>
                <View style={styles.billText}>
                    <View style={styles.intro}>

                    
                    <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                        Raja Zain
                        </Text>
                        <Text  style={styles.billTime}>
                        Joined : 21-08-2023
                        </Text>
                    </View>
                    </View>
                    <View>
                    <View  style={styles.billBottomText}>
                    <TouchableOpacity  style={styles.billViewButton}>
                            <Ionic size={26} color={COLORS.primary} name ='chevron-forward-outline'/>
                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
            <View style={styles.footerContainer}>
            <View style={styles.footerWrapper}>
                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmText}>Add Cashier</Text>
                </TouchableOpacity>
            </View>
        </View>
            </ScrollView>
        </View>
   </View>
  )
}

export default StaffListScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.primary,
    },
    safeArea:{
        backgroundColor:COLORS.primary,
        flex:1,
    },
    headerContainer:{
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:50,
        borderBottomLeftRadius:30,
    },
    cashierHeading:{
        color:'white',
        fontSize:24,
        fontFamily:'Poppins-Regular',
    },
    arrowBack:{
        position:'absolute',
        left:10,
    },
    listContainer:{
        flex:4.5,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:'rgba(240, 240, 240,4)',
    },
    billContainer:{
        flex:0,
        flexDirection:'row',
        // marginVertical:15,
        marginTop:25,
        marginHorizontal:25,
        paddingVertical:25,
        paddingHorizontal:10,
        backgroundColor:'white',
        elevation: 5, 
        shadowColor: 'black', 
        shadowOffset: {
            width: 0,
            height: 2, 
        },
    shadowOpacity: 1, 
    shadowRadius: 15, 
    borderRadius: 15, 
      },
      billText:{
        marginLeft:15,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      cashierName:{
        flex:2,
        flexDirection:'column',
        justifyContent:'space-around',
      },
      cashierText:{
        fontWeight:'400',
        color:'black',
        fontSize:17,
        fontFamily:'Roboto-Medium',
      },
      billTotal:{
        color:'hsl(0, 100%, 46%)',
        fontWeight:'700',
        fontSize:12.5,
      },
      billBottomText:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        right:2,
      },
      
      billTime:{
        color:'gray',
        fontWeight:'500',
        fontSize:11.5,
      },
      billViewButton:{
        paddingHorizontal:6,
        paddingVertical:5,
        borderRadius:15,
      },
      billViewButton2:{
        paddingHorizontal:6,
        paddingVertical:5,
        borderRadius:15,
      },
      billViewText:{
        fontWeight:'600',
        color:'black',
        fontSize:15,
      },
      logoStyles:{
        height:70,
        width:70,
        borderWidth:1,
        borderColor:'red',
        padding:10,
        borderRadius: 50, 
        overflow: 'hidden',
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
        fontSize:22,
        color:COLORS.primary,
        fontFamily:'Poppins-Regular',
        top:2,
    }
})