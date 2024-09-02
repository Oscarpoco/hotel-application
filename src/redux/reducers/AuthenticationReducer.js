// src/redux/reducers/authenticationReducer.js

import { SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT, IS_SIGN_IN, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from '../actions/Authentication';

const initialState = {
    isSignInOpen: false,
    isAuthenticated: false,
    user: null,
    error: null
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {

        // OPEN SIGN IN FORM
        case IS_SIGN_IN:
            return {
                ...state,
                isSignInOpen: !state.isSignInOpen
            };

            // SIGN IN SUCCSSFULLY
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS: 
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };

            // SIGN IN ERRORS
        case SIGN_IN_ERROR:
        case SIGN_UP_ERROR: 
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };

            // SIGN OUT
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null
            };

            // DEFAULT
        default:
            return state;
    }
};

export default authenticationReducer;
