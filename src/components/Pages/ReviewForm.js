import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { onReviewing } from '../../redux/actions/UserInterface';
import {
    TextField,
    Button,
    Box,
    Typography,
    Grid,
    Rating,
    Paper,
} from '@mui/material';

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
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Leave a Review
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Write your review"
                            multiline
                            rows={4}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="legend">Rate Us</Typography>
                        <Rating
                            name="rating"
                            value={rating} // Rating as a number
                            onChange={(e, newValue) => setRating(newValue)}
                            precision={0.5}
                            max={10}
                        />
                    </Grid>
                </Grid>

                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
