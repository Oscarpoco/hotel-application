// THIS REDUCER COMBINES ALL THE REDUCERS FROM OTHER COMPONENTS BEFORE ARE BEING SENT TO THE STORE

import { combineReducers } from 'redux';

// MY REDUCERS FROM OTHER COMPONENTS
import authenticationReducer from './AuthenticationReducer';
import userInterfaceReducer from './UserInterfaceReducer';
// ENDS

// COMBINED REDUCERS
const rootReducer = combineReducers({

  authentication: authenticationReducer,
  userInterface: userInterfaceReducer,

});
// ENDS

export default rootReducer;
