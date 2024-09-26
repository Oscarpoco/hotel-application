import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewRoomDetails, showLoader, setSelectedRoom, setLiked } from "../../redux/actions/UserInterface";

// ICONS
import { GiRoundStar } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";

// FIRESTORE
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc, increment, getDoc } from "firebase/firestore"; // Firestore imports
import { auth } from "../../firebase/firebase";
import '../Styling/Rooms.css';
import SearchHotels from "./SearchHotels";

function Rooms() {
    const dispatch = useDispatch();
    const [accommodations, setAccommodations] = useState([]);
    const [likedRooms, setLikedRooms] = useState({}); // Track liked rooms locally

    const db = getFirestore();

    // FETCH ACCOMMODATIONS
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
                        averageRating: averageRating || 0,
                    };
                })
            );
            setAccommodations(accommodationsList);
        } catch (error) {
            console.error("Error fetching accommodations:", error);
        }
    };

    // Open Room Details
    const handleOpenRoomDetails = (roomId) => {
        dispatch(showLoader(true));
        dispatch(setSelectedRoom(roomId));
        setTimeout(() => {
            dispatch(viewRoomDetails());
            dispatch(showLoader(false));
        }, 2000);
    };

    // Handle Like/Unlike Functionality
    const handleToggleLike = async (accommodation) => {
        dispatch(showLoader(true));
        try {
            if (accommodation) {
                const user = auth.currentUser; // Get the currently logged-in user
                if (user) {
                    const favoriteDocRef = doc(db, "favorites", `${user.uid}_${accommodation.id}`); // Use a composite key for uniqueness
                    const accommodationDocRef = doc(db, "accommodations", accommodation.id);

                    // Check if the room is already liked
                    const docSnapshot = await getDoc(favoriteDocRef);
                    if (docSnapshot.exists()) {
                        // Room is already liked -> Unlike (remove from favorites and decrement likes)
                        await deleteDoc(favoriteDocRef); // Remove from favorites collection
                        await updateDoc(accommodationDocRef, {
                            likes: increment(-1), // Decrement likes by 1
                        });
                     
                    } else {
                        // Room is not liked yet -> Like (add to favorites and increment likes)
                        // Save all details from the accommodation object to Firestore
                        await setDoc(favoriteDocRef, {
                            ...accommodation, // Save all accommodation details
                            userId: user.uid, 
                            likedAt: new Date(), 
                        }, { merge: true });

                        await updateDoc(accommodationDocRef, {
                            likes: increment(1), // Increment likes by 1
                        });
                       
                    }

                    // Update the accommodations state to reflect the new likes count
                    setAccommodations((prevAccommodations) => prevAccommodations.map((item) =>
                        item.id === accommodation.id
                            ? { ...item, likes: item.likes + (docSnapshot.exists() ? -1 : 1) }
                            : item
                    ));

                    // Update local state for the UI to handle the red heart icon
                    setLikedRooms((prevState) => ({
                        ...prevState,
                        [accommodation.id]: !docSnapshot.exists(), // Toggle like/unlike state
                    }));
                    dispatch(setLiked()); 
                } else {
                    console.error("No user is logged in!");
                }
            } else {
                console.error("No accommodation details found!");
            }
        } catch (error) {
            console.error("Error saving/removing room from favorites:", error);
        } finally {
            dispatch(showLoader(false));
        }
    };

    return (
        <div className="rooms-layout">
            <div className="search-bar">
                <SearchHotels />
            </div>
            <div className="rooms">
                {/* ROOM DETAILS */}
                {accommodations.map((accommodation) => (
                    <div className="room-details" key={accommodation.id}>
                        <div className="room-picture" onClick={() => handleOpenRoomDetails(accommodation.id)}>
                            <img src={accommodation.images[2]} alt="room"></img>
                        </div>
                        <div className="room-content">
                            <p>{accommodation.location}</p>
                            <p>Availability: <span>{accommodation.availability}</span></p>
                            <p>{accommodation.price} ZAR /<span> night</span></p>
                            <div className="room-rating-likes">
                                <p className="p-wrapper">
                                    <GiRoundStar className="room-star" />
                                    <span>{accommodation.averageRating.toFixed(1) || 0}</span>
                                </p>
                                <p className="p-wrapper">
                                    <FaHeart
                                        className="love"
                                        style={{ color: likedRooms[accommodation.id] ? 'red' : 'white' }}
                                        onClick={() => handleToggleLike(accommodation)}
                                    />
                                    <span>{accommodation.likes || 0}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rooms;
