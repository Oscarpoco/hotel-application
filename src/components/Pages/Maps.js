
import React from "react";
import '../Styling/Maps.css';
import { useDispatch } from "react-redux";
import { viewMaps, showLoader } from "../../redux/actions/UserInterface";

// ICONS
import { IoIosArrowBack } from "react-icons/io";

function Maps(){
    const dispatch = useDispatch();

    // HANDLES MAPS
    const handleCloseMaps = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewMaps());
            dispatch(showLoader(false));
        }, 500);
    }

    return(
        <div className="maps-layout">
            <div className="maps-content">
                <h2><IoIosArrowBack onClick={handleCloseMaps} className="back-arrow"/>Maps</h2>
                <div className="map-wrapper">
                    
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.020875944267!2d27.94762590914946!3d-26.260985866189817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9509b530835eeb%3A0x6934768909367b3a!2sCodeTribe%20Soweto!5e0!3m2!1sen!2sza!4v1725275791050!5m2!1sen!2sza" 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    title="myMap"
                    ></iframe>
            
                </div>
            </div>
        </div>
    )
}

export default Maps;


