import React, {useState} from 'react';
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
const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Saif ur Rehman');
  const [age, setAge] = useState('25');
  const [role, setRole] = useState('Admin');
  const [cnic, setCnic] = useState('12345-6789012-3');
  const [contact, setContact] = useState('123-4567890');
  const [username, setUsername] = useState('saif123');
  const [joined, setJoined] = useState('18-10-2023');
  const [password, setPassword] = useState('password123');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [email, setEmail] = useState('saif@example.com');
  const [gender, setGender] = useState('Male');
  const [rank, setRank] = useState('Admin');
  const navigation=useNavigation();
  const [selected, setSelected] = React.useState("");
  const data = [
    {key:'1', value:'Admin'},
    {key:'2', value:'Cashier'},
]
  const toggleEdit = () => {
    if (editing) {
      // Save changes
      setEditing(false);
    } else {
      // Enable editing
      setEditing(true);
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
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
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
                    {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
                {editing ? (
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.formInput}
                    placeholderTextColor='rgba(170, 170, 170,4)'
                  />
                ) : (
                  <Text style={styles.formInput}>{name}</Text>
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
                            setSelected={(rank) => setSelected(rank)} 
                            data={data} search={false} 
                            renderRightIcon={{size:30,}}
                            save="value"
                            placeholder={rank}
                            boxStyles={{ borderWidth:0,left:-16}} 
                            arrowicon={ <Ionic style={{position:'absolute',right:-15,top:14}} size={26} color='rgba(180, 180, 180,4)' name ='chevron-down-outline'/>}
                            inputStyles={{fontSize:18.5,top:1,fontFamily:'Poppins-Regular',color:'rgba(140, 140, 140,4)'}}
                            dropdownTextStyles={{ fontFamily:'Poppins-Regular',fontSize:15,color:'rgba(180, 180, 180,4)' }}
                            />
                 </View>
                ) : (
                  <Text style={styles.formInput}>{role}</Text>
                )}
                </View>
            </View>
        </View>
        <View style={styles.formInputContainer}>
            <View style={styles.formInputWrapper}>
               <View style={styles.imageContainer}>
               <FontAwesome name="address-card" size={28} color={COLORS.primary} />
                </View>
                <View style={styles.inputContainer}>
                    {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
                {editing ? (
                  <TextInput
                    value={cnic}
                    onChangeText={setCnic}
                    style={styles.formInput}
                    placeholderTextColor='rgba(170, 170, 170,4)'
                  />
                ) : (
                  <Text style={styles.formInput}>{cnic}</Text>
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
                    {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
                {editing ? (
                  <TextInput
                    value={contact}
                    onChangeText={setContact}
                    style={styles.formInput}
                    placeholderTextColor='rgba(170, 170, 170,4)'
                  />
                ) : (
                  <Text style={styles.formInput}>{contact}</Text>
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
                    {/* <TextInput style={styles.formInput}  placeholder='Product ID'  placeholderTextColor='rgba(170, 170, 170,4)'/> */}
                {editing ? (
                  <TextInput
                    value={age}
                    onChangeText={setAge}
                    style={styles.formInput}
                    placeholderTextColor='rgba(170, 170, 170,4)'
                  />
                ) : (
                  <Text style={styles.formInput}>Since  {joined}</Text>
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
        </ScrollView>
        </View>
        {role === 'Admin' && (
          <View style={styles.saveWrapper}>
              <TouchableOpacity style={styles.saveButton} onPress={toggleEdit}>
                  <Ionic size={18} color={COLORS.primary} name ={editing ? 'save-outline' : 'brush-outline'}/>
                  <Text style={styles.saveText}>{editing ? 'Save' : 'Edit'}</Text>
              </TouchableOpacity>
          </View>
        )}
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
  paddingBottom:10,
  paddingTop:10,
  flex:0,
  justifyContent:'flex-end',
  alignItems:'flex-end'
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
});

export default Profile;