import React from "react";
import '../Styling/Navigation.css';
import { useDispatch, useSelector } from "react-redux";
import { handleOnSignIn, openUpdate, viewReviews, viewMaps, viewGallery, showLoader } from "../../redux/actions/UserInterface";

// OTHER IMPORTS INCLUDING ICONS
import { PiWarehouseLight } from "react-icons/pi";
import { MdOutlineReviews } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";


function Navigation( {handleScroll} ){

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=> state.authentication.isAuthenticated);


     // Function to handle the button click
     const handleSignInClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(handleOnSignIn());
            dispatch(showLoader(false));
        }, 3000);
        
    };

    // HANDLES OPENING UPDATE PAGE
    const handleUpdateClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(openUpdate());
            dispatch(showLoader(false));
        }, 3000);
        
    }

    // HANDLES OPENING REVIEW
    const handleReviewClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewReviews());
            dispatch(showLoader(false));
        }, 3000);
        
        }

    // HANDLE VIEWING MAPS
    const handleOpenMapsClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewMaps());
            dispatch(showLoader(false));
        }, 3000);
        
    }

    // VIEW GALLERY
    const handleGalleryClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewGallery());
            dispatch(showLoader(false));
        }, 3000);
    }

    return(

        // PARENT COMPONENT
        <div className="Navigation-layout">

            <img src="banner.jpeg" alt="Hotel Banner" />
            <h1 className="banner-text">Welcome to Rest Hotely, your home away from home! Whether you're here for business or leisure, we offer a perfect blend of comfort and luxury to make your stay memorable.</h1>

            <div className="Navigation">

                {/* MENU NAVIGATION */}
                <div className="menu">

                    {/* MENU LOGO */}
                    <div className="menu-logo">
                        <div className="logo-abbreviation"><h2>R<span>H</span></h2></div>
                        <div><h3>Rest Hotel<span>y</span></h3></div>
                    </div>
                    {/* MENU LOGO ENDS */}

                    {/* NAV LIST */}

                    <div className="navigation-bar">

                        {/* Gallery */}
                        <div className="nav-bar" onClick={handleGalleryClick}>
                            <p><PiWarehouseLight className="menu-icons"/> Gallery</p>
                        </div>

                            {/* reviews */}
                        <div className="nav-bar" onClick={handleReviewClick}>
                            <p><MdOutlineReviews className="menu-icons"/> Reviews</p>
                        </div>
                            
                            {/* maps */}
                        <div className="nav-bar" onClick={handleOpenMapsClick}>
                            <p><SiGooglemaps className="menu-icons"/> Maps</p>
                        </div>

                            {/* contact us */}
                        <div className="nav-bar" onClick={handleScroll}>
                            <p> <BiSolidContact className="menu-icons"/>Contact</p>
                        </div>

                    </div>

                    {/* NAV LIST ENDS */}

                    {/* MENU ACCOUNT */}
                    <div className="menu-account">
                        <div><p>Rest Hotel<span>y your home</span></p></div>

                        {isAuthenticated ? 
                        <div className="user-wrapper">
                            <button style={{background: 'white', border: 'none', padding: '.2em', height: '40px', width: '40px', borderRadius: '50%'}}
                            onClick={handleUpdateClick}
                            >
                                <FaRegCircleUser className="user-icon" style={{color: 'black'}}/>
                            </button>
                        </div>

                        :
                        
                        <div style={{borderRadius: '50px', border: '1px solid rgba(0, 0, 0, .2)', padding: '.3em', background: '#1877F2', boxShadow: '0 0 10px rgba(0, 0, 0, .5)'}}>
                            <button onClick={handleSignInClick}>
                            Sign In
                            </button>
                        </div>
                        }

                    </div>
                    {/* MENU ACCOUNT */}

                </div>
                {/* MENU ENDS */}  

            </div>
        </div>
        // PARENT COMPONENT ENDS
    )
}

export default Navigation;