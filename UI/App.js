import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Appnavigation from './navigation/appnavigation';
import { Provider } from 'react-redux';
import { store } from './store'; 

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Appnavigation />
    </NavigationContainer>
    </Provider>
  );
}
