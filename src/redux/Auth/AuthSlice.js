import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: false,
};

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,

  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});
