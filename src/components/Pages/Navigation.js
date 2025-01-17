import React from "react";
import '../Styling/Navigation.css';
import { useDispatch, useSelector } from "react-redux";
import { handleOnSignIn, openUpdate, viewReviews, viewMaps, viewGallery, showLoader, setHamburger } from "../../redux/actions/UserInterface";

//ICONS
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";


function Navigation( {handleScroll} ){

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=> state.authentication.isAuthenticated);
    const isHumburger = useSelector((state)=> state.userInterface.isHumburger);


     // Function to handle the button click
     const handleSignInClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(handleOnSignIn());
            dispatch(showLoader(false));
        }, 2000);
        
    };

    // HANDLES OPENING UPDATE PAGE
    const handleUpdateClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(openUpdate());
            dispatch(showLoader(false));
        }, 2000);
        
    }

    // HANDLES OPENING REVIEW
    const handleReviewClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewReviews());
            dispatch(showLoader(false));
        }, 2000);
        
        }

    // HANDLE VIEWING MAPS
    const handleOpenMapsClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewMaps());
            dispatch(showLoader(false));
        }, 2000);
        
    }

    // VIEW GALLERY
    const handleGalleryClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewGallery());
            dispatch(showLoader(false));
        }, 2000);
    }

    // VIEW GALLERY
    const handleToggleHumburger = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(setHamburger());
            dispatch(showLoader(false));
        }, 500);
    }

    return(

        // PARENT COMPONENT
        <div className="Navigation-layout">

            <img src="banner.jpeg" alt="Hotel Banner" />
            <h1 className="banner-text">
                Welcome to Rest Hotely, your home away from home! Whether you're here for business or leisure, we offer a perfect blend of comfort and luxury to make your stay memorable.
            </h1>

            <div className="Navigation">

                {/* MENU NAVIGATION */}
                <div className="menu">

                    {/* MENU LOGO */}
                    <div className="menu-logo">
                        <div className="logo-abbreviation"><h3 style={{color: 'rgba(0, 0, 0, .7)'}}>R<span>H</span></h3></div>
                        <div><h3>Rest Hotel<span>y</span></h3></div>
                    </div>
                    {/* MENU LOGO ENDS */}

                    {/* NAV LIST */}

                    <div className="navigation-bar">

                        {/* Gallery */}
                        <div className="nav-bar" onClick={handleGalleryClick}>
                            <p>Gallery</p>
                        </div>

                            {/* reviews */}
                        <div className="nav-bar" onClick={handleReviewClick}>
                            <p>Reviews</p>
                        </div>
                            
                            {/* maps */}
                        <div className="nav-bar" onClick={handleOpenMapsClick}>
                            <p>Maps</p>
                        </div>

                            {/* contact us */}
                        <div className="nav-bar" onClick={handleScroll}>
                            <p>Contact</p>
                        </div>

                    </div>

                    {/* NAV LIST ENDS */}

                    {/* MENU ACCOUNT */}
                    <div className="menu-account">
                        <div className="slogan"><p>Rest Hotel<span>y your home</span></p></div>

                        {isAuthenticated ? 
                        <div className="user-wrapper">
                            <button className="user-wrapper-button" style={{background: 'white'}}
                            onClick={handleUpdateClick}
                            >
                                <FaRegCircleUser className="user-icon" style={{color: 'rgba(0, 0, 0, .7)'}}/>
                            </button>
                        </div>

                        :
                        
                        <div className="user-wrapper">
                            <button onClick={handleSignInClick} style={{padding: '.7em 1em'}}>
                            Sign In
                            </button>
                        </div>
                        }

                        <div className="humburger" onClick={handleToggleHumburger}>
                            {isHumburger ? <RiCloseFill className="humburger-icon"/> : <IoMdMenu className="humburger-icon"/>}
                        </div>

                    </div>
                    {/* MENU ACCOUNT */}

                </div>
                {/* MENU ENDS */}  

            </div>

            {/* HUMBURGER POPUP */}
            {isHumburger && (
                <div className="humburger-layout">
                    <div className="humburger-menu">

                        {/* NAVIGATION */}
                        <div className="nav-bar" onClick={handleGalleryClick}>
                            <p>Gallery</p>
                        </div>

                            {/* reviews */}
                        <div className="nav-bar" onClick={handleReviewClick}>
                            <p>Reviews</p>
                        </div>
                            
                            {/* maps */}
                        <div className="nav-bar" onClick={handleOpenMapsClick}>
                            <p>Maps</p>
                        </div>

                            {/* contact us */}
                        <div className="nav-bar" onClick={handleScroll}>
                            <p>Contact</p>
                        </div>
                        {/* NAVIGATION ENDS */}
                    </div>
                </div>
            )}
        </div>
        // PARENT COMPONENT ENDS
    )
}

export default Navigation;