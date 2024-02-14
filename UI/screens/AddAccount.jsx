import React,{useState} from 'react';
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
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../assets/theme/index';
import { SelectList } from 'react-native-dropdown-select-list';
import { useForm, Controller } from 'react-hook-form'; // Import React Hook Form
import { useNavigation } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { createUser } from '../src/graphql/mutations';
import { signUp,getCurrentUser} from 'aws-amplify/auth';
const AddAccount = () => {
    const [rank, setRank] = useState('Select Role');
    const [role, setRole] = useState('Select Role');
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [idCardNumber, setIdCardNumber] = useState('');
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const { control, handleSubmit } = useForm(); 
  const client = generateClient();// Initialize React Hook Form
  const navigation=useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selected, setSelected] = React.useState('');
  const data = [
    {key:'1', value:'CASHIER'},
    {key:'2', value:'PURCHASER'},
    {key:'3', value:'WAREHOUSE_MANAGER'}
  ];
  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      if (response.uri) {
        setSelectedImage(response);
      }
    });
  };
  // useEffect(() => {
  //   const fetchLoggedInUserEmail = async () => {
  //     try {
  //       const user = await getCurrentUser();
  //       setLoggedInUserEmail(user.attributes.email);
  //       console.log("email",loggedInUserEmail);
  //     } catch (error) {
  //       console.error('Error fetching logged-in user email:', error);
  //     }
  //   };

  //   fetchLoggedInUserEmail();
  // }, []);

  const onSubmit = async () => {
    console.log("We Have entereed")
    try {
      // Sign up user with Cognito
    //   const userInput = {
    //     input: {
    //       username: name,// Add email if needed
    //       phonenumber,
    //       role,
    //       idCardNumber,
    //       // Add other user data here
    //     }
    //   };
      const user={
        email: "jon@example.com",
      };
      console.log("Email",user.email);
      const signUpResponse = await signUp({
        username:name,
        password,
      options: {
        userAttributes: {
          email:user.email,
        },
      }
      });
      console.log("Sign Up Successful")
      // Get Cognito user ID
    //   const cognitoUserId = signUpResponse.userSub;
      const cognitoUserId = signUpResponse.userId;
      console.log("cognito id",signUpResponse);
      // console.log("userBack",signUpResponse);

      console.log("Into User model");
      // Create user in the database using GraphQL mutation
      const userInput = {
        input: {
          userId:cognitoUserId,
          username:name,
          phonenumber:phonenumber,
          role:role,
          // Add other user data here
        }
      };
      console.log("User model about to be created",userInput.input);
      const createUserResponse = await client.graphql({
        query: createUser,
        variables: { input: userInput.input},
        authMode: 'apiKey',
       } );
       
      console.log('User created:', createUserResponse);
      
      // Navigate to success screen or perform any other action
      // navigation.navigate('SuccessScreen');
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error
    }
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
        <Text style={styles.name}>Add Account</Text>
        <Text style={styles.role}>Create New Account</Text>
      </View>

      {/* Lower View */}
      <View style={styles.lowerView}>
      <TouchableOpacity style={styles.profileImageContainer} onPress={()=>handleChoosePhoto()}>
      <Image
          source={require('../assets/images/profile1.png')}
          style={styles.profileImage}
        />
                        <Ionic style={styles.plusImage} size={38} color={'white'} name ='add-circle'/>
    </TouchableOpacity>
   
        <ScrollView style={styles.scrolledView}>
 
       
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
                    <Ionic size={30} color={COLORS.primary} name ='person-outline'/>
                </View>
                <View style={styles.inputContainer}>
                <TextInput
        style={styles.formInput}
        placeholder='Full Name'
        placeholderTextColor='rgba(170, 170, 170,4)'
        onChangeText={(text) => setName(text)} 
        value={name}// Update the name state
      />
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
                   <View>
                   {/* <Picker
                     selectedValue={rank}
                     onValueChange={setRank}
                     style={styles.picker}>
                     <Picker.Item label="Senior" value="Senior" />
                     <Picker.Item label="Junior" value="Junior" />
                     <Picker.Item label="Internee" value="Internee" />
                     <Picker.Item label="New Recruit" value="New Recruit" />
                   </Picker> */}
                       <SelectList 
        setSelected={(role) => setRole(role)} 
        data={data} 
        search={false} 
        renderRightIcon={{ size: 30 }}
        save="value"
        placeholder={role} // Set placeholder to the current role state
        boxStyles={{ borderWidth: 0, left: -16 }} 
        arrowicon={<Ionic style={{ position: 'absolute', right: -15, top: 14 }} size={26} color='rgba(180, 180, 180,4)' name='chevron-down-outline' />}
        inputStyles={{ fontSize: 18.5, top: 1, fontFamily: 'Poppins-Regular', color: 'rgba(140, 140, 140,4)' }}
        dropdownTextStyles={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: 'rgba(180, 180, 180,4)' }}
      />
                 </View>
                </View>
            </View>
        </View>
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
               <Ionic size={30} color={COLORS.primary} name ='call-outline'/>
                </View>
                <View style={styles.inputContainer}>
                <TextInput
        style={styles.formInput}
        placeholder='Contact Number'
        placeholderTextColor='rgba(170, 170, 170,4)'
        keyboardType='phone-pad' // Set keyboardType to phone-pad to show numeric keyboard
        onChangeText={(value) => setPhoneNumber(value)} // Update the phoneNumber state
        value={phonenumber} // Bind the value of the input to the phoneNumber state
      />
              </View>
        </View>
            
        </View>
        

                <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
               <Ionic size={30} color={COLORS.primary} name ='eye-outline'/>
                </View>
                <View style={styles.inputContainer}>
                <TextInput
        style={styles.formInput}
        placeholder='Password'
        placeholderTextColor='rgba(170, 170, 170,4)'
        secureTextEntry={true} // Set secureTextEntry to true to hide the password characters
        onChangeText={(value) => setPassword(value)} // Update the password state
        value={password} // Bind the value of the input to the password state
      />
              </View>
            </View>
        </View>
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
               <FontAwesome name="address-card" size={28} color={COLORS.primary} />
                </View>
                <View style={styles.inputContainer}>
                <TextInput
        style={styles.formInput}
        placeholder='ID Card Number'
        placeholderTextColor='rgba(170, 170, 170,4)'
        onChangeText={(value) => setIdCardNumber(value)} // Update the idCardNumber state
        value={idCardNumber} // Bind the value of the input to the idCardNumber state
      />
              </View>
            </View>
        </View>
        
        </ScrollView>
        </View>
          <View style={styles.saveWrapper}>
              <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
                  <Ionic size={18} color={COLORS.primary} name ='save-outline'/>
                  <Text style={styles.saveText}>Add Account</Text>
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
    top:60,
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
    // position:'absolute',
    // left:130,
    // top:-70,
    width: 130,
    height: 130,
  },
  profileImageContainer:{
    flex:1,
    position:'absolute',
    left:130,
    top:-70,
    justifyContent:'center',
    alignItems:'center',
},
plusImage:{
    position:"absolute",
    bottom:6,
    right:1,
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
    paddingVertical:15,
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
    flex:0,
    fontSize:18.5,
    top:6,
    right:10,
    fontFamily:'Poppins-Regular',
    justifyContent:'center',
    alignItems:'center',
    color:'rgba(140, 140, 140,4)',
    textAlign:'center',
    width:'100%',
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
  justifyContent:'center',
  alignItems:'center',
  justifyContent:'flex-end',
  alignItems:'flex-end',
  paddingVertical:15,
},
saveButton:{
  backgroundColor:COLORS.secondary,
  width:'50%',
  paddingVertical:10,
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
});

export default AddAccount;