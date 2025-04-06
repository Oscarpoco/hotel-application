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
import '../Styling/HandleAuthentication.css';
import Notification from './Notification.js';

function HandleAuthentication({ handleOpenPrivacy }) {
  const dispatch = useDispatch();
  const isSignInOpen = useSelector((state) => state.userInterface.isSignInOpen);
  const isSignUpOpen = useSelector((state) => state.userInterface.isSignUpOpen);
  const error = useSelector((state) => state.authentication.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(null);

  // Real-time validation states
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Form touched states to show errors only after interaction
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  // Clear form when closing modal
  useEffect(() => {
    if (!isSignInOpen) {
      resetForm();
    }
  }, [isSignInOpen]);

  // Watch for global authentication errors
  useEffect(() => {
    if (error) {

      let errorMessage = "Authentication failed";

      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        errorMessage = "Incorrect email or password";
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email is already in use";
      } else if (error.message) {
        errorMessage = error.message;
      }

      showNotification(errorMessage, "error");
    }
  }, [error]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({
      email: "",
      password: "",
      confirmPassword: ""
    });
    setTouched({
      email: false,
      password: false,
      confirmPassword: false
    });
    setNotification(null);
  };

  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      visible: true
    });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleClose = () => {
    dispatch(handleOnSignIn(false));
    resetForm();
  };

  const handleGoogleSignIn = async () => {
    dispatch(showLoader(true));
    try {
      const result = await dispatch(handleSignInWithGoogle());
      // Only close if successful (no error thrown)
      if (!result.error) {
        handleClose();
      }
    } catch (error) {
      showNotification(error.message || "Google sign-in failed", "error");
    } finally {
      dispatch(showLoader(false));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });

    if (field === 'email') {
      setErrors({ ...errors, email: validateEmail(email) });
    } else if (field === 'password') {
      setErrors({ ...errors, password: validatePassword(password) });
    } else if (field === 'confirmPassword') {
      setErrors({ ...errors, confirmPassword: validateConfirmPassword(confirmPassword, password) });
    }
  };

  const handleChange = (field, value) => {
    if (field === 'email') {
      setEmail(value);
      if (touched.email) {
        setErrors({ ...errors, email: validateEmail(value) });
      }
    } else if (field === 'password') {
      setPassword(value);
      if (touched.password) {
        setErrors({ ...errors, password: validatePassword(value) });
      }
      // Also update confirmPassword validation if it's been touched
      if (touched.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: validateConfirmPassword(confirmPassword, value)
        }));
      }
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);
      if (touched.confirmPassword) {
        setErrors({ ...errors, confirmPassword: validateConfirmPassword(value, password) });
      }
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    // Validate before submission
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: ""
    });

    setTouched({
      email: true,
      password: true,
      confirmPassword: false
    });

    if (emailError || passwordError) {
      return;
    }

    dispatch(showLoader(true));
    try {
      const result = await dispatch(handleSignInWithEmail(email, password));
      // Only close the modal if authentication was successful
      if (!result.error) {
        resetForm();
        handleClose();
      } else {
        // Show Firebase error in the notification
        showNotification(result.error.message || "Incorrect email or password", "error");
        console.log('My Biggest Error', result.error.message)
      }
    } catch (error) {
      showNotification(error.message || "Sign-in failed", "error");
    } finally {
      dispatch(showLoader(false));
    }
  };

  const handleOpenSignUp = () => {
    resetForm();
    dispatch(handleOnSignUp(true));
  };

  const handleSignUpWithEmailAndPassword = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    setTouched({
      email: true,
      password: true,
      confirmPassword: true
    });

    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    dispatch(showLoader(true));
    try {
      const signupResult = await dispatch(handleSignUpWithEmail(email, password));

      // Check if signup was successful
      if (signupResult.error) {
        showNotification(signupResult.error.message || "Sign-up failed", "error");
      } else {
        // Try to sign in only if signup was successful
        const signinResult = await dispatch(handleSignInWithEmail(email, password));

        // Only close if both operations were successful
        if (!signinResult.error) {
          resetForm();
          handleClose();
          showNotification("Account created successfully!", "success");
        } else {
          showNotification("Account created, but sign-in failed: " +
            (signinResult.error.message || "Please try signing in manually"), "warning");
        }
      }
    } catch (error) {
      showNotification(error.message || "Sign-up failed", "error");
    } finally {
      dispatch(showLoader(false));
    }
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
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={touched.email && errors.email ? "input-error" : ""}
                    placeholder="Enter your email address"
                    required
                  />
                  {touched.email && errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={touched.password && errors.password ? "input-error" : ""}
                    placeholder="Enter your password"
                    required
                  />
                  {touched.password && errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                {isSignUpOpen && (
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      className={touched.confirmPassword && errors.confirmPassword ? "input-error" : ""}
                      placeholder="Re-enter your password"
                      required
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="error-message">{errors.confirmPassword}</div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-button primary"
                  disabled={isSignUpOpen ?
                    (errors.email || errors.password || errors.confirmPassword) :
                    (errors.email || errors.password)}
                >
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

              {notification && (
                <Notification
                  message={notification.message}
                  severity={notification.type}
                  onClose={() => setNotification(null)}
                  notificationArletVisible={true}
                />
              )}

              <div className="auth-footer">
                <p className="terms">
                  By continuing, you agree to our{" "}
                  <button type="button" onClick={handleOpenPrivacy}>Terms & Conditions</button>{" "}
                  and{" "}
                  <button type="button" onClick={handleOpenPrivacy}>Privacy Policy</button>
                </p>
                <p className="copyright">
                  © 2025 resthotely.com™. All rights reserved.
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