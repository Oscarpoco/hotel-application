import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from '../reducers/RootReducer';

// CREATING STORE FOR MY APPLICATION
const store = createStore(rootReducer, applyMiddleware(thunk));

// EXPORTING MY STORE SO THAT IT IS AVAILABLE FOR USE
export default store;