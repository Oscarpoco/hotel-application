import React from "react";
import '../Styling/Rooms.css';
import { LiaMapSolid } from "react-icons/lia";

function Rooms(){

    return(
        <div className="rooms">

            {/* ROOM DETAILS*/}
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

            {/* FLOATING MAP BUTTON */}
            <div className="floating-map-button">
                <button className="map-button">Show Map <LiaMapSolid className= 'maps'/></button>
            </div>

        </div>
    )
}

export default Rooms;