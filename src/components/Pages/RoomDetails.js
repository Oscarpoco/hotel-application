
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { viewRoomDetails, isRoomReserved, isRoomPaid, showLoader } from "../../redux/actions/UserInterface";
import '../Styling/RoomDetails.css';

// FIRESTORE
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

// ICONS
import { CiSaveDown2 } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
// import { IoStarOutline } from "react-icons/io5";
import { FaKitchenSet } from "react-icons/fa6";
import { PiOfficeChairLight } from "react-icons/pi";
import { IoTvSharp } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { MdOutlineNightsStay } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import Reserved from "./Reserved";

function RoomDetails(){

    const dispatch = useDispatch();
    const isReserved = useSelector((state)=> state.userInterface.isReserved)
    const isPaid = useSelector((state)=> state.userInterface.isPaid)
    const selectedRoomId = useSelector((state) => state.userInterface.selectedRoom);

    const [accommodation, setAccommodation] = useState(null);

    // AMENITIES ICONS
    const iconMapping = {
        Kitchen: <FaKitchenSet className="offer-icon" />,
        Chair: <PiOfficeChairLight className="offer-icon" />,
        TV: <IoTvSharp className="offer-icon" />,
        Fridge: <RiFridgeFill className="offer-icon" />,
        "Night Stand": <MdOutlineNightsStay className="offer-icon" />,
      };
    //   ENDS

    const db = getFirestore();

    useEffect(() => {
    if (selectedRoomId) {
      fetchAccommodation(selectedRoomId); 
    }
  }, [selectedRoomId]);

    // Fetch data from Firestore
    const fetchAccommodation = async (roomId) => {
        try {
          const docRef = doc(db, "accommodations", roomId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setAccommodation({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching accommodation:", error);
        }
      };

    //   HANDLE ADDING TO FAVORITE
    const handleSaveRoomToFavorites = async () => {
        dispatch(showLoader(true));
        try {
            if (accommodation) {
                const favoriteDocRef = doc(db, "favorites", accommodation.id);
                const accommodationDocRef = doc(db, "accommodations", accommodation.id);
    
                // Add to favorites collection (create or update)
                await setDoc(favoriteDocRef, { 
                    accommodationId: accommodation.id // Ensure the ID is saved with the document
                }, { merge: true });
    
                // Increment the likes count in the accommodations collection
                await updateDoc(accommodationDocRef, {
                    likes: increment(1) // Increment likes by 1
                });
    
                alert("Room has been saved to your favorites!");
            } else {
                console.error("No accommodation details found!");
            }
        } catch (error) {
            console.error("Error saving room to favorites:", error);
        } finally {
            dispatch(showLoader(false));
        }
    };
    
      


    // HANDLES CLOSING THE ROOM DETAILS PAGE
    const HandleCloseRoomDetails = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewRoomDetails());
            dispatch(showLoader(false));
        }, 2000);
        
    }

    // HANDLES RESERVATION AND CANCELLATION OF RESERVATION
    const HandleReservation = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(isRoomReserved());
            dispatch(showLoader(false));
        }, 2000);
        
    }

    // HANDLE PAYMENT
    const HandlePayment = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(isRoomPaid());
            dispatch(showLoader(false));
        }, 2000);
        
        }

    // Show a loading message while fetching data
    if (!accommodation) {
        return <div>Loading...</div>; 
      }

    return(
        

        <div className="room-details-overlay">

            {/* SHOW THIS WHEN THE ROOM IS NOT RESERVED */}
            {!isReserved ? 

            <div className="room-details-content">

                <div className="Gallery" key={accommodation.id}>
                    
                    <div className="gallery-header">
                        <h2><IoIosArrowBack onClick={HandleCloseRoomDetails} className="return-icon" />{accommodation.title}</h2>
                        <div className="room-details-buttons-box">
                            <button className="room-details-buttons" onClick={handleSaveRoomToFavorites}>Save <CiSaveDown2 /></button>
                            <button className="room-details-buttons">Share <CiShare2 /></button>
                        </div>
                    </div>

                    {/* Picture */}
                    <div className="room-gallery">
                        <div className="room-gallery-details">
                            <div className="room-pictures">
                                <img src={accommodation.images[0]} alt="room"></img>
                            </div>
                        </div>

                        <div className="room-gallery-details">
                            <div className="room-pictures">
                                <img src={accommodation.images[1]} alt="room"></img>
                            </div>
                        </div>

                        <div className="room-gallery-details">
                            <div className="room-pictures">
                                <img src={accommodation.images[2]} alt="room"></img>
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
                            
                            {/* ABOUT SECTION */}
                            <div className="about-section">
                                <div className="about-section-content">
                                    <h2><strong>About this place</strong></h2>
                                    <p>
                                        {accommodation.description}
                                    </p>
                                </div>

                                {/* AMENITIES */}
                                <h2><strong>What this place offers</strong></h2>
                                <div className="offers">
                                {accommodation.amenities.map((amenity, index) => (
                                    <p key={index}>
                                    {iconMapping[amenity] || <FaKitchenSet className="offer-icon" />}{" "}
                                    {amenity}
                                    </p>
                                ))}
                                </div>
                                {/* ENDS */}


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
                                >{accommodation.price} ZAR <span>night</span></p>
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
                                            <p>{accommodation.price} ZAR * 11 nights</p>
                                            <p>Weekly stay discout</p>
                                            <p>Service fee</p>
                                        </div>
                                        {/* LEFT ENDS */}

                                        {/* RIGHT */}
                                        <div className="check-content-top-right">

                                            {/* I WILL CHANGE THIS PRICE */}
                                            <p>{accommodation.price} ZAR</p> 

                                            {/* MINUS 10% FROM TOP PRICE */}
                                            <p>{accommodation.price} ZAR</p>

                                            {/* PLUS SERVICE FEE */}
                                            <p>R2,371 ZAR</p>
                                        </div>
                                        {/* RIGHT ENDS */}
                                    </div>
                                    {/* TOP ENDS */}

                                    {/* BOTTOM */}
                                    <div className="check-content-bottom">
                                        <p>Total</p>

                                        {/* TOTAL PRICE */}
                                        <p>{accommodation.price} ZAR</p>
                                    </div>
                                    {/* BOTTOM ENDS */}
                                </div>
                                {/* CHECK CONTENT ENDS */}
                            </div>

                        </div>
                        {/* RIGHT CONTAINER ENDS */}
                    </div>

                </div>
               
            </div>
            

            // ROOM DETAILS ENDS
            : 
            // ROOM RESERVE STARTS
            
            // IF ROOM IS RESERVED SHOW THIS
            
            <Reserved 
            HandlePayment={HandlePayment}
            HandleReservation={HandleReservation}
            />
            
            }
            {/* ENDS */}


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