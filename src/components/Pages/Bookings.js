import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth } from "../../firebase/firebase"; 
import '../Styling/UpdateUserDetails.css';
import { useDispatch, useSelector } from "react-redux";
import { onReviewing } from "../../redux/actions/UserInterface";
import ReviewForm from "./ReviewForm";

// MUI
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Tooltip
} from '@mui/material';

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

        
        fetchBookings()
        
    }, [firestore, dispatch]);

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
            
                <TableContainer component={Paper}>
                <Table aria-label="bookings table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Check in</TableCell>
                            <TableCell>Check out</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Token</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Room</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{booking.checkIn}</TableCell>
                                    <TableCell>{booking.checkOut}</TableCell>
                                    <TableCell>{booking.totalPrice}</TableCell>
                                    <TableCell>T{booking.paymentMethodId}</TableCell>
                                    <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{booking.title}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Tell us about your stay!">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleOpenReviewForm(booking.accommodationId)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Review
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Delete your booking from profile">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDelete(booking.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    No bookings found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Review Form */}
            {reviewing && (
                <ReviewForm accommodationId={selectedAccommodationId} />
            )}
        </div>
    );
}
