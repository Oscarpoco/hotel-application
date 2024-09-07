import React from "react";
import '../Styling/RoomDetails.css';
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux"; // Import useSelector to get data from Redux

function Reserved({ HandleReservation, HandlePayment, accommodation }) {
    // Access reservation data from Redux store
    const reservation = useSelector((state) => state.authentication.reservation); // Replace with your correct state path

    if (!reservation) {
        return <div>Loading...</div>; // Loading state or error handling if reservation is not available
    }

    return (
        <div className="payment-wrapper">
            {/* PAYMENT HEADER */}
            <div className="payment-header">
                <h2><IoIosArrowBack onClick={HandleReservation} className="return-icon" />Request to book</h2>
            </div>

            {/* LEFT AND RIGHT CONTAIN WRAPPER */}
            <div className="left-right-contain-wrapper">
                {/* LEFT CONTAINER PAYMENT */}
                <div className="room-details-left-container-payment">
                    <p>Payment Details</p>

                    <div className="payment-gateway">
                        <input type="text" placeholder="Credit or debit card" />
                    </div>

                    <div className="payment-gateway-card">
                        <div className="payment-top">
                            <input type="text" placeholder="Card number" />
                        </div>
                        <div className="payment-bottom">
                            <div className="card-detail">
                                <input type="text" placeholder="Expiration" />
                            </div>
                            <div className="card-detail">
                                <input type="text" placeholder="CVV" />
                            </div>
                        </div>
                    </div>

                    <div className="payment-gateway-zip-code">
                        <input type="text" placeholder="ZIP CODE" />
                    </div>
                    <div className="payment-gateway-country">
                        <input type="text" placeholder="Country" />
                    </div>

                    <div className="confirm-button-box">
                        <button type="submit" className="confirm-button" onClick={HandlePayment}>
                            <strong>Confirm payment</strong>
                        </button>
                    </div>
                </div>
                {/* PAYMENT ENDS */}

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
                        <button type="submit" onClick={HandleReservation} className="confirm-button" style={{ background: 'red', color: 'white' }}>
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
