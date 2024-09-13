
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { viewRoomDetails, isRoomReserved, isRoomPaid, showLoader } from "../../redux/actions/UserInterface";
import '../Styling/RoomDetails.css';

// FIRESTORE
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { auth } from "../../firebase/firebase";

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
import ReservationDetails from "./ReservationDetails";

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

      const handleSaveRoomToFavorites = async () => {
        dispatch(showLoader(true));
        try {
            if (accommodation) {
                const user = auth.currentUser; // Get the currently logged-in user
                if (user) {
                    const favoriteDocRef = doc(db, "favorites", `${user.uid}_${accommodation.id}`); // Use a composite key for uniqueness
                    const accommodationDocRef = doc(db, "accommodations", accommodation.id);
    
                    // Add to favorites collection (create or update)
                    await setDoc(favoriteDocRef, { 
                        ...accommodation, // Save all details about the accommodation
                        userId: user.uid, // Include user ID
                    }, { merge: true });
    
                    // Increment the likes count in the accommodations collection
                    await updateDoc(accommodationDocRef, {
                        likes: increment(1) // Increment likes by 1
                    });
    
                    alert("Room has been saved to your favorites!");
                } else {
                    console.error("No user is logged in!");
                }
            } else {
                console.error("No accommodation details found!");
            }
        } catch (error) {
            console.error("Error saving room to favorites:", error);
        } finally {
            dispatch(showLoader(false));
        }
    };

    // HANDLE SHARING
    const handleShare = (accommodation) => {
        const shareData = {
            title: `Check out this accommodation: ${accommodation.location}`,
            text: `Take a look at this accommodation in ${accommodation.location} for ${accommodation.price} ZAR/night.`,
            url: window.location.href + `accommodation/${accommodation.id}`,  // Example share link
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
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewRoomDetails());
            window.location.reload();
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
            dispatch(isRoomPaid(false));
            dispatch(isRoomReserved(false));
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
                            <button className="room-details-buttons" onClick={handleShare}>Share <CiShare2 /></button>
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
                HandlePayment={HandlePayment}
                HandleReservation={HandleReservation}
                accommodation={accommodation}
                />
            </div>
            
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

