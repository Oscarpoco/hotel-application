import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; // Firestore imports
import { auth } from "../../firebase/firebase"; // Auth import
import '../Styling/Favorite.css';
import DataLoader from "./DataLoader";

export function Favorite() {
    const [favorites, setFavorites] = useState([]); 
    const [loading, setLoading] = useState(true); 

    // Initialize Firestore
    const firestore = getFirestore(); 

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            const user = auth.currentUser; 
            if (user) {
                try {
                    // Query Firestore for favorites associated with the logged-in user's UID
                    const favoritesQuery = query(
                        collection(firestore, "favorites"), 
                        where("userId", "==", user.uid) 
                    );

                    const querySnapshot = await getDocs(favoritesQuery);
                    const fetchedFavorites = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setFavorites(fetchedFavorites); 
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            }
            setLoading(false); 
        };

        
    
        fetchFavorites();
        
    }, [firestore]); 

    return (
        <div className="favorites-wrapper">

            <div className="favorite-grid-wrapper">
                {loading ? ( 
                    
                    <DataLoader/>
                ) : favorites.length > 0 ? ( 
                    favorites.map((favorite) => (
                        <div className="favorite-grid-item" key={favorite.id}>
                            <div className="image-card">
                            <img src={favorite.images[2]} alt={favorite.title} className="accomodation-image"/>
                            </div>
                            <div className="content-card">
                                <p><strong>{favorite.title}</strong></p> 
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No favorites found.</p> 
                )}
            </div>
        </div>
    );
}
