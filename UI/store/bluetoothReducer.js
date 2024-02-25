// store/bluetoothReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connectedDevice: null,
};

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    setConnectedDevice: (state, action) => {
      state.connectedDevice = action.payload;
    },
    clearConnectedDevice: state => {
      state.connectedDevice = null;
    },
  },
});

export const { setConnectedDevice, clearConnectedDevice } = bluetoothSlice.actions;
export const selectConnectedDevice = (state) => state.bluetooth.connectedDevice;
export default bluetoothSlice.reducer;
