import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,// you can add more slices later
  },
});

export default store;