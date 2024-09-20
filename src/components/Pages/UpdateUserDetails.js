import React, { useState, useEffect } from "react";
import "../Styling/UpdateUserDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { openUpdate, showLoader, setPersonalDetailsVisibility,setBookingsDetailsVisibility,setFavoriteDetailsVisibility } from "../../redux/actions/UserInterface";
import { handleOnSignOut } from "../../redux/actions/Authentication";

// FIRESTORE
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { BiSave } from "react-icons/bi";
import Bookings from "./Bookings";
import { Favorite } from "./Favorite";

function UpdateUserDetails() {
  const dispatch = useDispatch();

  // FIRESTORE
  const db = getFirestore();

  // REDUX
  const user = useSelector((state) => state.authentication.user);
  const userId = user.id || user.uid;
  const personalDetailsVisibility = useSelector((state) => state.userInterface.personalDetailsVisibility);
  const bookingsDetailsVisibility = useSelector((state) => state.userInterface.bookingsDetailsVisibility);
  const favoriteDetailsVisibility = useSelector((state) => state.userInterface.favoriteDetailsVisibility);


  // USESTATE
  const [userDetails, setUserDetails] = useState({
    fullnames: "",
    location: "",
    age: "",
    phone: "",
    userId: userId,
    status: "Active",
  });

  // FETCH PROFILE
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        dispatch(showLoader(true));
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUserDetails((prevState) => ({ ...prevState, ...userDoc.data() }));
          } else {
            console.log("No such user!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        dispatch(showLoader(false));
      }
    };

    fetchUserDetails();
  }, [userId, dispatch, db]);
  // ENDS

  // HANDLE CHANGE
  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  // ENDS

  // HANDLE SAVE
  const handleSave = async () => {
    dispatch(showLoader(true));
    try {
      await setDoc(
        doc(db, "users", userId),
        {
          fullnames: userDetails.fullnames,
          location: userDetails.location,
          age: userDetails.age,
          phone: userDetails.phone,
          userId: userDetails.userId,
          status: "Active",
        },
        { merge: true }
      ); 

      alert("Profile updated successfully!");

      // Clear input fields
      setUserDetails({
        fullnames: "",
        location: "",
        age: "",
        phone: "",
        userId: "",
        status: "",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
    dispatch(showLoader(false));
  };
  // ENDS

  // HANDLE CLOSE UPDATE
  const handleCloseUpdate = () => {
    dispatch(showLoader(true));

    setTimeout(() => {
      dispatch(openUpdate());
      window.location.reload();
      dispatch(showLoader(false));
    }, 3000);
  };

  // LOGOUT
  const logout = () => {
    dispatch(showLoader(true));

    setTimeout(() => {
      dispatch(openUpdate(false));
      dispatch(handleOnSignOut());
      window.location.reload();
      dispatch(showLoader(false));
    }, 3000);
  };

  const handleOpenpersonalDetails = ()=>{
    dispatch(setPersonalDetailsVisibility())
  }


  return (
    <div className="update-overlay">
      <div className="update-content">
        <div className="details-header">
          <h2>
            <IoIosArrowBack onClick={handleCloseUpdate} className="back-arrow" />
            My Account
          </h2>

          <button className="logout" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="" onClick={handleOpenpersonalDetails} style={{background: 'red', border: '2px solid', boxShadow: '0 0 10px', width: '100%'}}><h1>Personal Details</h1></div>
        {personalDetailsVisibility && (
                      <div className="user-details">
                      <div className="user-details-header">
                      </div>
                      <div className="user-details-data">
                        {/* FULL NAMES */}
                        <div className="input-wrapper">
                          <label>
                            Full names: <span> {userDetails.fullnames}</span>
                          </label>
                          <div className="input-box">
                            <input
                              type="text"
                              name="fullnames"
                              placeholder="Enter Full Names"
                              value={userDetails.fullnames}
                              onChange={handleInputChange}
                            ></input>
                          </div>
                        </div>
            
                        {/* LOCATION */}
                        <div className="input-wrapper">
                          <label>
                            Location: <span> {userDetails.location}</span>
                          </label>
                          <div className="input-box">
                            <input
                              type="text"
                              placeholder="Enter your city and country"
                              name="location"
                              value={userDetails.location}
                              onChange={handleInputChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                      {/* ENDS */}
            
                      <div className="user-details-data">
                        {/* AGE */}
                        <div className="input-wrapper">
                          <label>
                            Age: <span> {userDetails.age}</span>
                          </label>
            
                          <div className="input-box">
                            <input
                              type="number"
                              placeholder="Enter your age only over 17 years"
                              name="age"
                              value={userDetails.age}
                              onChange={handleInputChange}
                              min="18"
                              max="80"
                            ></input>
                          </div>
                        </div>
                        {/* ENDS */}
            
                      </div>
                      {/* ENDS */}
            
                      {/* WRAPPER */}
                      <div className="user-details-data">
                        {/* PHONE */}
                        <div className="input-wrapper">
                          <label>
                            Phone: <span> {userDetails.phone}</span>
                          </label>
            
                          <div className="input-box">
                            <input
                              type="number"
                              placeholder="Enter your phone number"
                              name="phone"
                              value={userDetails.phone}
                              onChange={handleInputChange}
                              minLength="10"
                              maxLength="10"
                            ></input>
                          </div>
                        </div>
                        {/* ENDS */}
            
                       
                      </div>
            
                      {/* WRAPPER */}
                      <div className="user-details-data">
                        {/* button */}
                        <div className="input-wrapper" style={{ background: "white", boxShadow: "unset" }}>
                          {/* SAVE BUTTON */}
                          <button onClick={handleSave}>
                            <BiSave className="save-icon" /> Save
                          </button>
                        </div>
                        {/* ENDS */}
            
                      </div>
                      {/* ENDS */}
                    </div>
        )}

        
        {/* USER DETAILS ENDS */}

        {/* BOOKINGS */}
        {/* <div className="bookings-details"> */}
          <Bookings />
        {/* </div> */}
        {/* ENDS */}

        {/* FAVORITE */}
        <div className="my-favorites">
          <Favorite />
        </div>
        {/* ENDS */}

      </div>
    </div>
  );
}

export default UpdateUserDetails;
