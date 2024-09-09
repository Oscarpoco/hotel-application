import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth } from "../../firebase/firebase"; 
import '../Styling/UpdateUserDetails.css';
import { useDispatch, useSelector } from "react-redux";
import { onReviewing } from "../../redux/actions/UserInterface";
import ReviewForm from "./ReviewForm";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAccommodationId, setSelectedAccommodationId] = useState(null); // State to hold selected accommodation ID

    const dispatch = useDispatch();
    const reviewing = useSelector((state) => state.userInterface.reviewing);

    const firestore = getFirestore();

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            const user = auth.currentUser; 
            if (user) {
                try {
                    const bookingsQuery = query(
                        collection(firestore, "bookings"),
                        where("userId", "==", user.uid)
                    );

                    const querySnapshot = await getDocs(bookingsQuery);
                    const fetchedBookings = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setBookings(fetchedBookings);
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            }
            setLoading(false);
        };

        fetchBookings();
    }, []);

    // Function to delete a booking
    const handleDelete = async (bookingId) => {
        try {
            const bookingDocRef = doc(firestore, "bookings", bookingId);
            await deleteDoc(bookingDocRef);
            setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
            alert("Booking deleted successfully!");
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    // Handle open review form and store the selected accommodation ID
    const handleOpenReviewForm = (accommodationId) => {
        setSelectedAccommodationId(accommodationId); // Store selected accommodation ID
        dispatch(onReviewing()); // Open review form
    };

    return (
        <div className="bookings-details">
            <div className="bookings-details-header">
                <h1>My bookings</h1>
            </div>
            <div className="bookings-details-items">
                <div className="bookings-title-wrapper">
                    <p style={{ width: '3%' }}>No</p>
                    <p style={{ width: '10%' }}>Check in</p>
                    <p style={{ width: '10%' }}>Check out</p>
                    <p style={{ width: '10%' }}>Price</p>
                    <p style={{ width: '25%' }}>Token</p>
                    <p style={{ width: '10%' }}>Created At</p>
                    <p style={{ width: '10%' }}>Room</p>
                    <p style={{ width: '8%' }}>Status</p>
                    <p style={{ width: '14%' }}>Action</p>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div className="bookings" key={booking.id}>
                            <p style={{ width: '3%' }}>{`${index + 1}`}</p>
                            <p style={{ width: '10%' }}>{booking.checkIn}</p>
                            <p style={{ width: '10%' }}>{booking.checkOut}</p>
                            <p style={{ width: '10%' }}>{booking.totalPrice}</p>
                            <p style={{ width: '25%' }}>T{booking.paymentMethodId}</p>
                            <p style={{ width: '10%' }}>{new Date(booking.createdAt).toLocaleDateString()}</p>
                            <p style={{ width: '10%' }}>{booking.title}</p>
                            <p style={{ width: '8%' }}>{booking.status}</p>
                            <div className="btn-primary" style={{ width: '14%' }}>
                                <div className="actions-button">
                                    <span className="tooltip" style={{ background: "#DD2A7B" }}>
                                        Get to tell us
                                        <br></br>
                                        about your stay!
                                    </span>
                                    <button className="btn-1" onClick={() => handleOpenReviewForm(booking.accommodationId)}>Review</button>
                                </div>

                                <div className="actions-button">
                                    <span className="tooltip" style={{ background: "#DD2A7B" }}>
                                        Delete your booking
                                        <br></br>
                                        from profile
                                    </span>
                                    <button className="btn-2" onClick={() => handleDelete(booking.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>

            {/* Review Form */}
            {reviewing && (
                <ReviewForm accommodationId={selectedAccommodationId} />
            )}
        </div>
    );
}
