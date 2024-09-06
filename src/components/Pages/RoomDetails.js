
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { viewRoomDetails, isRoomReserved, isRoomPaid, showLoader } from "../../redux/actions/UserInterface";
import '../Styling/RoomDetails.css';

// FIRESTORE
import {  getFirestore,collection, getDocs} from "firebase/firestore";

// ICONS
import { CiSaveDown2 } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";
import { FaKitchenSet } from "react-icons/fa6";
import { PiOfficeChairLight } from "react-icons/pi";
import { IoTvSharp } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { MdOutlineNightsStay } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

function RoomDetails(){

    const dispatch = useDispatch();
    const isReserved = useSelector((state)=> state.userInterface.isReserved)
    const isPaid = useSelector((state)=> state.userInterface.isPaid)

    const [accommodations, setAccommodations] = useState([]);

    const db = getFirestore();

    // FETCH ACCOMODATION
    useEffect(() => {
        fetchAccommodations();
    }, []);

    // Fetch data from Firestore
    const fetchAccommodations = async () => {
        try {
            const accommodationsCollection = collection(db, "accommodations");
            const accommodationsSnapshot = await getDocs(accommodationsCollection);
            const accommodationsList = accommodationsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setAccommodations(accommodationsList);
        } catch (error) {
            console.error("Error fetching accommodations:", error);
        }
    };


    // HANDLES CLOSING THE ROOM DETAILS PAGE
    const HandleCloseRoomDetails = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewRoomDetails());
            dispatch(showLoader(false));
        }, 3000);
        
    }

    // HANDLES RESERVATION AND CANCELLATION OF RESERVATION
    const HandleReservation = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(isRoomReserved());
            dispatch(showLoader(false));
        }, 3000);
        
    }

    // HANDLE PAYMENT
    const HandlePayment = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(isRoomPaid());
            dispatch(showLoader(false));
        }, 3000);
        
        }

    return(
        

        <div className="room-details-overlay">

            {/* SHOW THIS WHEN THE ROOM IS NOT RESERVED */}
            {!isReserved ? 

            <div className="room-details-content">

                {accommodations.map((accommodation) => (
                <div className="Gallery" key={accommodation.id}>
                    
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
                                <img src={accommodation.images[2]} alt="room"></img>
                            </div>
                        </div>

                        <div className="room-gallery-details">
                            <div className="room-pictures">
                                <img src={accommodation.images[1]} alt="room"></img>
                            </div>
                        </div>

                        <div className="room-gallery-details">
                            <div className="room-pictures">
                                <img src={accommodation.images[0]} alt="room"></img>
                            </div>
                        </div>
                    </div>
                    {/* ends */}

                    {/* Location */}
                    <div className="room-location">
                        <h3>{accommodation.location}</h3>
                        <p>{accommodation.numberOfRooms}</p>
                    </div>
                    {/* ENDS */}

                    {/* ROOM CONTENT */}
                    <div className="room-full-content">

                        {/* LEFT */}
                        <div className="content-left">
                            <div className="rating-box">
                                <div className="box">
                                    <p>
                                        Ratings
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
                                    <p>
                                        {accommodation.description}
                                    </p>
                                </div>
                                <h2><strong>What this place offers</strong></h2>
                                <div className='offers'>
                                    <div className="offered-items-left">
                                        <p ><FaKitchenSet className="offer-icon"/> {accommodation.amenties}</p>
                                        <p> <PiOfficeChairLight className="offer-icon"/> {accommodation.amenties}</p>
                                        <p><IoTvSharp className="offer-icon"/> {accommodation.amenties}</p>
                                        <p><RiFridgeFill className="offer-icon"/> {accommodation.amenties}</p>
                                        <p><MdOutlineNightsStay className="offer-icon"/> {accommodation.amenties}</p>
                                    </div>
                                    <div className="offered-items-left">
                                        <p ><FaKitchenSet className="offer-icon"/> kitchen</p>
                                        <p> <PiOfficeChairLight className="offer-icon"/> Dedicated work workspace</p>
                                        <p><IoTvSharp className="offer-icon"/> TV with standard cable</p>
                                        <p><RiFridgeFill className="offer-icon"/> Refrigirator</p>
                                        <p><MdOutlineNightsStay className="offer-icon"/> Long term stays allowed</p>
                                    </div>
                                </div>
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
                                <button type="submit" onClick={HandleReservation} className="confirm-button"><strong>Reserve</strong></button>
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

                        </div>
                        {/* RIGHT CONTAINER ENDS */}
                    </div>

                </div>
                ))}

            </div>
            : 
            
            
            
            // IF ROOM IS RESERVED SHOW THIS
            
            <div className="room-details-content">

               <div className="payment-wrapper">

                {/* PAYMENT HEADER */}
                    <div className="payment-header"><h2><IoIosArrowBack onClick={HandleReservation} className="return-icon" />Request to book</h2></div>

                    {/* LEFT AND RIGHT CONTAIN WRAPPER */}
                    <div className="left-right-contain-wrapper">

                    {/*LEFT CONTAINER PAYMENT */}
                        <div className="room-details-left-container-payment">
                            <p>Payment Details</p>

                            <div className="payment-gateway">
                                <input type="text" placeholder="Credit or debit card"></input>
                            </div>

                            <div className="payment-gateway-card">
                                <div className="payment-top"> 
                                    <input type="text" placeholder="Card number"></input>
                                </div>
                                <div className="payment-bottom">
                                    <div className="card-detail">
                                        <input type="text" placeholder="Expiration"></input>
                                    </div>
                                    <div className="card-detail">
                                        <input type="text" placeholder="CVV"></input>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-gateway-zip-code">
                        
                                <input type="text" placeholder="ZIP CODE"></input>
                            </div>
                            <div className="payment-gateway-country">
                                <input type="text" placeholder="Country"></input> 
                            </div>
                        </div>
                    {/* PAMENT ENDS */}

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
                                <button type="submit"  onClick={HandleReservation} className="cancel-button"><strong>Cancel</strong></button>
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
                        </div>
                
                    </div>
                    {/* RIGHT CONTAINER ENDS */}

                    {/* CONFIRM BUTTON */}
                    <div className="confirm-button-box">
                        <button type="submit" className="confirm-button" onClick={HandlePayment}><strong>Confirm payment</strong></button>
                    </div>
                    {/* ENDS */}

                </div>
                
            </div>
            
            }

            {/* CONFIRMATION NOTIFICATION */}
            {isPaid && (
                <div className="confirmation-notification-layout">
                    <div className="confirmation-notification">
                        <p>Payment successful!</p>
                        <div><GiCheckMark className= "tick"/></div>
                        <button className="confirm-button" onClick={HandlePayment}>Complete</button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default RoomDetails;