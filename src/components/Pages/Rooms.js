import React from "react";
import { useDispatch } from "react-redux";
import { viewRoomDetails, showLoader } from "../../redux/actions/UserInterface";
import '../Styling/Rooms.css';

function Rooms(){

    const dispatch = useDispatch();

    const HandleOpenRoomDetails = ()=>{
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewRoomDetails())
            dispatch(showLoader(false));
        }, 3000);
        
    }

    return(
        <div className="rooms">

            {/* ROOM DETAILS*/}
            <div className="room-details" onClick={HandleOpenRoomDetails}>
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>

            <div className="room-details">
                <div className="room-picture">
                    <img src="Room.jpeg" alt="room"></img>
                </div>
                <div className="room-content">
                    <p>Sandton, Johannesburg, South Africa</p>
                    <p><span>Available: Sep 1-7</span></p>
                    <p>R1500 ZAR <span>night</span></p>
                </div>
            </div>
            {/* ENDS */}

        </div>
    )
}

export default Rooms;