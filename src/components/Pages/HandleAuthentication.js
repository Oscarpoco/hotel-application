import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ICONS
import { TfiEmail } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";

// REDUX
import { 
  handleOnSignIn, 
  handleOnSignUp, 
  showLoader 
} from "../../redux/actions/UserInterface";
import { 
  handleSignInWithGoogle, 
  handleSignInWithEmail, 
  handleSignUpWithEmail 
} from "../../redux/actions/Authentication";

// STYLE 
import '../Styling/HandleAuthentication.css'

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose} className="notification-close">×</button>
    </div>
  );
};

function HandleAuthentication({ handleOpenPrivacy }) {
  const dispatch = useDispatch();
  const isSignInOpen = useSelector((state) => state.userInterface.isSignInOpen);
  const isSignUpOpen = useSelector((state) => state.userInterface.isSignUpOpen);
  const error = useSelector((state) => state.authentication.error);
  const user = useSelector((state) => state.authentication.user);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (isAuthenticated) {
        showNotification("Successfully signed in!", "success");
        dispatch(handleOnSignIn(false));
    }
}, [isAuthenticated]);


  const handleClose = () => {
    dispatch(handleOnSignIn(false));
  };

  console.log('isAuthenticated:', isAuthenticated, 'user:', user);


//   GOOGLE
const handleGoogleSignIn = async () => {
    dispatch(showLoader(true));
    try {
        await dispatch(handleSignInWithGoogle());
        if (isAuthenticated) {
            showNotification("Successfully signed in with Google!", "success");
        }
    } catch (error) {
        showNotification(error, "error");
    } finally {
        dispatch(showLoader(false));
    }
};



//   EMAIL
const handleEmailSignIn = async (e) => {
    e.preventDefault();
    dispatch(showLoader(true));
    try {
        await dispatch(handleSignInWithEmail(email, password));
        if (isAuthenticated) {
            showNotification("Successfully signed in!", "success");
        }

        setEmail('');
        setPassword('')

    } catch (error) {
        showNotification(error, "error");
    } finally {
        dispatch(showLoader(false));
    }
};


  const handleOpenSignUp = () => {
    dispatch(handleOnSignUp(true));
  };


//   SIGN UP
  const handleSignUpWithEmailAndPassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }

    dispatch(showLoader(true));
    setTimeout(() => {
      dispatch(handleSignUpWithEmail(email, password))
        .then(() => {
            dispatch(handleSignInWithEmail(email, password))
            if (isAuthenticated){
                showNotification("Account created successfully!", "success");
            }

            setEmail('');
            setPassword('')

        })
        .catch(() => {
          showNotification(error.message, "error");
        })
        .finally(() => {
          dispatch(showLoader(false));
        });
    }, 500);
  };

  return (
    <>
      {isSignInOpen && (
        <div className="auth-overlay">
          <div className="auth-container">
            <div className="auth-header">
              <h2>{isSignUpOpen ? "Create Account" : "Sign In"}</h2>
              <button onClick={handleClose} className="close-button">
                ×
              </button>
            </div>

            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
              />
            )}

            <div className="auth-content">
              <form
                onSubmit={
                  isSignUpOpen
                    ? handleSignUpWithEmailAndPassword
                    : handleEmailSignIn
                }
                className="auth-form"
              >
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {isSignUpOpen && (
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                    />
                  </div>
                )}

                <button type="submit" className="auth-button primary">
                  <TfiEmail className="button-icon" />
                  {isSignUpOpen ? "Sign Up with Email" : "Sign In with Email"}
                </button>
              </form>

              <div className="divider">
                <span>or</span>
              </div>

              <div className="social-buttons">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="auth-button google"
                >
                  <FcGoogle className="button-icon" />
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={handleOpenSignUp}
                  className="auth-button switch-mode"
                >
                  <TfiEmail className="button-icon" />
                  {isSignUpOpen ? "Switch to Sign In" : "Switch to Sign Up"}
                </button>
              </div>

              <div className="auth-footer">
                <p className="terms">
                  By continuing, you agree to our{" "}
                  <button onClick={handleOpenPrivacy}>Terms & Conditions</button>{" "}
                  and{" "}
                  <button onClick={handleOpenPrivacy}>Privacy Policy</button>
                </p>
                <p className="copyright">
                  © 2024 resthotely.com™. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HandleAuthentication;