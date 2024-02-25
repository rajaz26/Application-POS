// store/index.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './useReducer';
import bluetoothReducer from './bluetoothReducer'; // Import the Bluetooth reducer

export const store = configureStore({
  reducer: {
    user: userReducer,
    bluetooth: bluetoothReducer, // Add the Bluetooth reducer
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
