import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Appnavigation from './navigation/appnavigation';
import { Provider } from 'react-redux';
import { store } from './store'; 
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports.js';
Amplify.configure(awsconfig);
import {Authenticator} from '@aws-amplify/react-native';
import { View } from 'react-native';

export default function App() {
  return (
    //  <Provider store={store}>
    <Provider store={store}> 
        <Appnavigation />
        </Provider>
    /* // <NavigationContainer> */
    
    /* // </NavigationContainer> */
  // </Provider>
    // <View>
    //   <Authenticator>
    //     <Text>HOME</Text>
    //   </Authenticator>
    // </View>
  );
}
