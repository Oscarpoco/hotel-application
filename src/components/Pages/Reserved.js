import React from "react";
import '../Styling/RoomDetails.css';
import { IoIosArrowBack } from "react-icons/io";

function Reserved({HandleReservation, HandlePayment}) {

    return (
        <div className="room-details-overlay">
            <div className="room-details-content">

                <div className="payment-wrapper">

                    {/* PAYMENT HEADER */}
                    <div className="payment-header"><h2><IoIosArrowBack onClick={HandleReservation} className="return-icon" />Request to book</h2></div>

                    {/* LEFT AND RIGHT CONTAIN WRAPPER */}
                    <div className="left-right-contain-wrapper">

                        {/*LEFT CONTAINER PAYMENT */}
                        <div className="room-details-left-container-payment">
                            <p>Payment Details</p>

                            <div className="payment-gateway">
                                <input type="text" placeholder="Credit or debit card"></input>
                            </div>

                            <div className="payment-gateway-card">
                                <div className="payment-top">
                                    <input type="text" placeholder="Card number"></input>
                                </div>
                                <div className="payment-bottom">
                                    <div className="card-detail">
                                        <input type="text" placeholder="Expiration"></input>
                                    </div>
                                    <div className="card-detail">
                                        <input type="text" placeholder="CVV"></input>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-gateway-zip-code">

                                <input type="text" placeholder="ZIP CODE"></input>
                            </div>
                            <div className="payment-gateway-country">
                                <input type="text" placeholder="Country"></input>
                            </div>
                        </div>
                        {/* PAMENT ENDS */}

                        {/* RIGHT CONTAINER */}
                        <div className="content-right">

                            {/* ALL CONTENT */}
                            <div className="reservation">
                                {/* HEADER TEXTS */}
                                <p
                                    style={{ textAlign: 'start', width: '100%', fontWeight: 'bold' }}
                                >R1,402 ZAR <span>night</span></p>
                                {/* HEADER TEXTS ENDS */}

                                <div className="check">
                                    {/* TOP */}
                                    <div className="check-top">

                                        {/* CHECK-IN */}
                                        <div className="check-in">
                                            <p>Check in</p>
                                            <input type="date" placeholder="Add date"></input>
                                        </div>
                                        {/* CHECK IN ENDS */}

                                        {/* CHECK OUT */}
                                        <div className="check-out">
                                            <p>Check in</p>
                                            <input type="date" placeholder="Add date"></input>
                                        </div>
                                        {/* CHECK OUT ENDS */}

                                    </div>
                                    {/* ENDS */}

                                    {/* BOTTOM */}
                                    <div className="check-bottom">
                                        <p>Guests</p>
                                    </div>
                                    {/* BOTTOM ENDS */}
                                </div>

                                {/* BUTTON */}
                                <button type="submit" onClick={HandleReservation} className="cancel-button"><strong>Cancel</strong></button>
                                {/* BUTTON ENDS */}

                                {/* CHECK CONTENT */}
                                <div className="check-content">

                                    {/* TOP */}
                                    <div className="check-content-top">
                                        {/* LEFT */}
                                        <div className="check-content-top-left">
                                            <p>R1,402 ZAR * 11 nights</p>
                                            <p>Weekly stay discout</p>
                                            <p>Service fee</p>
                                        </div>
                                        {/* LEFT ENDS */}

                                        {/* RIGHT */}
                                        <div className="check-content-top-right">
                                            <p>R15,421 ZAR</p>
                                            <p>-R3,084 ZAR</p>
                                            <p>R2,371 ZAR</p>
                                        </div>
                                        {/* RIGHT ENDS */}
                                    </div>
                                    {/* TOP ENDS */}

                                    {/* BOTTOM */}
                                    <div className="check-content-bottom">
                                        <p>Total</p>
                                        <p>R14,942 ZAR</p>
                                    </div>
                                    {/* BOTTOM ENDS */}
                                </div>
                                {/* CHECK CONTENT ENDS */}
                            </div>
                        </div>

                    </div>
                    {/* RIGHT CONTAINER ENDS */}

                    {/* CONFIRM BUTTON */}
                    <div className="confirm-button-box">
                        <button type="submit" className="confirm-button" onClick={HandlePayment}><strong>Confirm payment</strong></button>
                    </div>
                    {/* ENDS */}

                </div>

            </div>
        </div>
    )
}

export default Reserved;