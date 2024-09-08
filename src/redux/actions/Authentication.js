// src/redux/actions/authentication.js

import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
const provider = new GoogleAuthProvider();

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';
export const IS_SIGN_IN = 'IS_SIGN_IN';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';  
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';  

// RESERVATION DATA
export const SET_RESERVATION = 'SET_RESERVATION';


// ACTIONS CREATOR

// Google Sign-In
export const handleSignInWithGoogle = () => async (dispatch) => {
    try {
        const result = await signInWithPopup(auth, provider);
        dispatch({ type: SIGN_IN_SUCCESS, payload: result.user });
    } catch (error) {
        dispatch({ type: SIGN_IN_ERROR, payload: error.message });
    }
};

// Email Sign-In
export const handleSignInWithEmail = (email, password) => async (dispatch) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: SIGN_IN_SUCCESS, payload: userCredential.user });
    } catch (error) {
        dispatch({ type: SIGN_IN_ERROR, payload: error.message });
    }
};

// Email Sign-Up
export const handleSignUpWithEmail = (email, password, location, fullnames) => async (dispatch) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, location, fullnames);
        dispatch({ type: SIGN_UP_SUCCESS, payload: userCredential.user }); 
    } catch (error) {
        dispatch({ type: SIGN_UP_ERROR, payload: error.message }); 
    }
};

// Toggle Sign-In State
export const handleOnSignIn = () => ({
    type: IS_SIGN_IN
});

// logout
export const handleOnSignOut = () => ({
    type: SIGN_OUT,
});


// RESERVATION DATA


export const setReservation = (reservationData) => ({
  type: SET_RESERVATION,
  payload: reservationData,
});