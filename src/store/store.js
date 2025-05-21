import { configureStore } from '@reduxjs/toolkit';
import signatureReducer from './signatureSlice';

const store = configureStore({
  reducer: {
    signature: signatureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
