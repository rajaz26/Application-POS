import React, {useState, useEffect} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../assets/theme/index';
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native'; 
import {generateClient} from 'aws-amplify/api';
import {getUser} from '../src/graphql/queries';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import { deleteUser, updateUser } from '../src/graphql/mutations';

const Profile = ({route}) => {
  
  const navigation = useNavigation();
  const client = generateClient();
  const defaultIdCardImage = require('../assets/images/profile.png');
  const [password, setPassword] = useState('password123');
  const [editing, setEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [user, setUser] = useState({
    id:'',
    username: '',
    role: '',
    phonenumber: '',
    joined: '',
    idcardimage: [],
    _version:'',
  });
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

  const roles = [
    {key: '1', value: 'CASHIER'},
    {key: '2', value: 'PURCHASER'},
    {key: '3', value: 'WAREHOUSE_MANAGER'},
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
      //   // Default to an ID from the route params; if not present, use the current user's ID
      let id = route?.params?.userId;
      console.log("id1",id);
      //   const effectiveUserId = await getCurrentUserId();
      //   console.log("************");
      //   console.log("effectiveid",effectiveUserId);
      //   console.log("id from routes",route?.params?.userId);
      //   console.log("id from function",await getCurrentUserId());
      //   console.log("************");
      //   const { data } = await client.graphql({
      //     query: userByIdQuery,
      //     variables: { userId: id },
      //     authMode: 'apiKey',
      // });
      //   if (response.data.getUser) {
      //     setUser({
      //       ...response.data.getUser,
      //       joined: new Date(response.data.getUser.createdAt).toLocaleDateString(),
      //     });
      //   }
      if(!id){
        id = await fetchUserAttributes();
        id=id.sub;
      }
      //  id = await fetchUserAttributes();
   
      if(!id){
        id = await getCurrentUser();
        id=id.sub;
      }
      // id=id.sub;
      console.log("id",id);
      const { data } = await client.graphql({
        query: userByIdQuery,
        variables: { userId: id },
        authMode: 'apiKey',
    });
    const userItems=data.userById.items;
    console.log("dATA",userItems);
    if (userItems && userItems.length > 0) {
      const userData = userItems[0];
      setUser({
        id:userData.id,
        username: userData.username,
        role: userData.role,
        phonenumber: userData.phonenumber,
        joined: new Date(userData.createdAt).toLocaleDateString(), 
        idcardimage: userData.idcardimage || [],
        _version:userData._version,
      });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
    fetchUserData();
  }, [route?.params?.userId]);

  async function getCurrentUserId() {
    let id = await fetchUserAttributes();
   
    if(!id){
      id = await getCurrentUser();
    }
    id=id.sub;
    console.log("id",id);
    const { data } = await client.graphql({
      query: userByIdQuery,
      variables: { userId: id },
      authMode: 'apiKey',
  });
  console.log(data);
  }
  useEffect(() => {
    if (selectedRole) {
      setUser((prevState) => ({...prevState, role: selectedRole}));
    }
  }, [selectedRole]);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        handleInputChange('idcardimage', [source.uri]);
      }
    });
  };

  const toggleEdit = () => {
    if (editing) {
      // When switching from editing to viewing mode, attempt to update the user
      handleUpdateUser();
    } else {
      // Simply allow editing
      setEditing(true);
    }
  };
  
  const handleUpdateUser = async () => {
    // Prepare the userInput object with the current state
    const userInput = {
      id: user.id,
      username: user.username,
      phonenumber: user.phonenumber,
      role: user.role,
      _version:user._version,
      // other fields you need to update
    };
    console.log("userInput",userInput);
    // API call to update user with the userInput object
    try {
      const response = await client.graphql({
        query: updateUser,
        variables: { input: userInput },
        authMode: 'apiKey',
      });
  
      // handle success
      console.log('User updated:', response.data.updateUser);
      setUser((prevState) => ({
        ...prevState,
        ...response.data.updateUser,
      }));
      alert('Profile updated successfully!');
      setEditing(false); // Turn off edit mode
    } catch (error) {
      // handle error
      console.error('Error updating user:', error);
      alert('Failed to update profile.');
    }
  };
  
  const handleDeleteUser = async () => {
    console.log("delete received id : ",user.id)
    const deleteUserInput = {
      
      id: user.id, // Assuming the user's ID is stored in the component's state
      // include the _version if your API is configured with DynamoDB versioning
      _version: user._version,
    };
  
    try {
      const response = await client.graphql({
        query: deleteUser,
        variables: { input: deleteUserInput },
        authMode: 'apiKey',
      });
  
      console.log('User deleted:', response.data.deleteUser);
      alert('Profile deleted successfully!');
      // Navigate back or to another screen after deletion
      navigation.navigate('Staff'); // Adjust according to your navigation setup
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete profile.');
    }
  };
  
  const handleInputChange = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Upper View */}
      <View style={styles.upperView}>
        {/* <Image
          source={require('../assets/images/profile.png')}
          style={styles.profileImage}
        /> */}
        <TouchableOpacity style={styles.arrowBackIcon}  onPress={()=> navigation.goBack()}>
            <Ionic size={24} color='white' name ='chevron-back-outline'/>
        </TouchableOpacity>
        <Text style={styles.name}>{user.username}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>

      {/* Lower View */}
      <View style={styles.lowerView}>
      <Image
          source={require('../assets/images/profile.png')}
          style={styles.profileImage}
        />
        <ScrollView style={styles.scrolledView}>
 
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
                    <Ionic size={30} color={COLORS.primary} name ='person-outline'/>
                </View>
                <View style={styles.inputContainer}>
                {editing ? (
                 <TextInput
                 value={user.username}
                 onChangeText={(text) => handleInputChange('username', text)}
                 style={styles.formInput}
                 placeholder="Username"
                 editable={editing} // Make sure this is correctly controlled based on your state
               />
               
                ) : (
            <Text style={styles.formInput}>{user.username}</Text>

                )}
                </View>
            </View>
        </View>
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
                    <Ionic size={30} color={COLORS.primary} name ='bag-remove-outline'/>
                </View>
                <View style={styles.inputContainer}>
                    {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
                    {editing ? (
  <SelectList
  setSelected={setSelectedRole} // Use setSelectedRole to directly update the role in your state.
  data={roles}
  search={false}
  save="value" // This will save the 'value' field of your selected item to the state.
  placeholder={user.role || "Select Role"}
  boxStyles={{ borderWidth: 0, left: -16 }}
  arrowicon={<Ionic style={{ position: 'absolute', right: -15, top: 14 }} size={26} color='rgba(180, 180, 180,4)' name='chevron-down-outline'/>}
  inputStyles={{ fontSize: 14.5, top: 1, fontFamily: 'Poppins-Regular', color: 'rgba(140, 140, 140,4)' }}
  dropdownTextStyles={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'rgba(180, 180, 180,4)' }}
/>

) : (
  <Text style={styles.formInputRole}>{user.role}</Text>
)}

                </View>
            </View>
        </View>
       
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
                    <Ionic size={30} color={COLORS.primary} name ='call-outline'/>
                </View>
                <View style={styles.inputContainer}>
                {editing ? (
                 <TextInput
                 value={user.phonenumber}
                 onChangeText={(text) => handleInputChange('phonenumber', text)}
                 style={styles.formInput}
                 placeholder="Phonenumber"
                 editable={editing} // Make sure this is correctly controlled based on your state
               />
               
                ) : (
            <Text style={styles.formInput}>{user.phonenumber}</Text>

                )}
                </View>
            </View>
        </View>
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
                    <Ionic size={30} color={COLORS.primary} name ='laptop-outline'/>
                </View>
                <View style={styles.inputContainer}>
                {editing ? (
                 <TextInput
                 value={user.joined}
                 onChangeText={(text) => handleInputChange('joined', text)}
                 style={styles.formInput}
                 placeholder="Joined"
                 editable={editing} // Make sure this is correctly controlled based on your state
               />
               
                ) : (
            <Text style={styles.formInput}>{user.joined}</Text>

                )}
                </View>
            </View>
        </View>
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
                    <Ionic size={30} color={COLORS.primary} name ='eye-outline'/>
                </View>
                <View style={styles.inputContainer}>
                    {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
                {editing ? (
                   <TextInput
                   value={password}
                   onChangeText={setPassword}
                   secureTextEntry
                   style={styles.input}
                 />
                ) : (
                  <Text style={styles.formInput}>{password}</Text>
                )}
                </View>
            </View>
            
        </View>
        <View style={styles.formInputContainer}>
  <View style={styles.formInputWrapper}>
    <View style={styles.imageContainer}>
      <FontAwesome name="address-card" size={28} color={COLORS.primary} />
    </View>
    <TouchableOpacity onPress={editing ? selectImage : undefined} style={styles.idCardImageContainer}>
      {user.idcardimage && user.idcardimage.length > 0 ? (
        <Image source={{ uri: user.idcardimage[0] }} style={styles.idCardImage} />
      ) : (
        <Image source={defaultIdCardImage} style={styles.idCardImage} />
      )}
    </TouchableOpacity>
  </View>
</View>

        
        </ScrollView>
        </View>
      
          <View style={styles.saveWrapper}>
              <TouchableOpacity style={styles.saveButton} onPress={toggleEdit}>
                  <Ionic size={18} color={COLORS.primary} name ={editing ? 'save-outline' : 'brush-outline'}/>
                  <Text style={styles.saveText}>{editing ? 'Save' : 'Edit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUser}>
                  <Ionic size={18} color='white' name ={'trash-outline'}/>
                  <Text style={styles.deleteText}>{'Delete'}</Text>
              </TouchableOpacity>
          </View>
      
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
    
  },
  upperView: {
    flex:1.3,
    // height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderBottomEndRadius:50,
    borderBottomStartRadius:50,
    overflow: 'hidden', 
  },
  arrowBackIcon:{
    position:'absolute',
    top:50,
    left:8
},
  lowerView: {
    flex: 2.5,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 65,
  },
  profileImage: {
    zIndex:1,
    position:'absolute',
    left:130,
    top:-70,
    width: 125,
    height: 125,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 25,
    color: 'white',
    fontFamily:'Poppins-Regular',
    bottom:20,
  },
  role: {
    fontSize: 14,
    color: COLORS.secondary,
    bottom:24,
    
  },
  scrolledView:{
    top:-15,
    // borderWidth:2,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  field: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: COLORS.primary,
  },
  value: {
    fontSize: 14,
    color: 'darkgray',
  },
  input: {
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 30,
    color: 'black',
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
  dropdownIndicator: {
    fontSize: 16,
    color: COLORS.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
  width:'100%',
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
formInputRole:{
  flex:0,
  fontSize:17.5,
  top:1,
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
},
saveWrapper:{
  flex:0,
paddingVertical:5,
flexDirection:'row',
justifyContent:'space-around',
alignItems:'center'
},
saveButton:{
  backgroundColor:COLORS.secondary,
  width:100,
  paddingVertical:5,
  borderRadius:30,
  marginRight:10,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
},
saveText:{
  fontFamily:'Poppins-Regular',
  fontSize:17,
  top:2,
  marginLeft:5,
  color:COLORS.primary,
  textAlign:'center',

},

deleteButton:{
  backgroundColor:'red',
  width:100,
  paddingVertical:5,
  borderRadius:30,
  marginRight:10,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
},
deleteText:{
  fontFamily:'Poppins-Regular',
  fontSize:17,
  top:2,
  marginLeft:5,
  color:'white',
  textAlign:'center',

},
idCardImageContainer: {
  flex:1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10, 
},
idCardImage: {
  width: 100, // Set your desired width
  height: 50, // Set your desired height
  resizeMode: 'cover', // Adjust as needed
},
});

export default Profile;