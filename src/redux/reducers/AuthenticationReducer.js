// src/redux/reducers/authenticationReducer.js

import { SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT, IS_SIGN_IN } from '../actions/Authentication';

const initialState = {
    isSignInOpen: false,
    isAuthenticated: false,
    user: null,
    error: null
};

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_SIGN_IN:
            return {
                ...state,
                isSignInOpen: !state.isSignInOpen
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null
            };
        default:
            return state;
    }
};

export default authenticationReducer;
