import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userInfo/userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import roomReducer from '../features/roomSlice/roomSlice'
const persistConfig = {
  key: 'root',
  storage,
}

const Hotelstore=combineReducers({
  
  User:userReducer,
  Room:roomReducer
})
const persistedReducer = persistReducer(persistConfig, Hotelstore)
export const store=configureStore({
    reducer:{
        Hotel:persistedReducer,
        middleware: [thunk]
    }
})
export const persistor = persistStore(store)