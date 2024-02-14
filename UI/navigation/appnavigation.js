import React, { useEffect, useState } from "react"; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
import Animated, { FadeIn, Easing, FadeInDown, FadeInUp } from 'react-native-reanimated';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import Navigator from '../screens/Navigator';
import StaffListScreen from '../screens/StaffListScreen';
import AddProduct from '../screens/AddProduct';
import ConfirmBill from '../screens/ConfirmBill';
import Receipt from '../screens/Receipt';
import ImageViewScreen from '../screens/ImageViewScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductsScreen from '../screens/ProductsScreen';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Stats from '../screens/Stats';
import Product from '../screens/Product';
import Scan from '../screens/Scan';
import CustomDrawer from '../components/Drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen2 from '../screens/HomeScreen2';
import { COLORS } from '../assets/theme/index.js';
import TopTabNavigator from '../screens/TopTabNavigator';
import UploadPurchase from '../screens/UploadPurchase';
import PurchaseHistory from '../screens/PurchaseHistory';
import Notifications from '../screens/Notifications';
import ConfirmSignUp from '../screens/ConfirmSignUp';
import { Hub } from '@aws-amplify/core';
import { getCurrentUser } from "aws-amplify/auth";
import {View, ActivityIndicator} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const Drawer = createDrawerNavigator();

const AppNavigation = () => {
  const [user, setUser] = useState(undefined);
    const checkUser = async () => {
      try {
        const authUser = await getCurrentUser({bypassCache: true});
        setUser(authUser);
        console.log('authUser',authUser);
      } catch (e) {
        setUser(null);
      }
    };
    useEffect(() => {
    checkUser();
}, []);
useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === 'signedIn' || data.payload.event === 'signedOut') {
        checkUser();
      }
      console.log("data payload",data.payload.event)
      console.log(checkUser());
    };

    Hub.listen('auth', listener);

  
    const authListenerCancel = Hub.listen('auth', (data) => {
      console.log('Listening for auth messages: ', data.payload.data);
    });
    
   
    authListenerCancel(); 
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AnimatedCircularProgress
  size={120}
  width={15}
  fill={100}
  prefill={0} 
  delay={0}
  easing={Easing.inOut(Easing.ease)} 
  tintColor={COLORS.primary}
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false }} >
        {user ? (
          <>
            <Drawer.Screen name="Home" component={TopTabNavigator} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="History" component={HistoryScreen} />
            <Drawer.Screen name="Navigator" component={Navigator} />
            <Drawer.Screen name="Staff" component={StaffListScreen} />
            <Drawer.Screen name="AddProduct" component={AddProduct} />
            <Drawer.Screen name= "ConfirmBill" component={ConfirmBill} />
            <Drawer.Screen name="Receipt" component={Receipt} />
            <Drawer.Screen name="ImageView" component={ImageViewScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
            <Drawer.Screen name="ProductsList" component={ProductsScreen} />
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Stats" component={Stats} />
            <Drawer.Screen name="Product" component={Product} />
            <Drawer.Screen name="Scan" component={Scan} />
            <Drawer.Screen name="Upload" component={UploadPurchase} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="PurchaseHistory" component={PurchaseHistory} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Welcome" component={WelcomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="SignUp" component={SignUpScreen} />
            <Drawer.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
