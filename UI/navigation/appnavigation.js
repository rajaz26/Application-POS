import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/WelcomeScreen';
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
import TopTabNavigator from '../screens/TopTabNavigator';
import UploadPurchase from '../screens/UploadPurchase';
import PurchaseHistory from '../screens/PurchaseHistory';
import Notifications from '../screens/Notifications';

const Drawer = createDrawerNavigator();

const appnavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props=> <CustomDrawer{...props}/>} screenOptions={{headerShown: false}} initialRouteName="Welcome">
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
      <Drawer.Screen name="Login" component={LoginScreen}/>
      <Drawer.Screen name="SignUp" component={SignUpScreen} />
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
      <Drawer.Screen name="Home" component={TopTabNavigator} />
    </Drawer.Navigator>
  );
};

export default appnavigation;
