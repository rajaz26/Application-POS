import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert,View, Image, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import Animated, { FadeIn, Easing, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { signIn } from 'aws-amplify/auth';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import config from '../src/aws-exports.js';
// Amplify.configure(config);
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';
import { signOut } from 'aws-amplify/auth';

const LoginScreen = () => {
  const navigation=useNavigation();
  const { handleSubmit, control, formState: { errors }, reset } = useForm(); 
  const [loading, setLoading] = useState(null);

const handleSignOut = async () => {
  console.log('signed out')
  try {
    await signOut();
    console.log('signed out')
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
  const onSubmit = async (data) => {
    Keyboard.dismiss();
    if(loading){
      return;
    }
    setLoading(true);
    console.log('Data:', data);
    const username='RajaZain'
    console.log('username:', username);
    try {
      console.log('Data:', data);
      const username=data.username
      const password=data.password
      const user = await signIn({
          username,password
      });
      console.log('Login success', user);
      reset();
      console.log(data);
      navigation.navigate('Home', { screen: 'Dashboard' });
    } catch (error) {
      console.error('Login error has occurred', error);
      Alert.alert('Login Error', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && (
      <View style={styles.loadingContainer}>
      <AnimatedCircularProgress
  size={120}
  width={15}
  fill={100}
  prefill={0} 
  duration={1800} 
  delay={0}
  easing={Easing.inOut(Easing.ease)} 
  tintColor={COLORS.secondary}
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
    <Text style={styles.loadingText}>Logging In</Text>
    </View>
     )}
      <SafeAreaView style={{ flex: 1, marginTop: 10 , zIndex:-1}}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity style={styles.arrowLeftContainer} onPress={() => navigation.goBack()}>
            <Ionic size={24} style={{ right: 5 }} color={COLORS.primary} name="chevron-back-outline" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.imageStyle} source={require('../assets/images/login.png')} />
        </View>
      </SafeAreaView>
      <Animated.View style={styles.formContainer} entering={FadeInDown.duration(1000).springify()}>
        <View style={styles.form}>
          <Text style={styles.formText}>Username</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextInput style={styles.formInput} onChangeText={field.onChange} value={field.value} />}
            name="username"
            defaultValue=""
          />
          {errors.username && <Text style={{ color: 'red' }}>This field is required</Text>}

          <Text style={styles.formText}>Password</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextInput style={[styles.formInput, styles.passwordInput]} onChangeText={field.onChange} value={field.value} secureTextEntry />}
            name="password"
            defaultValue=""
          />
          {errors.password && <Text style={{ color: 'red' }}>This field is required</Text>}
        </View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.loginText}>{loading ? 'Loading':'Login'}</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.orContainer}>
          <Text style={styles.orText}>Or</Text>
        </View>
        <View style={styles.logosContainer}>
          <TouchableOpacity style={styles.socialIcons}>
            <Image style={styles.icon} source={require('../assets/icons/google.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcons}>
            <Image style={styles.icon} source={require('../assets/icons/apple.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcons}>
            <Image style={styles.icon} source={require('../assets/icons/facebook.png')} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.noAccountContainer}>
          <Text style={{ color: 'black', fontFamily: 'Poppins-Regular', fontSize: 13 }}>
            Don't have an account?
          </Text>
          <View>
  </View>
          {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp')}> */}
          <TouchableOpacity onPress={handleSignOut}> 
            <Text
              style={{
                color: '#ffc200',
                marginLeft: 5,
                fontWeight: '500',
                fontFamily: 'Poppins-Medium',
                fontSize: 13,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onClick={handleSignOut}> <Text
              style={{
                color: '#ffc200',
                marginLeft: 5,
                fontWeight: '500',
                fontFamily: 'Poppins-Medium',
                fontSize: 13,
              }}
            >
              Sign Out
            </Text></TouchableOpacity> */}
        </View>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: '#044244',
    zIndex:-1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    position:'absolute',
    zIndex:999999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText:{
    color:'white',
    fontSize:24,
    fontFamily:'Poppins-Regular',
    top:15,
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15,
  },
  arrowLeftContainer: {
    padding: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFD700',
  },
  imageStyle: {
    height: 160,
    width: 160,
    top:10,
  },
  formContainer: {
    flex: 1.5,
    backgroundColor: 'white',
    padding: 8,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    zIndex:-1,
  },
  form: {
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  formText: {
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 13.5,
  },
  formInput: {
    height: 45,
    backgroundColor: 'rgba(180, 180, 180,0.4)',
    borderRadius: 10,
    marginBottom: 22,
    paddingLeft: 10,
    bottom: 3,
    color: 'black',
  },
  passwordInput: {
    marginBottom: 15,
  },
  loginButtonContainer: {
    flex: 0,
    alignItems: 'center',
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    backgroundColor: '#FFD700',
    width: '85%',
    marginHorizontal: 20,
    borderRadius: 13,
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    top: 2,
    color: '#044244',
  },
  orContainer: {
    flex: 0,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  orText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  logosContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 14,
  },
  socialIcons: {
    padding: 6,
    backgroundColor: 'rgba(180, 180, 180,0.3)',
    borderRadius: 10,
  },
  icon: {
    height: 36,
    width: 36,
  },
  noAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20,
  },
});
