
import React from "react";
import { useDispatch } from "react-redux";
import { viewRoomDetails } from "../../redux/actions/UserInterface";
import '../Styling/RoomDetails.css';
import { CiSaveDown2 } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

function RoomDetails(){

    const dispatch = useDispatch();

    const HandleCloseRoomDetails = ()=>{
        dispatch(viewRoomDetails())
    }

    return(
        

        <div className="room-details-overlay">
            <div className="room-details-content">
                <div className="Gallery">
                    <div className="gallery-header">
                        <h1><IoIosArrowBack onClick={HandleCloseRoomDetails} className="return-icon" />Nice small bedroom in a Nice small house</h1>
                        <div className="room-details-buttons-box">
                            <button className="room-details-buttons">Save <CiSaveDown2 /></button>
                            <button className="room-details-buttons">Share <CiShare2 /></button>
                        </div>
                    </div>
                    <div className="gallery-grid">
                        <div className="room-picture">
                            <img src="Room.jpeg" alt="room"></img>
                        </div>

                        <div className="room-picture">
                            <img src="Room.jpeg" alt="room"></img>
                        </div>

                        <div className="room-picture">
                            <img src="Room.jpeg" alt="room"></img>
                        </div>

                        <div className="room-picture">
                            <img src="Room.jpeg" alt="room"></img>
                        </div>

                        <div className="room-picture">
                            <img src="Room.jpeg" alt="room"></img>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RoomDetails;