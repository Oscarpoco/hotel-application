

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../Styling/HandleAuthentication.css';
import { handleOnSignIn, handleOnSignUp, showLoader } from "../../redux/actions/UserInterface";
import { handleSignInWithGoogle, handleSignInWithEmail, handleSignUpWithEmail  } from "../../redux/actions/Authentication";
import { TfiEmail } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";

function HandleAuthentication() {
    const isSignInOpen = useSelector((state) => state.userInterface.isSignInOpen);
    const isSignUpOpen = useSelector((state) => state.userInterface.isSignUpOpen);
    
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Handle close
    const handleClose = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(handleOnSignIn(false));
            dispatch(showLoader(false));
        }, 3000);
        
    }

    // Handle Google sign-in
    const handleGoogleSignIn = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(handleSignInWithGoogle());
            dispatch(handleOnSignIn(false));
            dispatch(showLoader(false));
        }, 3000);
        
    }

    // Handle email sign-in
    const handleEmailSignIn = (e) => {
        e.preventDefault();
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(handleSignInWithEmail(email, password));
            dispatch(handleOnSignIn(false));
            dispatch(showLoader(false));
        }, 3000);
        
    }

    // handle open sign up
    const handleOpenSignUp = () => {
        dispatch(showLoader(true));
        setTimeout (()=> {
            dispatch(handleOnSignUp());
            dispatch(showLoader(false));
        }, 3000);
        
    }


    // handle sign up with email
    const handleSignUpWithEmailAndPassword =(e) =>{
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!"); 
            return;
        }

        dispatch(showLoader(true));
        setTimeout (()=> {
            dispatch(handleSignUpWithEmail(email, password));
            dispatch(handleOnSignIn(false));
            dispatch(showLoader(false));
            }, 3000);
    }

    return (
        <>
            {isSignInOpen && (
                <div className="handle-authentication-overlay">
                    <div className="handle-authentication">
                        <div className="signup-signin">
                            <label><p>Sign in or create an account</p></label>
                            <button onClick={handleClose} className="close">+</button>
                            <div className="form">
                                {/* SIGN IN GROUP */}
                                <div className="signIn-group">

                                {/* SIGN UP AND IN FORM */}
                                   {isSignUpOpen ? (
                                   
                                //    SIGN UP FORM
                                   <form className="signIn-group-child" onSubmit={handleSignUpWithEmailAndPassword}>

                                        <label>Email address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                        />

                                        <label>Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                        />

                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Re-enter your password"
                                        />

                                        <button type="submit" className="signIn-form-button" style={{background: '#1877F2'}}>
                                        <TfiEmail className="form-icons"/> Continue with Email
                                        </button>
                                    </form>
                                    // SIGN UP ENDS
                                   ):(
                                    // SIGN IN FORM
                                     <form className="signIn-group-child" onSubmit={handleEmailSignIn}>
                                        <label>Email address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                        />

                                        <label>Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                        />

                                        <button type="submit" className="signIn-form-button" style={{background: '#1877F2'}}>
                                        <TfiEmail className="form-icons"/> Continue with Email
                                    </button>
                                </form>
                                    // ENDS
                                    )}
                                    

                                    

                        
                                    <div className="signIn-group-p-tag">
                                        <p>or</p>
                                    </div>
                                </div>
                               
                                <div className="group">
                                <button type="button" className="signIn-form-button" onClick={handleGoogleSignIn} style={{background: '#1DA1F2'}}>
                                    <FcGoogle className="form-icons"/> Continue with Google
                                </button>

                                <button type="button" className="signIn-form-button" onClick={handleOpenSignUp} style={{background: '#0077B5'}}>
                                <TfiEmail className="form-icons"/>Sign Up / In with email
                                </button>
                                </div>
                                 {/* ENDS */}

                                {/* FORM FOOTER */}
                                <div className="form-footer">
                                    <p>
                                        By creating an account, you agree with our 
                                        <span>Terms & conditions</span> and <span>Privacy</span>
                                    </p>

                                    <div className="footer-rights">
                                        All right reserved.
                                        <br />
                                        Copyright [2024] - resthotely.com&trade;
                                    </div>
                                </div>
                                {/* ENDS */}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default HandleAuthentication;
