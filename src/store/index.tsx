import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// const res = await axios
//   .post('http://authentication-nodejs.default.127.0.0.1.sslip.io/auth/login', {
//    name: 'TEST',
//   username: 'TEST',

//   })
//   .catch((err) => console.log(err));
// const data = await res.data;

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      // console.log(data);
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
