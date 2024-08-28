import React from "react";
import { useSelector } from "react-redux";
import '../Styling/HandleAuthentication.css';

function HandleAuthentication(){

    const isSignInOpen = useSelector((state) => state.userInterface.isSignInOpen)

    return(
        <>
            {isSignInOpen && (
                <div className="handle-authentication-overlay">
                    <div className="handle-authentication">
                        <div className="signup-signin">

                            <label><p>Sign in or create an account</p></label>
                            <form>
                                
                                <input type="text" placeholder="email"></input>
                               
                                <button>Continue with Email</button>
                                <button>Continue with google</button>
                                <button>Continue with phone</button>
                                <button>Continue with Email</button>
                               

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default HandleAuthentication;