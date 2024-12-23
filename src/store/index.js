import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import loadReducer from './slices/loadSlice';
import offerReducer from './slices/offerSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loads: loadReducer,
    offers: offerReducer,
    notifications: notificationReducer
  }
}); 