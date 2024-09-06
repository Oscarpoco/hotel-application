import React from "react";
import '../Styling/UpdateUserDetails.css';
import { useDispatch} from "react-redux";
import { openUpdate, showLoader } from "../../redux/actions/UserInterface";
import { handleOnSignOut } from "../../redux/actions/Authentication";

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { BiSave } from "react-icons/bi";


function UpdateUserDetails(){
    const dispatch = useDispatch();

    // HANDLE CLOSE UPDATE
    const handleCloseUpdate = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(openUpdate());
            dispatch(showLoader(false));
        }, 3000);
        
        }

    // LOGOUT
    const logout = ()=>{
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(openUpdate(false));
            dispatch(handleOnSignOut());
            dispatch(showLoader(false));
        }, 3000);
        
    }

    return(
        <div className="update-overlay">
            <div className="update-content">
                <div className="details-header">
                    <h2><IoIosArrowBack onClick={handleCloseUpdate} className="back-arrow"/>
                    My Account</h2>

                    <button className="logout" onClick={logout}>Logout</button>
                </div>

                <div className="user-details">
                    <div className="user-details-header">
                        <p>Personal details</p>
                    </div>
                    <div className="user-details-data">
                        {/* INPUTS */}
                        <div className="input-wrapper">
                            <label>First name:</label>
                            <div className="input-box">
                                <input type="text" placeholder="user details"></input>
                                <button><BiSave className="edit-icon"/></button>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <label>Phone</label>
                            <div className="input-box">
                                <input type="text" placeholder="user details"></input>
                                <button><BiSave className="edit-icon"/></button>
                            </div>
                        </div>
                    </div>

                    <div className="user-details-data">
                        <div className="input-wrapper">
                            <label>Username:</label>

                            <div className="input-box">
                                <input type="text" placeholder="user details"></input>
                                <button><BiSave className="edit-icon"/></button>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <label>Password:</label>
                            <div className="input-box">
                                <input type="text" placeholder="user details"></input>
                                <button><BiSave className="edit-icon"/></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bookings-details">
                    <div className="bookings-details-header">
                        <p>My bookings</p>
                    </div>
                    <div className="bookings-details-items">
                        <div className="bookings">
                            <p>Booking 1</p>
                            <ImCancelCircle className="delete-icon"/>
                        </div>
                        <div className="bookings">
                            <p>Booking 1</p>
                            <ImCancelCircle className="delete-icon"/>
                        </div>
                        <div className="bookings">
                            <p>Booking 1</p>
                            <ImCancelCircle className="delete-icon"/>
                        </div>
                        <div className="bookings">
                            <p>Booking 1</p>
                            <ImCancelCircle className="delete-icon"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UpdateUserDetails;