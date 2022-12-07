import { reduxBatch } from "@manaflair/redux-batch";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore(persistedReducer, middleware,  devTools: process.env.NODE_ENV !== 'production',enhancers: [reduxBatch]);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    [
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true,
      }),
      sagaMiddleware,
    ].concat(logger),

  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch],
});

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store);
// sagaMiddleware.run(rootSaga)
export default store;
