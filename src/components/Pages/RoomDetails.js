
import React from "react";
import { useDispatch } from "react-redux";
import { viewRoomDetails } from "../../redux/actions/UserInterface";
import '../Styling/RoomDetails.css';
import { CiSaveDown2 } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";

function RoomDetails(){

    const dispatch = useDispatch();

    const HandleCloseRoomDetails = ()=> {
        dispatch(viewRoomDetails())
    }

    return(
        

        <div className="room-details-overlay">

            <div className="room-details-content">
                <div className="Gallery">
                    
                    <div className="gallery-header">
                        <h2><IoIosArrowBack onClick={HandleCloseRoomDetails} className="return-icon" />Nice small bedroom in a Nice small house</h2>
                        <div className="room-details-buttons-box">
                            <button className="room-details-buttons">Save <CiSaveDown2 /></button>
                            <button className="room-details-buttons">Share <CiShare2 /></button>
                        </div>
                    </div>

                    {/* Picture */}
                    <div className="room-gallery">
                        <div className="room-gallery-details">
                            <div className="room-pictures">
                                <img src="Room.jpeg" alt="room"></img>
                            </div>
                        </div>

                        <div className="room-gallery-details">
                            <div className="room-pictures">
                                <img src="Room.jpeg" alt="room"></img>
                            </div>
                        </div>

                        <div className="room-gallery-details">
                            <div className="room-pictures">
                                <img src="Room.jpeg" alt="room"></img>
                            </div>
                        </div>
                    </div>
                    {/* ends */}

                    {/* Location */}
                    <div className="room-location">
                        <h3>Sandton, Johannesburg, South Africa</h3>
                        <p>1 small double bed , shared bathroom</p>
                    </div>
                    {/* ENDS */}

                    {/* ROOM CONTENT */}
                    <div className="room-full-content">

                        {/* LEFT */}
                        <div className="content-left">
                            <div className="rating-box">
                                <div className="box">
                                    <p>
                                        One of the most loved room
                                        <br></br>
                                        in Rest Hotely, According to
                                        <br></br>
                                        guests
                                    </p>
                                </div>
                                <div className="box">
                                    <p style={{textAlign: 'center'}}>6.89</p>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    </div>
                                </div>
                                <div className="box">
                                    <p>Reviews</p>
                                    <p>1200</p>
                                </div>
                            </div>
                        </div>
                        {/* ENDS */}
                        <div className="content-right"></div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default RoomDetails;