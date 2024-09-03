import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from '../reducers/RootReducer';
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig ={
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer, applyMiddleware(thunk));



// CREATING STORE FOR MY APPLICATION
const store = createStore(persistedReducer);
export const persistor = persistStore(store)

// EXPORTING MY STORE SO THAT IT IS AVAILABLE FOR USE
export default store;