
import React from "react";

// STYLING
import '../Styling/Gallery.css';

// FROM REDUX
import { useDispatch } from "react-redux";

// FROM REACT
import { useState, useEffect } from "react";

// FROM REDUX ACTIONS
import { viewGallery, showLoader } from "../../redux/actions/UserInterface";

// FROM FIRESTORE
import { getFirestore, collection, getDocs } from "firebase/firestore";

// ICONS
import { IoIosArrowBack } from "react-icons/io";


function Gallery(){

    // DISPATCH
    const dispatch = useDispatch();

    // STATE MANAGEMENT
    const [images, setImages] = useState([]);

    // INITIALIZING FIRESTORE
    const db = getFirestore();

    // FETCH IMAGES FROM FIRESTORE
    useEffect(() => {
        const fetchImages = async () => {
          
            // SET LOADER TO TRUE
            dispatch(showLoader(true));

            // FETCH
            try {
                const imagesCollection = collection(db, "gallery");
                const imageSnapshot = await getDocs(imagesCollection);
                const imageList = imageSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // FILL THE IMAGE ARRAY WITH FETCHED IMAGES
                setImages(imageList);

                // CATCH ERRORS
            } catch (error) {
                console.error("Error fetching images: ", error);
                alert("Failed to fetch images.");

                // SET LOADER TO FALSE
            } finally {
                dispatch(showLoader(false));
            }
        };

        // FETCH IMAGES AGAIN TO GET THE LATEST UPDATE
        fetchImages();
    }, [dispatch, db]);

    // HANDLE CLOSE GALLERY
    const HandleCloseGallery = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewGallery());
            dispatch(showLoader(false));
        }, 500);
        
    }



    return(
        <div className="gallery-grid-layout">
            <div className="picture-gallery-grid">

                <h2><IoIosArrowBack className="back-arrow" onClick={HandleCloseGallery}/>Gallery</h2>

                {/* GALLERY */}
                <div className= "gallery-grid">

                    {images.map((image, index) => ( 
                    <div className="gallery-card" key={index}>
                        <img src={image.url} alt={`Gallery ${index}`} />
                    </div>
                ))}

                </div>
            </div>
        </div>
    )
}

export default Gallery;