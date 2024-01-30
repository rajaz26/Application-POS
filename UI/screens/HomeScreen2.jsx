import { SafeAreaView, StyleSheet, Image,Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SalesLineChart from '../components/SalesLineChart'
import { COLORS } from '../assets/theme'
import Ionic from 'react-native-vector-icons/Ionicons';
import {productsObj} from '../assets/Products';
import { useNavigation } from '@react-navigation/native'; 
import { useSelector } from 'react-redux'; 
const HomeScreen2 = () => {
  const userRole = useSelector((state) => state.user.role);
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={{flex:1,backgroundColor:COLORS.primary}}>
        <View style={styles.wrapper}>
        {userRole === 'General Manager' && (
           <SafeAreaView style={styles.safeArea}>
             
                  <View style={styles.sliderWrapper}>
                      <SalesLineChart/>
                  </View>
                  <TouchableOpacity style={styles.drawerIcon} onPress={openDrawer}>
                     <Ionic name="menu-outline" size={26} color='white' style={styles.drawerIcon} />
                  </TouchableOpacity>  
            </SafeAreaView>)}
            <View style={[
          styles.body,
          (userRole === 'Cashier' || userRole === 'Warehouse' || userRole === 'Purchaser') ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 } : null,
        ]}>
               <View style={[
          styles.bodyWrapper,
          (userRole === 'Cashier' || userRole === 'Warehouse' || userRole === 'Purchaser') ? {justifyContent:'space-evenly' } : null,
        ]}> 
          
                <View style={styles.menuContainer}>
                  <Text style={styles.menuText}>Menu</Text>
                </View>
                <View style={styles.iconWrapper}>

                
                <View style={styles.icons}>
                  <TouchableOpacity style={styles.iconContainer} onPress={()=> navigation.navigate('Profile')}>
                    <Ionic name="person" size={25} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconContainer} onPress={() =>
    userRole === 'Purchaser'
      ? navigation.navigate('PurchaseHistory')
      : navigation.navigate('History')
  }>
                    <Ionic name="archive" size={25} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>History</Text>
                  </TouchableOpacity>
                  {userRole !== 'Purchaser' ? (
                  <TouchableOpacity style={styles.iconContainer} onPress={()=> navigation.navigate('Settings')}>
                    <Ionic name="settings" size={25} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>Settings</Text>
                  </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('Notifications')}
                  >
                    <Ionic name="notifications" size={28} color={COLORS.primary} />
                    <Text style={styles.iconText}>Updates</Text>
                  </TouchableOpacity>
                  )}
                </View>
                {userRole !== 'Purchaser' && ( 
                <View style={[styles.icons,styles.lastIcons]}>
        
            {userRole !== 'General Manager' ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Scan')}
              >
                <Ionic name="scan" size={28} color={COLORS.primary} />
                <Text style={styles.iconText}>Scan</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Stats')}
              >
                <Ionic name="stats-chart" size={28} color={COLORS.primary} />
                <Text style={styles.iconText}>Stats</Text>
              </TouchableOpacity>
            )}
            
                  <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductsList', {
                    productsObj: productsObj,
                  })
                }>
                    <Ionic name="list" size={28} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>Products</Text>
                  </TouchableOpacity>
                  
              {userRole === 'Cashier' ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Settings')}
              >
                <Ionic name="print" size={28} color={COLORS.primary} />
                <Text style={styles.iconText}>Printer</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Stats')}
              >
                <Ionic name="notifications" size={28} color={COLORS.primary} />
                <Text style={styles.iconText}>Notification</Text>
              </TouchableOpacity>
            )} 
        
                </View>)}
                </View>
                {userRole === 'General Manager' && (
                  <>
                  <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Previous Bills</Text>
                  </View>
                  <View style={styles.billSection}>
                  <View style={styles.billContainer}>
                    <Image style={styles.logoStyles} source={require("../assets/images/logo7.png")}/>
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          Cashier : Raja Zain
                        </Text>
                        <Text  style={styles.billTotal}>
                          Rs. 9975.2
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton} onPress={()=> navigation.navigate('Receipt')}>
                          <Text  style={styles.billViewText}>
                            View
                          </Text>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                </>
                )}
                
                
                
                
                {userRole === 'Purchaser' && (
                  <>
                  <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Purchase Order</Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
                  <View style={styles.purchaseSection}>
                  <View style={styles.billContainer}>
                  

                  
                    <View style={styles.billText}>
                      <View style={{flex:0,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                          <Text  style={styles.uploadText}>
                            Upload Purchase Order
                          </Text>
                          <View>
                          <Ionic name="chevron-forward" size={28} color={COLORS.primary} />
                        </View>
                      </View>
                      <View  style={styles.billBottomText}>
                        {/* <Text  style={styles.billTime}>
                          07:36 PM
                        </Text> */}
                      <TouchableOpacity  style={styles.billViewButton} onPress={()=> navigation.navigate('Receipt')}>
                          <Text  style={styles.billViewText}>
                            Fill Form
                          </Text>
                      </TouchableOpacity>
                     
                      </View>
                     
                    </View>
                  
                  </View>
                  
                </View>
                </TouchableOpacity>
                </>
                )}
                {userRole === 'Purchaser' && (
                  <>
                  <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Purchase History</Text>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('PurchaseHistory')}>
                  <View style={styles.purchaseSection}>
                  <View style={styles.billContainer}>
                    
                    <View style={styles.billText}>
                      <View style={{flex:0,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                          <Text  style={styles.uploadText}>
                            View Purchase Histoy
                          </Text>
                          <View>
                          <Ionic name="chevron-forward" size={28} color={COLORS.primary} />
                        </View>
                      </View>
                      <View  style={styles.billBottomText}>
                        {/* <Text  style={styles.billTime}>
                          07:36 PM
                        </Text> */}
                      <TouchableOpacity  style={styles.billViewButton} onPress={()=> navigation.navigate('Receipt')}>
                          <Text  style={styles.billViewText}>
                            Recent Purchases
                          </Text>
                      </TouchableOpacity>
                     
                      </View>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
                </>
                )}

                {userRole === 'Purchaser' && (
                  <>
                  <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Warehouse Quantity</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                  navigation.navigate('ProductsList', {
                    productsObj: productsObj,
                  })
                }>

                  
                  <View style={styles.purchaseSection}>
                  <View style={styles.billContainer}>
                    
                    <View style={styles.billText}>
                      <View style={{flex:0,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                          <Text  style={styles.uploadText}>
                            View Products Quantity
                          </Text>
                          <View>
                          <Ionic name="chevron-forward" size={28} color={COLORS.primary} />
                        </View>
                      </View>
                      <View  style={styles.billBottomText}>
                        {/* <Text  style={styles.billTime}>
                          07:36 PM
                        </Text> */}
                      <TouchableOpacity  style={styles.billViewButton} onPress={()=> navigation.navigate('Receipt')}>
                          <Text  style={styles.billViewText}>
                            Warehouse Inventory
                          </Text>
                      </TouchableOpacity>
                     
                      </View>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
                </>
                )}
                

                {/* WAREHOUSE */}
                {userRole === 'Warehouse' && (
                  <>
                  <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Last Scanned</Text>
                  </View>
                  <View style={styles.billSection}>
                  <View style={styles.billContainer}>
                    <Image style={styles.logoStyles} source={require("../assets/images/logo7.png")}/>
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          Dalda Oil - 1 Litre
                        </Text>
                        <Text  style={styles.billTotal}>
                          100 Pieces
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      {/* <TouchableOpacity  style={styles.billViewButton} onPress={()=> navigation.navigate('Receipt')}>
                          <Text  style={styles.billViewText}>
                            View
                          </Text>
                      </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                </View>
                </>
                )}
                {userRole === 'Warehouse' && (
                  <>
                  <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Recent Notifications</Text>
                  </View>
                  <View style={styles.billSection}>
                  <View style={styles.billContainer}>
                    <Image style={styles.logoStyles} source={require("../assets/images/logo7.png")}/>
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
                            Short
                          </Text>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                </>
                )}
                {userRole === 'Warehouse' && (
                  <>
                 
                  <View style={styles.billSection}>
                  <View style={styles.billContainer}>
                    <Image style={styles.logoStyles} source={require("../assets/images/logo7.png")}/>
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          Colgate 50mg
                        </Text>
                        <Text  style={styles.billTotal}>
                          20 Pieces
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton}>
                          <Text  style={styles.billViewText}>
                            Short
                          </Text>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                </>
                )}
                
                
                {/* CASHIER */}
                {userRole === 'Cashier' && (
                  <>
                <View style={styles.previousContainer}>
                  <Text style={styles.previousText}>Connected Printer</Text>
                </View>
            
                <View style={styles.billSection}>
                  <View style={styles.billContainer}>
                    {/* <Image style={styles.logoStyles} source={require("../assets/images/logo7.png")}/> */}
                    <Ionic size={27} style={{marginLeft:5}}color={COLORS.primary} name ='print-outline'/>
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          Device Name:
                        </Text>
                        <Text  style={styles.billTotal}>
                          Epson-2580
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          From : 07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton} onPress={()=> navigation.navigate('Receipt')}>
                          <Text  style={styles.billViewText}>
                            Change
                          </Text>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                </>
                )}
                {userRole === 'Cashier' && (
                  <>
                  <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Previous Bills</Text>
                  </View>
                  <View style={styles.billSection}>
                  <View style={styles.billContainer}>
                    <Image style={styles.logoStyles} source={require("../assets/images/logo7.png")}/>
                    <View style={styles.billText}>
                      <View style={styles.cashierName}>
                        <Text  style={styles.cashierText}>
                          Cashier : Raja Zain
                        </Text>
                        <Text  style={styles.billTotal}>
                          Rs. 9975.2
                        </Text>
                      </View>
                      <View  style={styles.billBottomText}>
                        <Text  style={styles.billTime}>
                          07:36 PM
                        </Text>
                      <TouchableOpacity  style={styles.billViewButton} onPress={()=> navigation.navigate('Receipt')}>
                          <Text  style={styles.billViewText}>
                            View
                          </Text>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                </>
                )}
                
              </View>
            </View>
        </View>
     
    </View>
  )
}

export default HomeScreen2

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    
  },
  sliderWrapper:{
    height:320,
    backgroundColor:COLORS.primary,
    position:'relative',
    top:20,
    
  },
  menuContainer:{
    marginTop:10,
    paddingHorizontal:30,
    marginBottom:10,
  },
  menuText:{
    fontFamily:'Poppins-SemiBold',
    fontSize:17,
    color:'gray',
  },
  previousText:{
    fontFamily:'Poppins-SemiBold',
    fontSize:17,
    color:'gray',
    marginBottom:10,
  },
  safeArea:{
    flex:1,
  },
  drawerIcon:{
    position:'absolute',
    left:10,
    top:10,
  },
  body:{
    backgroundColor:'white',
    flex:1.8,
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    
  },
  bodyWrapper:{
    flex:1,
    paddingVertical:10,
    paddingHorizontal:5,
    
  },
  icons:{
    flex:0,
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginBottom:25,

  },
  lastIcons:{
    marginBottom:15,
  },
  iconText:{
    top:4,
    color:COLORS.primary,
    fontFamily:'Poppins-Light',
    fontSize:13
    
  },
  iconContainer:{
    flex:0,
    backgroundColor:'white',
    height:80,
    width:80,
    justifyContent:'center',
    borderWidth:1,
    borderRadius:20,
    alignItems:'center',
    borderColor:'lightgray',
    elevation: 6, 
        shadowColor: 'black', 
        shadowOffset: {
            width: 0,
            height: 2, 
        },
    shadowOpacity: 1, 
    shadowRadius: 15, 
    borderRadius: 15, 
    
  },
  
  previousContainer:{
    paddingHorizontal:30,
  },
  billSection:{
    paddingHorizontal:11,
    height:100,
    marginHorizontal:26,
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
purchaseSection:{
  paddingHorizontal:11,
  height:100,
  marginHorizontal:26,
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
  alignItems:'center',
  justifyContent:'center' 
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
  paddingHorizontal:16,
  paddingVertical:5,
  borderRadius:15,
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
})