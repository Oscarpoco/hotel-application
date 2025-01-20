
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { handleOnSignIn } from "../../redux/actions/UserInterface";
import { viewRoomDetails, isRoomReserved,  showLoader } from "../../redux/actions/UserInterface";
import '../Styling/RoomDetails.css';

// FIRESTORE
import { getFirestore, doc, getDoc} from "firebase/firestore";

// ICONS
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

import { FaKitchenSet } from "react-icons/fa6";
import { MdOutlineLocalActivity } from "react-icons/md";
import { PiOfficeChairLight } from "react-icons/pi";
import { IoTvSharp } from "react-icons/io5";
import { RiFridgeFill } from "react-icons/ri";
import { MdOutlineNightsStay } from "react-icons/md";
import Reserved from "./Reserved";
import ReservationDetails from "./ReservationDetails";

function RoomDetails(){

    const dispatch = useDispatch();
    const isReserved = useSelector((state)=> state.userInterface.isReserved)
    const selectedRoomId = useSelector((state) => state.userInterface.selectedRoom);
    const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

    const [accommodation, setAccommodation] = useState(null);

    // AMENITIES ICONS
    const iconMapping = {
        "Kitchen": <MdOutlineLocalActivity className="offer-icon" />,
        "Chair": <PiOfficeChairLight className="offer-icon" />,
        "TV": <IoTvSharp className="offer-icon" />,
        "Fridge": <RiFridgeFill className="offer-icon" />,
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

    

    // HANDLE SHARING
    const handleShare = (accommodation) => {
        const shareData = {
            title: `Check out this accommodation: ${accommodation.location}`,
            text: `Take a look at this accommodation in ${accommodation.location} for ${accommodation.price} ZAR/night.`,
            url: window.location.href + `accommodation/${accommodation.id}`,  
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            
            // Fallback for browsers that do not support navigator.share
            navigator.clipboard.writeText(shareData.url)
                .then(() => alert('Link copied to clipboard!'))
                .catch((error) => console.error('Failed to copy:', error));
        }
    };
    
      


    // HANDLES CLOSING THE ROOM DETAILS PAGE
    const HandleCloseRoomDetails = ()=> {
        dispatch(viewRoomDetails());  
    }

    // HANDLES RESERVATION
    const HandleReservation = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {

            dispatch(isRoomReserved(true));
            if (!isAuthenticated){
                dispatch(handleOnSignIn(true));
            }
            dispatch(showLoader(false));
        }, 500);
        
    }

    // Handle close reservation
    const HandleCloseReservation = ()=> {
        dispatch(showLoader(true));
        setTimeout (()=> {
            dispatch(isRoomReserved(false));
            dispatch(viewRoomDetails(false));
            window.location.reload();
            dispatch(showLoader(false));
        }, 500)
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
                        
                            
                            {isAuthenticated && 
                            (
                                <div className="room-details-buttons-box">
                                    <button className="room-details-buttons" onClick={handleShare}>Share <CiShare2 /></button>
                                </div>
                            )}
                            
                        
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
                                    <p key={index} className="amenity-wrapper">
                                    {iconMapping[amenity] || <MdOutlineLocalActivity className="offer-icon" />}{" "}
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

                        <h2>Reservation form</h2>
                        <ReservationDetails 
                                HandleReservation={HandleReservation}
                                accommodation={accommodation}
                        />
                        </div>
                        {/* ENDS */}
                    </div>

                </div>
               
            </div>
            

            // ROOM DETAILS ENDS
            : 
            // ROOM RESERVE STARTS
            
            // IF ROOM IS RESERVED SHOW THIS
            
            <div className="room-details-content">
                
                <Reserved 
                accommodation={accommodation}
                HandleCloseReservation = {HandleCloseReservation}
                />
            </div>
            
            }
            {/* ENDS */}

        </div>
    )
}

export default RoomDetails;

