import React from "react";
import '../Styling/RoomDetails.css';

import { useDispatch } from "react-redux";
import { setReservation } from "../../redux/actions/Authentication";

import { useState, useEffect } from "react";

export default function ReservationDetails({ HandleReservation, accommodation }) {

    const dispatch = useDispatch();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("");
    const [nights, setNights] = useState(0); 
    const [totalPrice, setTotalPrice] = useState(0); 
    

    // Calculate the number of nights and total price whenever checkIn or checkOut changes
    useEffect(() => {
        if (checkIn && checkOut) {
            calculateNightsAndPrice();
        }
    }, [checkIn, checkOut]);

    const calculateNightsAndPrice = () => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // Calculate the difference in time (milliseconds) and convert it to days
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Set the number of nights and total price
        const validNights = daysDifference > 0 ? daysDifference : 0;
        setNights(validNights);

        // Calculate the total price with discount and fees
        const weeklyDiscount = validNights >= 7 ? accommodation.price * validNights * 0.1 : 0; 
        const discountedPrice = validNights * accommodation.price - weeklyDiscount; 
        setTotalPrice(discountedPrice > 0 ? discountedPrice : 0);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from submitting

        // Create FormData object
        const formData = new FormData();
        formData.append('checkIn', checkIn);
        formData.append('checkOut', checkOut);
        formData.append('guests', guests);
        formData.append('nights', nights);
        formData.append('totalPrice', totalPrice);

        // Dispatch form data to Redux store
        dispatch(setReservation({
            checkIn,
            checkOut,
            guests,
            nights,
            totalPrice,
        }));

        // Clear input fields after submission
        setCheckIn("");
        setCheckOut("");
        setGuests("");
        setNights(0);
        setTotalPrice(0);

        // Handle the reservation as needed (if there's a specific function to handle it)
        HandleReservation(checkIn, checkOut, guests, nights, totalPrice);
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
                            placeholder="Add date"
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                        />
                    </div>
                    {/* CHECK OUT ENDS */}
                </div>
                {/* ENDS */}

                {/* BOTTOM */}
                <div className="check-bottom">
                    <p>Guests</p>
                    <input type="text"
                        placeholder="How many guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        required
                    />
                </div>
                {/* BOTTOM ENDS */}

                {/* BUTTON */}
                <button type="submit" className="confirm-button">
                    <strong>Reserve</strong>
                </button>
                {/* BUTTON ENDS */}
            </form>

            {/* CHECK CONTENT */}
            <div className="check-content">

                {/* TOP */}
                <div className="check-content-top">
                    {/* LEFT */}
                    <div className="check-content-top-left">
                        <p>{accommodation.price} ZAR * {nights} nights</p>
                        <p>Stay discout</p>
                    </div>
                    {/* LEFT ENDS */}

                    {/* RIGHT */}
                    <div className="check-content-top-right">
                        <p>{(accommodation.price * nights).toFixed(2)} ZAR</p>
                      
                        <p>-{(nights >= 7 ? (accommodation.price * 0.1 * nights) : 0).toFixed(2)} ZAR</p>   {/*  */}
                    </div>
                    {/* RIGHT ENDS */}
                </div>
                {/* TOP ENDS */}

                {/* BOTTOM */}
                <div className="check-content-bottom">
                    <p>Total Price</p>

                    {/* TOTAL PRICE */}
                    <p>{totalPrice} ZAR</p>
                </div>
                {/* BOTTOM ENDS */}
            </div>
            {/* CHECK CONTENT ENDS */}
        </div>
    );
}
