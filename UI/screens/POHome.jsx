import { SafeAreaView, StyleSheet, Image,Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SalesLineChart from '../components/SalesLineChart'
import { COLORS } from '../assets/theme'
import Ionic from 'react-native-vector-icons/Ionicons';
import {productsObj} from '../assets/Products';
import { useNavigation } from '@react-navigation/native'; 
import { useSelector} from 'react-redux'; 
import { createProduct } from '../src/graphql/mutations';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { useIsFocused } from '@react-navigation/native';
import { getCurrentUser, signInWithRedirect, signOut } from "aws-amplify/auth";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { listBills,listBillItems,userById  } from '../src/graphql/queries';
import { selectConnectedDevice } from '../store/bluetoothReducer';
const POHome = () => {
  const dispatch = useDispatch();
  const client = generateClient();
  const connectedDevice = useSelector(state => selectConnectedDevice(state)?.name);
 const userRole = useSelector((state) => state.user.role);
 const [loading, setLoading] = useState(true); 
//const userRole = 'GENERAL_MANAGER';
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  useEffect(() => {
    console.log("User role from Redux store:", userRole);
    console.log("Connected",connectedDevice);
  }, [userRole]);

  
const userByIdQuery = /* GraphQL */ `
query UserById($userId: ID!) {
  userById(userId: $userId) {
    items {
      id
      userId
      username
      phonenumber
      image
      role
      idcardimage
      store {
        id
        name
        address
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      storeUsersId
      __typename
    }
  }
}
`;
useEffect(() => {
  const fetchUserDetails = async () => {
    try {
      const currentUser = await fetchUserAttributes();
      const userId = currentUser.sub; 

      const { data } = await client.graphql({
        query: userByIdQuery,
        variables: { userId: userId },
        authMode: 'apiKey',
      });

      const userDetails = data.userById.items[0]; 
      if (userDetails) {
        dispatch(setUserDetails({
          userId: userDetails.userId,
          username: userDetails.username,
          role: userDetails.role,
        }));
        setLoading(false); 
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false); 
    }
  };

  fetchUserDetails();
}, [dispatch]);
  return (
    <View style={{flex:1,backgroundColor:COLORS.primary}}>
      {loading && 
      <View style={styles.loadingContainer}>
       <AnimatedCircularProgress
  size={120}
  width={15}
  fill={100}
  prefill={0} 
  delay={10}
  duration={2200} 
  tintColor={COLORS.secondary}
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="white" />
  </View>}
  <View style={styles.wrapper}>
        <View style={[
  styles.body,
  { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
]}>

               <View style={[
          styles.bodyWrapper,
          {justifyContent:'space-evenly' }
        ]}> 
                <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.drawerIcon2} onPress={openDrawer}>
                     <Ionic name="menu-outline" size={30} color={COLORS.primary}  style={styles.drawerIcon2} />
                  </TouchableOpacity> 
                  <Text style={styles.menuText}>Menu</Text>
                </View>
                <View style={styles.iconWrapper}>    
                <View style={styles.icons}>
         
     <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('PurchaseHistory')}>
                     <Ionic name="archive" size={25} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>POs List</Text>
                  </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => navigation.navigate('Notifications')}
                  >
                    <Ionic name="notifications" size={28} color={COLORS.primary} />
                    <Text style={styles.iconText}>Alerts</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductsList', {
                    productsObj: productsObj,
                  })
                }>
                    <Ionic name="list" size={28} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>Products</Text>
                  </TouchableOpacity> 
                </View>
          
            
                </View>
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
               
                  <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Products </Text>
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
                            View Products 
                          </Text>
                          <View>
                          <Ionic name="chevron-forward" size={28} color={COLORS.primary} />
                        </View>
                      </View>
                      <View  style={styles.billBottomText}>
                        {/* <Text  style={styles.billTime}>
                          07:36 PM
                        </Text> */}
                      <TouchableOpacity  style={styles.billViewButton} onPress={()=> navigation.navigate('ProductsList')}>
                          <Text  style={styles.billViewText}>
                            Products in Inventory
                          </Text>
                      </TouchableOpacity>
                     
                      </View>
                    </View>
                  </View>
                </View>
                </TouchableOpacity>
              </View>
            </View>
        </View>
     
    </View>
  )
}

export default POHome

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
    flexDirection:'row',
    alignItems:'center',
  },
  menuText:{
    fontFamily:'Poppins-SemiBold',
    fontSize:17,
    color:'gray',
    top:2,
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    position:'absolute',
    zIndex:999999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerIcon:{
    position:'absolute',
    left:10,
    top:10,
  },
  drawerIcon2:{
    // position:'absolute',
    // left:10,
    // top:10,
    marginRight:5,
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

bluetoothSection:{
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
bluetoothContainer:{
  flex:0,
  flexDirection:'row', 
 
},
billText:{
  marginHorizontal:12,
  flex:1,
},
bluetoothText:{
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
noDeviceContainer:{
  flex:0,
  justifyContent:'flex-end',
  alignItems:'flex-end',
  right:10,
},
noDeviceText:{
  fontWeight:'500',
  color:'black',
  fontSize:15,
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
bluetoothViewButton:{
  backgroundColor:'rgba(180, 180, 180,0.5)',
  paddingHorizontal:16,
  paddingVertical:5,
  borderRadius:15,
  width:'40%',
  justifyContent:'center',
  alignItems:'center',
  marginTop:5,
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