import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
  } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../assets/theme'
const Notifications = () => {
    const navigation = useNavigation();
  return (
    <View>
        
      <View style={styles.headerContainer}>
      
        <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.arrowBackIcon}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionic size={22} color="white" name="chevron-back-outline" />
        </TouchableOpacity>
            <Text style={styles.headerText}>Notifications</Text>
        </View>
        
      </View>
      
      <ScrollView style={styles.notificationContainer}>
      
      <View style={styles.billSection}>
        <View style={styles.billContainer}>
                <Ionic name="notifications-outline" size={28} color={COLORS.primary} /> 
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          LU Prince - 20 mg
                        </Text>
                        <Text  style={styles.billTotal}>
                          10 Pieces
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton}>
                          <Text  style={styles.billViewText}>
                            Done
                          </Text>
                          <View style={styles.mark}>
                            <Ionic name="checkmark-outline" size={18} color={COLORS.primary} />
                          </View>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
        </View>
        <View style={styles.billSection}>
        <View style={styles.billContainer}>
                <Ionic name="notifications-outline" size={28} color={COLORS.primary} /> 
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          LU Prince - 20 mg
                        </Text>
                        <Text  style={styles.billTotal}>
                          10 Pieces
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton}>
                          <Text  style={styles.billViewText}>
                            Done
                          </Text>
                          <View style={styles.mark}>
                            <Ionic name="checkmark-outline" size={18} color={COLORS.primary} />
                          </View>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
        </View>
        <View style={styles.billSection}>
        <View style={styles.billContainer}>
                <Ionic name="notifications-outline" size={28} color={COLORS.primary} /> 
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          LU Prince - 20 mg
                        </Text>
                        <Text  style={styles.billTotal}>
                          10 Pieces
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton}>
                          <Text  style={styles.billViewText}>
                            Done
                          </Text>
                          <View style={styles.mark}>
                            <Ionic name="checkmark-outline" size={18} color={COLORS.primary} />
                          </View>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
        </View>
        <View style={styles.billSection}>
        <View style={styles.billContainer}>
                <Ionic name="notifications-outline" size={28} color={COLORS.primary} /> 
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          LU Prince - 20 mg
                        </Text>
                        <Text  style={styles.billTotal}>
                          10 Pieces
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton}>
                          <Text  style={styles.billViewText}>
                            Done
                          </Text>
                          <View style={styles.mark}>
                            <Ionic name="checkmark-outline" size={18} color={COLORS.primary} />
                          </View>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
        </View>
        <View style={styles.billSection}>
        <View style={styles.billContainer}>
                <Ionic name="notifications-outline" size={28} color={COLORS.primary} /> 
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          LU Prince - 20 mg
                        </Text>
                        <Text  style={styles.billTotal}>
                          10 Pieces
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton}>
                          <Text  style={styles.billViewText}>
                            Done
                          </Text>
                          <View style={styles.mark}>
                            <Ionic name="checkmark-outline" size={18} color={COLORS.primary} />
                          </View>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
        </View>
    </ScrollView>
      
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
    headerContainer:{
        flex:0,
        backgroundColor:COLORS.primary,
    },
    headerWrapper:{
        paddingVertical:40,
        borderBottomRightRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    headerText:{
        fontFamily:'Poppins-Regular',
        fontSize:21,
        color:'white',
        paddingTop:5,
    },
    arrowBackIcon: {
        position: 'absolute',
        left: 8,

    },
    notificationContainer:{
        paddingVertical:20,
    },
    billSection:{
        paddingHorizontal:11,
        height:100,
        marginHorizontal:20,
        paddingVertical:20,
        marginBottom:10,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:10,
        borderColor:'lightgray',
        elevation: 4, 
            shadowColor: 'gray', 
            shadowOffset: {
                width: 0,
                height: 2, 
            },
        shadowOpacity: 1, 
        shadowRadius: 10, 
        borderRadius: 15,
        flex:0,
    },
    
    billContainer:{
      flex:0,
      flexDirection:'row',  
    },
    billText:{
      marginHorizontal:12,
      flex:1,
    },
    cashierName:{
      flex:0,
      flexDirection:'row',
      justifyContent:'space-between',
    
    },
    cashierText:{
      fontWeight:'500',
      color:'black',
      fontSize:13,
      fontFamily:'Poppins-Regular',
    
    },
    uploadText:{
      fontWeight:'500',
      color:'black',
      fontSize:16,
      fontFamily:'Poppins-Regular',
    
    },
    billTotal:{
      color:'hsl(0, 100%, 46%)',
      fontWeight:'700',
      fontSize:13.5,
    
    },
    billBottomText:{
      flex:0,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:10,
    },
    billTime:{
      color:'gray',
      fontSize:12,
      fontFamily:'Poppins-Regular',
    },
    billViewButton:{
      backgroundColor:'rgba(180, 180, 180,0.5)',
      paddingLeft:14,
      paddingRight:10,
      paddingVertical:5,
      borderRadius:15,
      flexDirection:'row',
      left:5,
    },
    billViewText:{
      fontWeight:'600',
      color:'black',
      fontSize:13,
    },
    logoStyles:{
      height:30,
      width:30,
      marginRight:10,
    },
    mark:{
        marginLeft:5,
    }
})