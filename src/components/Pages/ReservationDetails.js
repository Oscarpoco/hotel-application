import React, { useState, useEffect } from "react";
import '../Styling/RoomDetails.css';
import { useDispatch, useSelector } from "react-redux";
import { setReservation } from "../../redux/actions/Authentication";
import { handleOnSignUp, showLoader, handleOnSignIn } from "../../redux/actions/UserInterface";
// import { handleOnSignIn } from "../../redux/actions/Authentication";

export default function ReservationDetails({ HandleReservation, accommodation }) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
    const isSignUpOpen = useSelector((state) => state.userInterface.isSignUpOpen);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("");
    const [nights, setNights] = useState(1);
    const [title, setTitle] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [dateError, setDateError] = useState("");

    useEffect(() => {
        if (accommodation) {
            setTitle(accommodation.title);
        }
    }, [accommodation]);

    // Calculate the number of nights and total price whenever checkIn or checkOut changes
    useEffect(() => {
        if (checkIn && checkOut) {
            calculateNightsAndPrice();
        }
    }, [checkIn, checkOut]);

    const calculateNightsAndPrice = () => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison

        // Validate dates
        if (checkInDate < today) {
            setDateError("Check-in date cannot be in the past");
            return;
        }
        
        if (checkOutDate <= checkInDate) {
            setDateError("Check-out date must be after check-in date");
            return;
        }
        
        // Clear error if dates are valid
        setDateError("");

        // Calculate the difference in time (milliseconds) and convert it to days
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Set the number of nights and total price
        const validNights = daysDifference > 0 ? daysDifference : 0;
        setNights(validNights);

        // Calculate the total price with discount and fees
        const basePrice = accommodation.price * validNights;
        const weeklyDiscount = validNights >= 7 ? basePrice * 0.1 : 0;
        const discountedPrice = basePrice - weeklyDiscount;
        setTotalPrice(discountedPrice > 0 ? discountedPrice : 0);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (dateError) {
            return; // Don't submit if there are date errors
        }
        
        // Validate guests is a number
        const guestsNum = parseInt(guests);
        if (isNaN(guestsNum) || guestsNum <= 0) {
            alert("Please enter a valid number of guests");
            return;
        }

        // Create reservation data
        const reservationData = {
            checkIn,
            checkOut,
            guests: guestsNum,
            nights,
            totalPrice,
            title,
        };

        // Dispatch form data to Redux store
        dispatch(setReservation(reservationData));

        // Pass data to parent component
        HandleReservation(checkIn, checkOut, guestsNum, nights, totalPrice, title);

        // Clear input fields after submission
        setCheckIn("");
        setCheckOut("");
        setGuests("");
        setNights(0);
        setTotalPrice(0);
        setTitle("");
    };

    const handleOpenLoginForm = () => {
        dispatch(showLoader(true));
        
        setTimeout(() => {
            if (isSignUpOpen === true) {
                dispatch(handleOnSignUp(false));
            }
            
            // Open the signin form
            dispatch(handleOnSignIn());
            dispatch(showLoader(false));
        }, 100);
    };

    // Check if accommodation is available
    const isAccommodationAvailable = 
        accommodation.availability === "Available" || 
        accommodation.availability === "available";

    // Format currency for display
    const formatCurrency = (amount) => {
        return parseFloat(amount).toFixed(2);
    };

    return (
        <div className="reservation">
            {/* HEADER TEXTS */}
            <p
                style={{ textAlign: 'start', width: '100%', fontWeight: 'bold' }}
            >
                {accommodation.price} ZAR <span>night</span>
            </p>
            {/* HEADER TEXTS ENDS */}

            <form className="check" onSubmit={handleSubmit}>
                {/* TOP */}
                <div className="check-top">
                    {/* CHECK-IN */}
                    <div className="check-in">
                        <p>Check in</p>
                        <input type="date"
                            value={checkIn}
                            min={new Date().toISOString().split('T')[0]} // Set min date to today
                            placeholder="Add date"
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                        />
                    </div>
                    {/* CHECK IN ENDS */}

                    {/* CHECK OUT */}
                    <div className="check-out">
                        <p>Check out</p>
                        <input type="date"
                            value={checkOut}
                            min={checkIn || new Date().toISOString().split('T')[0]} // Set min date to check-in date or today
                            placeholder="Add date"
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </div>
                    {/* CHECK OUT ENDS */}
                </div>
                {/* ENDS */}

                {/* Date Error Message */}
                {dateError && (
                    <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                        {dateError}
                    </div>
                )}

                {/* BOTTOM */}
                <div className="check-bottom">
                    <p>Guests</p>
                    <input type="number"
                        placeholder="How many guests"
                        value={guests}
                        min="1"
                        onChange={(e) => setGuests(e.target.value)}
                        required
                    />
                </div>
                {/* BOTTOM ENDS */}

                {/* BUTTON */}
                {isAuthenticated ? (
                    isAccommodationAvailable ? (
                        <button type="submit" className="confirm-button">
                            <strong>Reserve</strong>
                        </button>
                    ) : (
                        <button type="button" disabled className="confirm-button">
                            <strong>Not Available</strong>
                        </button>
                    )
                ) : (
                    <button type="button" className="confirm-button" onClick={handleOpenLoginForm}>
                        <strong>Login to reserve</strong>
                    </button>
                )}
                {/* BUTTON ENDS */}
            </form>

            {/* CHECK CONTENT */}
            {checkIn && checkOut && nights > 0 && (
                <div className="check-content">
                    {/* TOP */}
                    <div className="check-content-top">
                        {/* LEFT */}
                        <div className="check-content-top-left">
                            <p>{accommodation.price} ZAR × {nights} nights</p>
                            {nights >= 7 && <p>Stay discount (10%)</p>}
                        </div>
                        {/* LEFT ENDS */}

                        {/* RIGHT */}
                        <div className="check-content-top-right">
                            <p>+{formatCurrency(accommodation.price * nights)} ZAR</p>
                            {nights >= 7 && <p>-{formatCurrency(accommodation.price * 0.1 * nights)} ZAR</p>}
                        </div>
                        {/* RIGHT ENDS */}
                    </div>
                    {/* TOP ENDS */}

                    {/* BOTTOM */}
                    <div className="check-content-bottom">
                        <p>Total Price</p>
                        {/* TOTAL PRICE */}
                        <p>{formatCurrency(totalPrice)} ZAR</p>
                    </div>
                    {/* BOTTOM ENDS */}
                </div>
            )}
            {/* CHECK CONTENT ENDS */}
        </div>
    );
}