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
import { signOut } from 'aws-amplify/auth';
import Profile from '../screens/Profile';
import Stats from '../screens/Stats';
import Product from '../screens/Product';
import Scan from '../screens/Scan';
import Scan2 from '../screens/Scan2';
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
import AddAccount from "../screens/AddAccount";
import BluetoothConnectivity from "../screens/BluetoothConnectivity";
import BluetoothConnectivity2 from "../screens/BluetoothConnectivity2";
import ConfirmSignUp2 from "../screens/ConfirmSignUp2";
import { useSelector } from "react-redux";
import PurchaseOrder from "../screens/PurchaseOrder";
import WMHome from "../screens/WMHome";
import GMHome from "../screens/GMHome";
import CashierHome from "../screens/CashierHome";
import POHome from "../screens/POHome";
import TopTabNavigator2 from "../screens/TopTabNavigator2";
import TopTabNavigator3 from "../screens/TopTabNavigator3";
import Categories from "../screens/Categories";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Loading from "../screens/Loading";
import ShowBill from "../screens/ShowBill";
import ScanPurchaseOrder from "../screens/ScanPurchaseOrder";
import ScanPurchaseOrder2 from "../screens/ScanPurchaseOrder2";
import WarehouseScanHistory from "../screens/WarehouseScanHistory";
const Drawer = createDrawerNavigator();

const AppNavigation = () => {
  const [user, setUser] = useState(undefined);
  const userRole = useSelector((state) => state.user.role);
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
      <View style={{flex:1,backgroundColor:'white',borderWidth:1,justifyContent:'center',paddingHorizontal:25}}>
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
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false }} >
        {user ? (
          <>
        {userRole === 'GENERAL_MANAGER' ? (
              <Drawer.Screen name="Home1" component={TopTabNavigator3} />
            ) : userRole === 'CASHIER' ? (
              <Drawer.Screen name="Home2" component={TopTabNavigator} />
            ) : userRole === 'WAREHOUSE_MANAGER' ? (
              <Drawer.Screen name="Home3" component={TopTabNavigator2} />
            ) :  userRole === 'PURCHASER' ?(
              <Drawer.Screen name="Home4" component={POHome} />
            ):(
              <Drawer.Screen name="Loading" component={Loading} />
            )}
 
            {/* <Drawer.Screen name="Home" component={TopTabNavigator} /> */}
           
            {/* <Drawer.Screen name="Home4" component={POHome} />
            <Drawer.Screen name="Home1" component={TopTabNavigator3} />
            <Drawer.Screen name="Home2" component={TopTabNavigator} />
            <Drawer.Screen name="Home3" component={TopTabNavigator2} /> */}
            <Drawer.Screen name="Bluetooth" component={BluetoothConnectivity} />
            <Drawer.Screen name="Bluetooth2" component={BluetoothConnectivity2} />
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
            <Drawer.Screen name="Scan2" component={Scan2} />
            <Drawer.Screen name="Upload" component={UploadPurchase} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="PurchaseHistory" component={PurchaseHistory} />
            <Drawer.Screen name="AddAccount" component={AddAccount} />
            <Drawer.Screen name="ConfirmSignUp2" component={ConfirmSignUp2} />
            <Drawer.Screen name="UploadPurchase" component={UploadPurchase} />
            <Drawer.Screen name="PurchaseOrder" component={PurchaseOrder} />
            <Drawer.Screen name="Categories" component={Categories} />
            <Drawer.Screen name="ShowBill" component={ShowBill} />
            <Drawer.Screen name="ScanPurchaseOrder" component={ScanPurchaseOrder} />
            <Drawer.Screen name="ScanPurchaseOrder2" component={ScanPurchaseOrder2} />
            <Drawer.Screen name="WarehouseScan" component={WarehouseScanHistory} />
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
