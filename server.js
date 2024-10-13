const express = require('express');
const nodemailer = require('nodemailer');
const { getFirestore, addDoc, collection } = require('firebase/firestore');
const cors = require('cors');

// Initialize Firestore and Express
const db = getFirestore();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Allow requests from the frontend

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',  // Replace with your email
        pass: 'your-email-password',   // Replace with your email password or app-specific password
    },
});

// Route to handle bookings and send email
app.post('/bookings', async (req, res) => {
    const { checkIn, checkOut, guests, nights, totalPrice, accommodationId, title, userId, paymentMethodId, email, name } = req.body;

    // Validate required fields
    if (!email || !name || !title || !totalPrice || !userId) {
        return res.status(400).send('Missing required booking details');
    }

    try {
        const bookingDetails = {
            checkIn,
            checkOut,
            guests,
            nights,
            totalPrice,
            accommodationId,
            title,
            userId,
            paymentMethodId,
            email,
            name,
            createdAt: new Date().toISOString(),
        };

        // Save booking to Firestore
        await addDoc(collection(db, 'bookings'), bookingDetails);

        // Send confirmation email
        await sendEmail(bookingDetails);

        res.status(200).send('Booking confirmed and email sent!');
    } catch (error) {
        console.error('Error processing booking:', error);
        res.status(500).send('Error confirming booking');
    }
});

// Function to send confirmation email using Nodemailer
const sendEmail = async (bookingDetails) => {
    const html = `
    <h3 style="color: #4A90E2;">⭐ Your Booking Request is Successful! ⭐</h3>
    <p>Dear ${bookingDetails.fullName},</p>
    <p>Thank you for choosing RestQuest to help you find the perfect hotel room! We’re excited to confirm that your booking request for the <strong>${bookingDetails.title}</strong> has been successfully received.</p>
    <p>Here’s a summary of your request:</p>
    <ul>
        <li><strong>Check-in Date:</strong> ${bookingDetails.checkIn}</li>
        <li><strong>Check-out Date:</strong> ${bookingDetails.checkOut}</li>
        <li><strong>Number of Guests:</strong> ${bookingDetails.guests}</li>
        <li><strong>Nights:</strong> ${bookingDetails.nights}</li>
        <li><strong>Total Price:</strong> R ${bookingDetails.totalPrice}</li>
    </ul>
    <p>Your official booking confirmation will be sent to you shortly. If you have any questions or need assistance in the meantime, feel free to reach out to us!</p>
    <p>We look forward to helping you enjoy a wonderful stay!</p>
    <p>Warm regards,<br>The Rest Hotely Team</p>
    `;

    const mailOptions = {
        from: 'okpoco15@gmail.com',  
        to: bookingDetails.email,      
        subject: 'Your Booking Confirmation with RestQuest',
        html: html,                    
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.messageId);
};

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
