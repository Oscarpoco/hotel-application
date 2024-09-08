import React from "react";
import '../Styling/RoomDetails.css';
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { doc, setDoc, getFirestore } from "firebase/firestore";

function Reserved({ HandleReservation, HandlePayment, accommodation }) {
    const reservation = useSelector((state) => state.authentication.reservation);
    const user = useSelector((state) => state.authentication.user); 
    const db = getFirestore();

    if (!reservation || !user) {
        return <div>Loading...</div>;
    }

    const userId = user.id || user.uid; // Adjust if necessary based on your actual user object

    const onToken = async (token) => {
        try {
            const bookingData = {
                checkIn: reservation.checkIn,
                checkOut: reservation.checkOut,
                guests: reservation.guests,
                nights: reservation.nights,
                totalPrice: reservation.totalPrice,
                userId: userId,
                paymentMethodId: token.id,
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, "bookings", `${userId}_${new Date().getTime()}`), bookingData);

            alert("Payment and booking successful!");
            HandlePayment();
        } catch (error) {
            console.error("Error saving booking:", error);
            alert("Failed to save booking. Please try again.");
        }
    };

    return (
        <div className="payment-wrapper">
            {/* PAYMENT HEADER */}
            <div className="payment-header">
                <h2><IoIosArrowBack onClick={HandleReservation} className="return-icon" />Request to book</h2>
                <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_51PwZqI08I0xTXWPP7UTZfEAVdMoIU4t0XKBdoDS49bbEwNbUIqa4y8Ci873JogyaFKo1osvNOOrZExH98PsYIYPZ00HvFJUzqv"
                    name="Accommodation"
                    description="Payment for Accommodation"
                    amount={reservation.totalPrice * 100} // Convert to cents
                    currency="ZAR"
                />
            </div>

            {/* LEFT AND RIGHT CONTAIN WRAPPER */}
            <div className="left-right-contain-wrapper">
                {/* RIGHT CONTAINER */}
                <div className="content-right">
                    <div className="reservation">
                        {/* HEADER TEXTS */}
                        <p style={{ textAlign: 'start', width: '100%', fontWeight: 'bold' }}>
                            {accommodation.price} ZAR <span>night</span>
                        </p>
                        {/* HEADER TEXTS ENDS */}

                        <div className="check">
                            {/* TOP */}
                            <div className="check-top">
                                {/* CHECK-IN */}
                                <div className="check-in">
                                    <p>Check in</p>
                                    <p>{reservation.checkIn}</p>
                                </div>
                                {/* CHECK IN ENDS */}

                                {/* CHECK OUT */}
                                <div className="check-out">
                                    <p>Check out</p>
                                    <p>{reservation.checkOut}</p>
                                </div>
                                {/* CHECK OUT ENDS */}
                            </div>
                            {/* TOP ENDS */}

                            {/* BOTTOM */}
                            <div className="check-bottom">
                                <p>Guests</p>
                                <p>{reservation.guests}</p>
                            </div>
                            {/* BOTTOM ENDS */}
                        </div>

                        {/* CANCEL BUTTON */}
                        <button type="button" onClick={HandleReservation} className="confirm-button" style={{ background: 'red', color: 'white' }}>
                            <strong>Cancel</strong>
                        </button>
                        {/* CANCEL BUTTON ENDS */}

                        {/* CHECK CONTENT */}
                        <div className="check-content">
                            {/* TOP */}
                            <div className="check-content-top">
                                {/* LEFT */}
                                <div className="check-content-top-left">
                                    <p>{accommodation.price} ZAR * {reservation.nights} nights</p>
                                    <p>Weekly stay discount</p>
                                </div>
                                {/* LEFT ENDS */}

                                {/* RIGHT */}
                                <div className="check-content-top-right">
                                    <p>{(accommodation.price * reservation.nights).toFixed(2)} ZAR</p> {/* Total before discount */}
                                    <p>-{(reservation.nights >= 7 ? (accommodation.price * 0.1 * reservation.nights).toFixed(2) : 0)} ZAR</p> {/* Conditional discount */}
                                </div>
                                {/* RIGHT ENDS */}
                            </div>
                            {/* TOP ENDS */}

                            {/* BOTTOM */}
                            <div className="check-content-bottom">
                                <p>Total</p>
                                {/* TOTAL PRICE */}
                                <p>{reservation.totalPrice.toFixed(2)} ZAR</p>
                            </div>
                            {/* BOTTOM ENDS */}
                        </div>
                        {/* CHECK CONTENT ENDS */}
                    </div>
                </div>
                {/* RIGHT CONTAINER ENDS */}
            </div>
        </div>
    );
}

export default Reserved;
