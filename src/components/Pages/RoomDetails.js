
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
                                        in Rest Hotely, According to guests
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

                            {/* ABOUT SECTION */}
                            <div className="about-section">
                                <div className="about-section-content">
                                    <h2><strong>About this place</strong></h2>
                                    <p>Double room available in an immaculate 2 bed tenement flat 
                                        in Dennistoun. Comfy double bed with storage in room.

                                        <br></br>
                                        <br></br>
                                        Situated 1.5 miles from the city centre with good transport 
                                        links into city 5/10 minutes walk to Duke St or Bellgrove 
                                        train station which take you into queen street in 5 minutes! 
                                        There are also plenty local buses.
                                        <br></br>
                                        <br></br>                                        Great local amenities shops, bars and restaurants also close 
                                        by on Duke Street and Alexandra Parade. Shared livingroom 
                                        bathroom and kitchen.</p>
                                </div>
                                <h2><strong>What this place offers</strong></h2>
                                <div className='offers'></div>
                            </div>
                        </div>
                        {/* ENDS */}

                        {/* RIGHT CONTAINER */}
                        <div className="content-right">

                            {/* ALL CONTENT */}
                            <div className="reservation">
                                {/* HEADER TEXTS */}
                                <p 
                                style={{textAlign: 'start', width: '100%', fontWeight: 'bold'}}
                                >R1,402 ZAR <span>night</span></p>
                                {/* HEADER TEXTS ENDS */}

                                <div className="check">
                                    {/* TOP */}
                                    <div className="check-top">

                                        {/* CHECK-IN */}
                                        <div className="check-in">
                                            <p>Check in</p>
                                            <input type="date" placeholder="Add date"></input>
                                        </div>
                                        {/* CHECK IN ENDS */}

                                        {/* CHECK OUT */}
                                        <div className="check-out">
                                            <p>Check in</p>
                                            <input type="date" placeholder="Add date"></input>
                                        </div>
                                        {/* CHECK OUT ENDS */}

                                    </div>
                                    {/* ENDS */}

                                    {/* BOTTOM */}
                                    <div className="check-bottom">
                                        <p>Guests</p>
                                    </div>
                                    {/* BOTTOM ENDS */}
                                </div>

                                {/* BUTTON */}
                                <button>Reserve</button>
                                {/* BUTTON ENDS */}

                                {/* CHECK CONTENT */}
                                <div className="check-content">

                                    {/* TOP */}
                                    <div className="check-content-top">
                                        {/* LEFT */}
                                        <div className="check-content-top-left">
                                            <p>R1,402 ZAR * 11 nights</p>
                                            <p>Weekly stay discout</p>
                                            <p>Service fee</p>
                                        </div>
                                        {/* LEFT ENDS */}

                                        {/* RIGHT */}
                                        <div className="check-content-top-right">
                                            <p>R15,421 ZAR</p>
                                            <p>-R3,084 ZAR</p>
                                            <p>R2,371 ZAR</p>
                                        </div>
                                        {/* RIGHT ENDS */}
                                    </div>
                                    {/* TOP ENDS */}

                                    {/* BOTTOM */}
                                    <div className="check-content-bottom">
                                        <p>Total</p>
                                        <p>R14,942 ZAR</p>
                                    </div>
                                    {/* BOTTOM ENDS */}
                                </div>
                                {/* CHECK CONTENT ENDS */}
                            </div>

                            {/* RESERVATION LOCATION */}
                            <div className="reservation-location">
                                <p>Sandton, Johannesburg, SA</p>
                            </div>
                        </div>
                        {/* RIGHT CONTAINER ENDS */}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default RoomDetails;