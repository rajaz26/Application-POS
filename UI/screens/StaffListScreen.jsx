import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity,Image} from 'react-native'
import React, { useState, useEffect } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native'; 
import { generateClient } from 'aws-amplify/api';
import { listUsers } from '../src/graphql/queries.js';
import { SelectList } from 'react-native-dropdown-select-list';
const StaffListScreen = () => {
    const data = [
        {key:'1', value:'CASHIER'},
        {key:'2', value:'PURCHASER'},
        {key:'3', value:'WAREHOUSE_MANAGER'},
        {key:'4', value:''}
      ];
    const [selected, setSelected] = React.useState('');
    const [value, setValue] = React.useState('');
    const [users, setUsers] = useState([]);

    const client = generateClient();
    useEffect(() => {
        if (value === '1') {
            setSelected('CASHIER');
        } else if (value === '2') {
            setSelected('PURCHASER');
        } else if (value === '3') {
            setSelected('WAREHOUSE_MANAGER');
        } else if (value === '4') {
            setSelected('');
        }
    }, [value]);
    const fetchAllUsers = async () => {
        try {
            const { data } = await client.graphql({
                query: listUsers,
                variables: {
                filter: {
                    _deleted: {
                        ne: true
                    }
                }
            },
                authMode: 'apiKey',
            });
            // console.log("Fetched users:", data.listUsers.items);
            setUsers(data.listUsers.items);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
        console.log("Set ",selected );
    }, []);

 const navigation=useNavigation();
 const handleAddAccount = () => {
    navigation.navigate('AddAccount');
};

return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.arrowBack} onPress={() => navigation.goBack()}>
                    <Ionic size={25} color='white' name='chevron-back-outline'/>
                </TouchableOpacity>
                <Text style={styles.cashierHeading}>Staff List</Text>
            </View>
        </SafeAreaView>
        <View style={styles.listContainer}>
            <View style={styles.selectedContainer}>
                <SelectList 
                    setSelected={setSelected} 
                    data={[
                        {key:'1', value:'CASHIER'},
                        {key:'2', value:'PURCHASER'},
                        {key:'3', value:'WAREHOUSE_MANAGER'},
                        {key:'4', value:''}
                    ]}
                    search={false}
                    onSelect={() => setValue(selected)} 
                    placeholder="Select Role"
                    boxStyles={{borderWidth:2}} 
                    arrowicon={<Ionic style={{position:'absolute',right:10,top:14}} size={26} color='rgba(180, 180, 180,4)' name='chevron-down-outline'/>}
                    inputStyles={{fontSize:18.5,top:1,fontFamily:'Poppins-Regular',color:'rgba(140, 140, 140,4)'}}
                    dropdownTextStyles={{color:'rgba(140, 140, 140,4)'}}
                />
            </View>
            <ScrollView>
  {users.map(user => (
    // Check if no role is selected or if the selected role matches the user's role
    !selected || selected === user.role ? (
      <View key={user.id} style={styles.billContainer}>
        <Image style={styles.logoStyles} source={user.image ? {uri: user.image} : require("../assets/images/person.jpg")}/>
        <View style={styles.billText}>
          <View style={styles.intro}>
            <View style={styles.cashierName}>
              <Text style={styles.cashierText}>{user.username}</Text>
              <Text style={styles.billTime}>Joined: {new Date(user.createdAt).toLocaleDateString()}</Text>
            </View>
          </View>
          <View>
            <View style={styles.billBottomText}>
              <TouchableOpacity style={styles.billViewButton} onPress={() => navigation.navigate('Profile', {userId: user.userId})}>
                <Ionic size={26} color={COLORS.primary} name='chevron-forward-outline'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    ) : null
  ))}
</ScrollView>



            <TouchableOpacity style={styles.confirmButton} onPress={handleAddAccount}>
                <Text style={styles.confirmText}>Add Account</Text>
            </TouchableOpacity>
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
        justifyContent:'center',
        // alignItems:'center',
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
       
        // marginVertical:15,
        marginTop:25,
        // marginHorizontal:25,
        paddingVertical:25,
        paddingHorizontal:10,
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
export default StaffListScreen;