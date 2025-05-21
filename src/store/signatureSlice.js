import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signature: '', // base64 or image url
  signatureType: '', // draw, upload, type
};

const signatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    setSignature(state, action) {
      state.signature = action.payload.signature;
      state.signatureType = action.payload.signatureType;
    },
    clearSignature(state) {
      state.signature = '';
      state.signatureType = '';
    },
  },
});

export const { setSignature, clearSignature } = signatureSlice.actions;
export default signatureSlice.reducer;
