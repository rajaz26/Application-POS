// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  username: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { userId, username, role } = action.payload;
      state.userId = userId;
      state.username = username;
      state.role = role;
    },
    clearUserDetails: (state) => {
      state.userId = '';
      state.username = '';
      state.role = '';
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
