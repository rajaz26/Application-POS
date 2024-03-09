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
const GMHome = () => {
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

const isFocused = useIsFocused();

useEffect(() => {
  if (isFocused) {
    fetchAllBills();
  }
}, [isFocused]);
  const [bills, setBills] = useState([]);
  const [latestBill, setLatestBill] = useState(null);
  // const userRole = useSelector((state) => state.user.role); 
  const fetchAllBills = async () => {
    try {
      const { data } = await client.graphql({
        query: listBills,
        variables: {
          filter: {
            _deleted: {
              ne: true
            }
          }
        },
        authMode: 'apiKey'
      });
  
      const { items } = data.listBills;
      const billsWithDetails = await Promise.all(items.map(async (bill) => {
        // Fetch items for each bill
        const billItems = await fetchBillItems(bill.id);
  
        // Initialize cashier details with default values
        let cashierDetails = { cashierUsername: 'Unknown', cashierRole: 'Unknown' };
  
        // Fetch cashier details for each bill, if cashier ID is present
        if (bill.cashier) {
          const cashierData = await fetchUserByUserId(bill.cashier);
          if (cashierData) {
            cashierDetails = {
              cashierUsername: cashierData.username || 'Unknown',
              cashierRole: cashierData.role || 'Unknown'
            };
          }
        }
  
        // Combine bill details with cashier information and items
        return { ...bill, items: billItems, ...cashierDetails };
      }));
  
      setBills(billsWithDetails);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };
  const fetchBillItems = async (billId) => {
    // console.log("fetching items for bill:", billId);
    try {
      const { data } = await client.graphql({
        query: listBillItems,
        variables: {
          filter: {
            billItemsId: {
              eq: billId
            }
          }
        },
        authMode: 'apiKey'
      });
  
      // console.log("data:", data); // Log the entire data response for inspection
  
      if (data && data.listBillItems && data.listBillItems.items) {
        return data.listBillItems.items;
      } else {
        console.log("No items found for bill:", billId);
        return [];
      }
    } catch (error) {
      console.error('Error fetching bill items for bill:', error);
      return [];
    }
  };

  const fetchUserByUserId = async (userId) => {
    const { data } = await client.graphql({
      query: userById,
      variables: {
        userId: userId,
        filter: {
          _deleted: {
            ne: true
          }
        }
      },
      authMode: 'apiKey'
    });
  
    // Assuming the first item is the desired user since userId should be unique
    return data.userById.items.length > 0 ? data.userById.items[0] : null;
  };
  const findLatestUpdatedBill = (bills) => {
    let latestBill = null;
    let latestUpdatedAt = 0;
  
    bills.forEach((bill) => {
      const updatedAt = new Date(bill.updatedAt).getTime();
      if (updatedAt > latestUpdatedAt) {
        latestUpdatedAt = updatedAt;
        latestBill = bill;
      }
    });
    // console.log("@#@#@#"+latestBill.id)
    return latestBill;
  };  
  useEffect(() => {
    fetchAllBills();
  }, []);
  useEffect(() => {
    if (bills.length > 0) {
      const latestBill = findLatestUpdatedBill(bills);
      setLatestBill(latestBill);
    }
  }, [bills]);
  
  // useEffect(() => {
  //   bills.forEach((bill, index) => {
  //     console.log("Bill ", index + 1);
  //     console.log("ID: ", bill.id);
  //     console.log("Cashier Username: ", bill.cashierUsername); // Updated to include cashier's username
  //     console.log("Cashier Role: ", bill.cashierRole); // Updated to include cashier's role
  //     console.log("Total Amount: ", bill.totalAmount);
  //     console.log("Status: ", bill.status);
  //     console.log("Created At: ", bill.createdAt);
  //     console.log("Updated At: ", bill.updatedAt);
  //     console.log("_Version: ", bill._version);
  //     console.log("_Deleted: ", bill._deleted);
  //     console.log("_Last Changed At: ", bill._lastChangedAt);
  //     console.log("Store Bills ID: ", bill.storeBillsId);
  //     console.log("Items:");
  
  //     if (bill.items && Array.isArray(bill.items)) {
  //       bill.items.forEach(item => {
  //         console.log("    Quantity: ", item.quantity);
  //         console.log("    Product Price: ", item.productPrice);
  //         // Add other item details as needed
  //       });
  //     } else {
  //       console.log("No items found for this bill.");
  //     }
  //     console.log("\n"); // Added for better separation between bills
  //   });
  // }, [bills]);
  
  
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
           <SafeAreaView style={styles.safeArea}>
                  <View style={styles.sliderWrapper}>
                      <SalesLineChart bills={bills}/>
                  </View>
                  <TouchableOpacity style={styles.drawerIcon} onPress={openDrawer}>
                     <Ionic name="menu-outline" size={26} color='white' style={styles.drawerIcon} />
                  </TouchableOpacity>  
            </SafeAreaView>
            <View style={[
          styles.body,
       
        ]}>
               <View style={[
          styles.bodyWrapper,
        ]}> 
                <View style={styles.menuContainer}>
                  <Text style={styles.menuText}>Menu</Text>
                </View>
                <View style={styles.iconWrapper}>    
                <View style={styles.icons}>
                  <TouchableOpacity style={styles.iconContainer} onPress={()=> navigation.navigate('Staff')}>  
                 <Ionic name="person" size={25} color={COLORS.primary} style={styles.homeIcon} />
                 <Text style={styles.iconText}>Staff List</Text>
               </TouchableOpacity>
              
     <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('PurchaseHistory') }>
                    {/* <Ionic name="archive" size={25} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>History</Text> */}
                     <Ionic name="archive" size={25} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>POs List</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconContainer} onPress={()=> navigation.navigate('Bluetooth')}>
                  {/* //<TouchableOpacity style={styles.iconContainer} onPress={createNewProduct}> */}
                    {/* <Ionic name="settings" size={25} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>Settings</Text> */}
                    <Ionic name="bluetooth" size={25} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>Bluetooth</Text>
                  </TouchableOpacity>
                
                </View>
                <View style={[styles.icons,styles.lastIcons]}>
        
            
              <TouchableOpacity
                style={styles.iconContainer}
                
              >
                <Ionic name="stats-chart" size={28} color={COLORS.primary} />
                <Text style={styles.iconText}>Stats</Text>
              </TouchableOpacity>
           
            
                  <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductsList', {
                    productsObj: productsObj,
                  })
                }>
                 {/* <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Bluetooth')
                }> */}
                    <Ionic name="list" size={28} color={COLORS.primary} style={styles.homeIcon} />
                    <Text style={styles.iconText}>Products</Text>
                  </TouchableOpacity>
                  
              {userRole === 'CASHIER' ? (
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
                onPress={() => navigation.navigate('Bluetooth')}
              >
                <Ionic name="notifications" size={28} color={COLORS.primary} />
                <Text style={styles.iconText}>Notification</Text>
              </TouchableOpacity>
            )} 
        
                </View>
                </View>
                <View style={styles.previousContainer}>
                    <Text style={styles.previousText}>Last Bill Generated</Text>
                  </View>
                  
                  {latestBill ? (
  <View style={styles.billSection}>
    <View style={styles.billContainer}>
      <Image style={styles.logoStyles} source={require("../assets/images/logo7.png")} />
      <View style={styles.billText}>
        <View style={styles.cashierName}>
          <Text style={styles.cashierText}>
            {latestBill.cashierUsername}
          </Text>
          <Text style={styles.billTotal}>
            Rs. {latestBill.totalAmount}
          </Text>
        </View>
        <View style={styles.billBottomText}>
          <Text style={styles.billTime}>
            {latestBill && latestBill.updatedAt ? new Date(latestBill.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) : ''}
          </Text>
          <TouchableOpacity style={styles.billViewButton} onPress={() => navigation.navigate('Receipt')}>
            <Text style={styles.billViewText}>
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
) : (
  <View style={styles.billSection}>
    <View style={styles.noDeviceContainer}>
      <Text style={styles.noDeviceText}>Fetching the last bill</Text>
      <Text style={styles.noDeviceText}>. . . . . . . . . . . . . .</Text>
    </View>
  </View>
)}
</View>
</View>

        </View>
     
    </View>
  )
}

export default GMHome

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