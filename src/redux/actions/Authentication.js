// src/redux/actions/authentication.js

import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Import auth from firebase.js

const provider = new GoogleAuthProvider();

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';
export const IS_SIGN_IN = 'IS_SIGN_IN';

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

// Toggle Sign-In State
export const handleOnSignIn = () => ({
    type: IS_SIGN_IN
});
