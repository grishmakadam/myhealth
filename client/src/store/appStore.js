import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { snackbarReducer } from "./snackbarSlice";
import { cartReducer } from "./cartSlice";
import { ordersReducer } from "./orderSlice";
import { userReducer } from "./userSlice";
import storage from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist:["user"]
};
  


const rootReducer = combineReducers({
  cart: cartReducer,
  snackbar: snackbarReducer,
  orders: ordersReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);



