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
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

// MUI
import { TextField, Button, Box, Grid, Typography } from '@mui/material';

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
  
      }
    };

    fetchUserDetails()
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
    
    try {
      dispatch(showLoader(true));
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
      window.location.reload();

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
    } finally{
      dispatch(showLoader(false));
      
    }

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


  // HANDLE VISIBILITY OF PROFILE DATAILS
  const handleOpenpersonalDetails = ()=>{

    dispatch(setPersonalDetailsVisibility())

  }
  
  const handleOpenpersonalBookings = ()=>{
    
    dispatch(setBookingsDetailsVisibility())

  }
  


  const handleOpenpersonalFavorites = ()=>{

    dispatch(setFavoriteDetailsVisibility())

  }

  // ENDS

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

        <div className="hearder-reveal" onClick={handleOpenpersonalDetails}>
          <h1>Personal Details</h1> 

          {personalDetailsVisibility ? <FaChevronUp className="viewDetails"/> : <FaChevronDown className="viewDetails"/>}

        </div>

        {personalDetailsVisibility && (
                      <Box className="user-details" p={3} sx={{ backgroundColor: '#fff', boxShadow: 3 }}>
                      {/* Header (optional, you can add content if needed) */}
                      <Box className="user-details-header" mb={2}>
                        <Typography variant="h6">Edit Profile</Typography>
                      </Box>
              
                      {/* Full Names */}
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Full names"
                            name="fullnames"
                            value={userDetails.fullnames}
                            onChange={handleInputChange}
                            placeholder="Enter Full Names"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
              
                        {/* Location */}
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={userDetails.location}
                            onChange={handleInputChange}
                            placeholder="Enter your city and country"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
              
                        {/* Age */}
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Age"
                            name="age"
                            value={userDetails.age}
                            onChange={handleInputChange}
                            placeholder="Enter your age (18+)"
                            inputProps={{ min: 18, max: 80 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
              
                        {/* Phone */}
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            type="tel"
                            label="Phone"
                            name="phone"
                            value={userDetails.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            inputProps={{ maxLength: 10 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
              
                        {/* Save Button */}
                        <Grid item xs={12}>
                          <Box mt={2} display="flex" justifyContent="center">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSave}
                              startIcon={<BiSave style={{color: 'white'}}/>}
                            >
                              Save
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
        )}

        
        {/* USER DETAILS ENDS */}

        {/* BOOKINGS */}
        <div className="hearder-reveal" onClick={handleOpenpersonalBookings}>
          <h1>Bookings list</h1>
          {bookingsDetailsVisibility ? <FaChevronUp className="viewDetails"/> : <FaChevronDown className="viewDetails"/>}
        </div>

          {bookingsDetailsVisibility && (<Bookings/>)}
        {/* ENDS */}

        {/* FAVORITE */}
        <div className="hearder-reveal" onClick={handleOpenpersonalFavorites}>
          <h1>Favorites Gallery</h1>
          {favoriteDetailsVisibility ? <FaChevronUp className="viewDetails"/> : <FaChevronDown className="viewDetails"/>}
        </div>

        <div className="my-favorites">
          {favoriteDetailsVisibility && (<Favorite />)}
        </div>
        {/* ENDS */}

      </div>
    </div>
  );
}

export default UpdateUserDetails;
