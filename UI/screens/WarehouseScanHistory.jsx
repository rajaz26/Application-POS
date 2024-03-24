import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { listUsers, listWarehouseScans } from '../src/graphql/queries.js';
import { SelectList } from 'react-native-dropdown-select-list';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const WarehouseScanHistory = () => {
  const [selected, setSelected] = useState('');
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const client = generateClient();

  useEffect(() => {
    fetchAllScans();
  }, []);

  const fetchAllScans = async () => {
    try {
      const { data } = await client.graphql({
        query: listWarehouseScans,
        variables: {
          filter: {
            _deleted: {
              ne: true
            }
          }
        },
        authMode: 'apiKey',
      });
      setUsers(data.listWarehouseScans.items);
      console.log(data.listWarehouseScans.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const navigation = useNavigation();
  const handleAddAccount = () => {
    navigation.navigate('AddAccount');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.arrowBack} onPress={() => navigation.goBack()}>
            <Ionic size={22} color='white' name='chevron-back-outline' />
          </TouchableOpacity>
          <Text style={styles.cashierHeading}>Warehouse Scans</Text>
        </View>
      </SafeAreaView>
      <View style={styles.listContainer}>
        {loading ? (
          <View style={{flex:1,backgroundColor:'white',justifyContent:'center',paddingHorizontal:25}}>
          <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item width={100} height={20} />
           <View style={{paddingVertical:20}}>
           <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" >
           <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
           <SkeletonPlaceholder.Item marginLeft={20}>
             <SkeletonPlaceholder.Item width={200} height={20} />
             <SkeletonPlaceholder.Item marginTop={6} width={200} height={20} />
           </SkeletonPlaceholder.Item>
         </SkeletonPlaceholder.Item>
           </View>      
       </SkeletonPlaceholder>
       <SkeletonPlaceholder borderRadius={4}>
       
           <View style={{paddingVertical:20}}>
           <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" >
           <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
           <SkeletonPlaceholder.Item marginLeft={20}>
             <SkeletonPlaceholder.Item width={200} height={20} />
             <SkeletonPlaceholder.Item marginTop={6} width={200} height={20} />
           </SkeletonPlaceholder.Item>
         </SkeletonPlaceholder.Item>
           </View>
        
         
       </SkeletonPlaceholder>
       <SkeletonPlaceholder borderRadius={4}>
       <SkeletonPlaceholder.Item width={100} height={20} marginTop={20}/>
           <View style={{paddingVertical:20}}>
           <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" >
           <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
           <SkeletonPlaceholder.Item marginLeft={20}>
             <SkeletonPlaceholder.Item width={200} height={20} />
             <SkeletonPlaceholder.Item marginTop={6} width={200} height={20} />
           </SkeletonPlaceholder.Item>
         </SkeletonPlaceholder.Item>
           </View>
        
         
       </SkeletonPlaceholder>
       <SkeletonPlaceholder borderRadius={4}>
       <SkeletonPlaceholder.Item width={100} height={20} marginTop={20}/>
           <View style={{paddingVertical:20}}>
           <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" >
           <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
           <SkeletonPlaceholder.Item marginLeft={20}>
             <SkeletonPlaceholder.Item width={200} height={20} />
             <SkeletonPlaceholder.Item marginTop={6} width={200} height={20} />
           </SkeletonPlaceholder.Item>
         </SkeletonPlaceholder.Item>
           </View>
        
         
       </SkeletonPlaceholder>
       <SkeletonPlaceholder borderRadius={4}>
       <SkeletonPlaceholder.Item width={100} height={20} marginTop={20}/>
           <View style={{paddingVertical:20}}>
           <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" >
           <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
           <SkeletonPlaceholder.Item marginLeft={20}>
             <SkeletonPlaceholder.Item width={200} height={20} />
             <SkeletonPlaceholder.Item marginTop={6} width={200} height={20} />
           </SkeletonPlaceholder.Item>
         </SkeletonPlaceholder.Item>
           </View>
        
         
       </SkeletonPlaceholder>
   
       </View>
        ) : (
          <ScrollView contentContainerStyle={{
            alignItems: 'center', 
            justifyContent: 'center', 
          }}>
            {users.map(user => (
                <TouchableOpacity key={user.id} style={styles.billContainer}>
                  {/* <Image style={styles.logoStyles} source={user.image ? { uri: user.image } : require("../assets/images/person.jpg")} /> */}
               
                  <View style={styles.billText}>
                
                    <View style={styles.intro}>
                        <Ionic size={26} color={COLORS.primary} name='checkmark-done-outline' style={{right:5}} />
                        
                        <View style={styles.cashierName}>
                            <Text style={styles.cashierText}>{user.productName}</Text>
                            <Text style={styles.billTime}>{user.scannedByName}</Text>
                        </View>
                    </View>
                    <View style={{borderWidth:0,right:10}}>
                    <Text style={styles.quantity}>{user.productQuantity}</Text>
                    </View>
                  
                  </View>
                </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {/* <TouchableOpacity style={styles.confirmButton} onPress={handleAddAccount}>
          <Text style={styles.confirmText}>Add Account</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.primary,
    },
    safeArea:{
        backgroundColor:COLORS.primary,
        // flex:1,
    },
    headerContainer:{
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:40,
        borderBottomLeftRadius:30,
    },
    cashierHeading:{
        color:'white',
        fontSize:20,
        fontFamily:'Poppins-Regular',
    },
    arrowBack:{
        position:'absolute',
        left:10,
        
    },
    scrollView:{
     borderWidth:2,
     flex:0,
    },
    listContainer:{
        flex:4.5,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        backgroundColor:'rgba(240, 240, 240,4)',
        paddingHorizontal:20,
    },
    selectedContainer:{
        flex:0,
        paddingVertical:20,
        width:'100%',
        marginTop:10,
        
    },
    billContainer:{
        flex:0,
        flexDirection:'row',
   borderWidth:1,
   borderColor:'lightgray',
        // marginVertical:15,
        marginTop:25,
        // marginHorizontal:25,
        paddingVertical:15,
        paddingHorizontal:10,
        width:'80%',
        backgroundColor:'white',
        elevation: 5, 
        shadowColor: 'black', 
        shadowOffset: {
            width:'100%',
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
        justifyContent:'space-around',
        bottom:1,
      },
      intro:{
        flexDirection:'row'
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
        top:4,
    
      },
        quantity:{
        color:'red',
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
       
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
        borderColor:COLORS.primary,
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
export default WarehouseScanHistory;