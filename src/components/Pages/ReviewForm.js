import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import '../Styling/UpdateUserDetails.css';
import { onReviewing } from '../../redux/actions/UserInterface';
import { useDispatch } from 'react-redux';

export default function ReviewForm({ accommodationId }) {
    const [fullName, setFullName] = useState(''); // State for reviewer's full name
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!accommodationId) {
            console.error("No accommodation ID provided!");
            return;
        }

        if (!fullName || !review || !rating) {
            alert("Please fill in all fields.");
            return;
        }

        const firestore = getFirestore();

        try {
            const accommodationDocRef = doc(firestore, "accommodations", accommodationId);

            await updateDoc(accommodationDocRef, {
                reviews: arrayUnion({
                    fullName: fullName,  
                    review: review,
                    rating: rating,
                    createdAt: new Date().toISOString(),
                    UniqueReviewId: Math.random().toString(36).substr(2, 9),
                }),
            });

            alert("Review submitted successfully!");
            
            // Clear form after successful submission
            setFullName('');
            setReview('');
            setRating('');
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally{
            dispatch(onReviewing(false));
        }
    };


    // HANDLE CLOSE
    const handleClose = () => {
        dispatch(onReviewing(false));
    }

    return (
        <div className="review-form-layout">
            <div className='review-form'>
                <input
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
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
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}
