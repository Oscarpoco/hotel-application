
import React from "react";
import '../Styling/Gallery.css';
import { useDispatch } from "react-redux";
import { viewGallery, showLoader } from "../../redux/actions/UserInterface";

// ICONS
import { IoIosArrowBack } from "react-icons/io";

function Gallery(){

    const dispatch = useDispatch();

    // HANDLE CLOSE GALLERY
    const HandleCloseGallery = ()=> {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewGallery());
            dispatch(showLoader(false));
        }, 3000);
        
    }
    return(
        <div className="gallery-grid-layout">
            <div className="picture-gallery-grid">

                <h2><IoIosArrowBack className="back-arrow" onClick={HandleCloseGallery}/>Gallery</h2>

                {/* GALLERY */}
                <div className= "gallery-grid">
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                    <div className="gallery-card">
                        <img src="room.jpeg" alt="gallery"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery;