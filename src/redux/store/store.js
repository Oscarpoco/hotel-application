import { applyMiddleware, createStore } from "redux";
import {thunk} from "redux-thunk";  
import rootReducer from '../reducers/RootReducer';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with middleware applied
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk) 
);

export const persistor = persistStore(store);

// Export the store for use
export default store;
