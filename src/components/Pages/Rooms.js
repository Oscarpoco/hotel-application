import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { viewRoomDetails, showLoader, setSelectedRoom  } from "../../redux/actions/UserInterface";

// ICONS
import { GiRoundStar } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";


// FIRESTORE
import {  getFirestore,collection, getDocs} from "firebase/firestore"; // Firestore imports

import '../Styling/Rooms.css';

function Rooms(){

    const dispatch = useDispatch();
    const [accommodations, setAccommodations] = useState([]);

    const db = getFirestore();

    // FETCH ACCOMODATION
    useEffect(() => {
      fetchAccommodations();
  }, []);
  
  const fetchAccommodations = async () => {
      try {
          const accommodationsCollection = collection(db, "accommodations");
          const accommodationsSnapshot = await getDocs(accommodationsCollection);
          const accommodationsList = await Promise.all(
              accommodationsSnapshot.docs.map(async (doc) => {
                  const data = doc.data();
                  let averageRating = 0;
                  
                  // Check if reviews exist
                  if (data.reviews && data.reviews.length > 0) {
                      const totalRatings = data.reviews.reduce((acc, review) => acc + Number(review.rating), 0);
                      averageRating = totalRatings / data.reviews.length;
                  }
                  
                  return {
                      id: doc.id,
                      ...data,
                      averageRating: averageRating || 0, // Default to 0 if no reviews
                  };
              })
          );
          setAccommodations(accommodationsList);
      } catch (error) {
          console.error("Error fetching accommodations:", error);
      }
  };
  
  const handleOpenRoomDetails = (roomId) => {
      dispatch(showLoader(true));
      dispatch(setSelectedRoom(roomId));
      setTimeout(() => {
          dispatch(viewRoomDetails());
          dispatch(showLoader(false));
      }, 2000);
  };
  

    return(
        <div className="rooms">

            {/* ROOM DETAILS*/}
            {accommodations.map((accommodation) => (
            <div className="room-details" onClick={() => handleOpenRoomDetails(accommodation.id)} key={accommodation.id}>
                
                <div className="room-picture">
                    <img src={accommodation.images[2]} alt="room"></img>
                </div>
                <div className="room-content">
                    <p>{accommodation.location}</p>
                    <p>Availability: <span>{accommodation.availability}</span></p>
                    <p>{accommodation.price} ZAR /<span> night</span></p>
                    <div className="room-rating-likes">
                      <p className="p-wrapper"><GiRoundStar className="room-star"/> <span>{accommodation.averageRating.toFixed(1) || 0}</span></p>
                      <p className="p-wrapper"><FaHeart className="love"/> <span>{accommodation.likes || 0}</span></p>
                    </div>
                </div>
            </div>
            ))}

            {/* ENDS */}

        </div>
    )
}

export default Rooms;