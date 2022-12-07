import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { AuthSlice } from "./Auth/AuthSlice";
const authPersistConfig = {
  key: "Auth",
  storage,
  whitelist: ["authToken"],
};
export const rootReducer = combineReducers({
  Auth: persistReducer(authPersistConfig, AuthSlice.reducer),
});
