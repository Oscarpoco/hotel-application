import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore methods
import { auth } from "../../firebase/firebase"; // Import Auth instance
import '../Styling/UpdateUserDetails.css';

export default function Bookings() {
    const [bookings, setBookings] = useState([]); // State to hold bookings
    const [loading, setLoading] = useState(true); // State to handle loading status

    // Initialize Firestore
    const firestore = getFirestore(); 

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true); // Start loading
            const user = auth.currentUser; // Get the currently logged-in user
            if (user) {
                try {
                    // Query Firestore for bookings associated with the logged-in user's UID
                    const bookingsQuery = query(
                        collection(firestore, "bookings"), // Assuming bookings are stored in the "bookings" collection
                        where("userId", "==", user.uid) // Match bookings by user ID
                    );

                    const querySnapshot = await getDocs(bookingsQuery);
                    const fetchedBookings = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setBookings(fetchedBookings); // Set fetched bookings in state
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            }
            setLoading(false); // End loading
        };

        fetchBookings();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="bookings-details">
            <div className="bookings-details-header">
                <p>My bookings</p>
            </div>
            <div className="bookings-details-items">

            <div className="bookings-title-wrapper">
                    <p style={{width: '3%'}}>No</p>
                    <p style={{width: '10%'}}>Check in</p>
                    <p style={{width: '10%'}}>Check out</p>
                    <p style={{width: '10%'}}>Price</p>
                    <p style={{width: '25%'}}>Token</p>
                    <p style={{width: '10%'}}>Created At</p>
                    <p style={{width: '10%'}}>Room</p>
                    <p style={{width: '8%'}}>Status</p>
                    <p style={{width: '14%'}}>Action</p>
                </div>

                {loading ? ( // Show loading indicator while fetching data
                    <p>Loading...</p>
                ) : bookings.length > 0 ? ( // Check if there are bookings to display
                    bookings.map((booking, index) => ( // Map over fetched bookings and display them
                        <div className="bookings" key={booking.id}>
                            <p style={{width: '3%'}}>{`${index + 1}`}</p>
                            <p style={{width: '10%'}}>{booking.checkIn}</p>
                            <p style={{width: '10%'}}>{booking.checkOut}</p>
                            <p style={{width: '10%'}}>{booking.totalPrice}</p>
                            <p style={{width: '25%'}}>T{booking.paymentMethodId}</p>
                            <p style={{width: '10%'}}>{new Date(booking.createdAt).toLocaleDateString()}</p>
                            <p style={{width: '10%'}}>{booking.title}</p>
                            <p style={{width: '8%'}}>{booking.status}</p>
                            <div className="btn-primary" style={{width: '14%'}}>
                                <div className="actions-button">
                                    <span className="tooltip" style={{ background: "#DD2A7B" }}>
                                        Get to tell us
                                        <br></br>
                                        about your stay!
                                    </span>
                                    <button className="btn-1">Review</button>
                                </div>

                                <div className="actions-button">
                                    <span className="tooltip" style={{ background: "#DD2A7B" }}>
                                        Delete your booking
                                        <br></br>
                                        from profile
                                    </span>
                                    <button className="btn-2">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p> 
                )}
            </div>
        </div>
    );
}
