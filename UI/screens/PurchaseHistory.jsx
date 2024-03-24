import { StyleSheet, Text, View ,TouchableOpacity,ScrollView,Image, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native'; 
import { generateClient } from 'aws-amplify/api';
import { getPurchaseOrder, listPurchaseOrders } from '../src/graphql/queries.js';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


const PurchaseHistory = () => {
  const navigation=useNavigation();
  const client= generateClient();
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const  fetchAllPOs=async()=>{
    try{
    const {data}= await client.graphql({
      query:listPurchaseOrders,
      variables: {
        filter: {
          _deleted: {
            ne: true
          }
        }
      },
      authMode: 'apiKey',
    })
    console.log("DATA",data.listPurchaseOrders.items);
    setPurchaseOrders(data.listPurchaseOrders.items);
  } catch (error) {
    console.error('Error fetching bills:', error);
  }};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  
  useEffect(()=>{
    fetchAllPOs();
  },[])
  
  
  const handleRefresh = () => {
    fetchAllPOs();
  };

  return (
    <View  style={{flex:1,backgroundColor:'white'}}>
    {purchaseOrders.length === 0 ? ( <View style={{flex:1,backgroundColor:'white',borderWidth:1,justifyContent:'center',paddingHorizontal:25}}>
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
  ):(       
    <SafeAreaView style={styles.headContainer}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.arrowBackIcon}  onPress={()=> navigation.goBack()}>
              <Ionic size={22} color={COLORS.primary} name ='chevron-back-outline'/>
          </TouchableOpacity>
          <Text style={styles.settingsText}>Purchase History</Text>
      </View>
          <ScrollView style={styles.scrollviewContainer}>
            {purchaseOrders.map((po, index) => (
              <View key={index} style={styles.dateHistoryContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formatDate(po.createdAt)}</Text>
            </View>
              <View style={styles.billSection}>
                <View style={styles.billContainer}>
                  <Image style={styles.logoStyles} source={require("../assets/images/logo7.png")} />
                  <View style={styles.billText}>
                    <View style={styles.cashierName}>
                      <Text style={styles.cashierText}>Vendor: {po.vendor}</Text>
                      <Text style={styles.billTotal}>Rs. {po.totalAmount}</Text>
                    </View>
                    <View style={styles.billBottomText}>
                    <Text style={[styles.billTime, { color: po.status === 'PENDING' ? 'orange' : 'green' }]}>{po.status}</Text>
                      <TouchableOpacity style={styles.billViewButton} onPress={()=>navigation.navigate('PurchaseOrder',{purchaseOrderId:po.id,purchaseOrderAmount:po.totalAmount,purchaseOrderVendor:po.vendor,purchaseOrderVersion:po._version,purchaserName:po.purchaserName,purchaseStatus:po.status})} >
                        <Text style={styles.billViewText}>View</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            
          ))}
        
        </ScrollView>
       <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
   </SafeAreaView>) 
     }

   
  </View>
  )
}

export default PurchaseHistory

const styles = StyleSheet.create({
    headContainer:{ 
        flex:1,
        backgroundColor:'white',
    },
    header:{
       marginTop:25,
       marginBottom:20,
        flex:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        
    },
    settingsText:{
        fontSize:21,
        color:COLORS.primary,
        top:4,
        fontFamily:'Poppins-Regular'
    },
    arrowBackIcon:{
        position:'absolute',
        left:8
    },
    accountText:{
        fontSize:20,
        fontWeight:'900',
        color:COLORS.primary,
    },
    scrollviewContainer:{
      paddingHorizontal:12,
      marginTop:20,
      backgroundColor:'rgba(180, 180, 180,0.25)',
    },
    

  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0,0.2)',
  },
  noOrdersText: {
    fontSize: 20,
    fontFamily:'Poppins-Medium',
    color: COLORS.primary,
  },
    downloadContainer:{
        flex:0,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:14,
        backgroundColor:'white',
        marginVertical:15,
    },

    downloadButton:{
      flex:0,
      flexDirection:'row'
    },
    downloadText:{
      color:'rgb(73,204,148)',
      // fontWeight:'600',
      fontSize:14,
      marginRight:5,
      fontFamily:'Poppins-Medium',
    },
    dateHistoryContainer:{
    },
    dateContainer:{
      marginVertical:20,
      left:2,
    },
    dateText:{
      // fontWeight:'700',
      fontSize:13,
      color:COLORS.primary,
      fontFamily:'Poppins-SemiBold',
    },
    billSection:{
        paddingHorizontal:11,
        paddingVertical:20,
        backgroundColor:'white',
        borderWidth:0.3,
        borderColor:COLORS.primary,
    },
    billContainer:{
      flex:0,
      flexDirection:'row'
    },
    billText:{
      marginHorizontal:12,
      flex:1,
      
    },
    cashierName:{
      flex:0,
      flexDirection:'row',
      justifyContent:'space-between',
      top:2,
    },
    cashierText:{
      fontWeight:'500',
      color:'black',
      fontSize:13,
      fontFamily:'Poppins-Regular',
    },
    billTotal:{
      color:'hsl(0, 100%, 46%)',
      fontWeight:'700',
      fontSize:14.5,
      
    },
    billBottomText:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:25,
    },
    billTime:{
      color:'gray',
      fontWeight:'500',
      fontFamily:'Poppins-Regular',
      fontSize:12.5,
    },
    billViewButton:{
      backgroundColor:'rgba(180, 180, 180,0.5)',
      paddingHorizontal:18,
      paddingVertical:5,
      borderRadius:15,
    },
    billViewText:{
      fontWeight:'600',
      color:'black',
      fontSize:13,
    },
    logoStyles:{
      height:35,
      width:35,
    },
    refreshButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 10,
      alignItems: 'center',
    },
    refreshButtonText: {
      fontSize: 18,
      color: 'white',
      fontFamily: 'Poppins-Regular',
    },
    optionContainer:{
        paddingHorizontal:12,
        flex:0,
        flexDirection:'row',
        paddingVertical:8,
        backgroundColor:'rgba(180, 180, 180,0.124)',
    },
    optionText:{
        fontSize:19,
        fontWeight:'500',
        color:COLORS.primary,
        marginLeft:50
    },
   
 

  
})
