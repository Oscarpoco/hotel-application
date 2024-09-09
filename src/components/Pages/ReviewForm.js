import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore"; // Import Firestore methods
import '../Styling/UpdateUserDetails.css';

export default function ReviewForm({ accommodationId }) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = async () => {
        if (!accommodationId) {
            console.error("No accommodation ID provided!");
            return;
        }

        const firestore = getFirestore();

        try {
            const accommodationDocRef = doc(firestore, "accommodations", accommodationId);

            await updateDoc(accommodationDocRef, {
                reviews: arrayUnion({
                    review: review,
                    rating: rating,
                    createdAt: new Date().toISOString(),
                }),
            });

            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="review-form-layout">
            <div className='review-form'>
                <textarea
                    placeholder='Write your review....'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <input
                    type="text"
                    placeholder="Rate us between 1 - 10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
