// src/redux/reducers/authenticationReducer.js

import { SET_RESERVATION, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT, IS_SIGN_IN, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from '../actions/Authentication';

const initialState = {
    isSignInOpen: false,
    isAuthenticated: false,
    user: null,
    error: null,

    reservation: {
        checkIn: '',
        checkOut: '',
        guests: '',
        nights: 0,
        totalPrice: 0,
      },
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
                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload,
                    error: null,
                    isSignInOpen: false,
                };

            // SIGN IN ERRORS
        case SIGN_IN_ERROR:
        case SIGN_UP_ERROR: 
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                isSignInOpen: true,
            };

            // SIGN OUT
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null
            };

        // RESERVATION
        case SET_RESERVATION:
            return {
            ...state,
            reservation: action.payload,
        }

            // DEFAULT
        default:
            return state;
    }
};

export default authenticationReducer;
