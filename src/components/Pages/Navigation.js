import React from "react";
import '../Styling/Navigation.css';
import { useDispatch, useSelector } from "react-redux";
import { handleOnSignIn, openUpdate, viewReviews, viewMaps, viewGallery } from "../../redux/actions/UserInterface";

// OTHER IMPORTS INCLUDING ICONS
import { CiSearch } from "react-icons/ci";
import { PiWarehouseLight } from "react-icons/pi";
import { MdOutlineReviews } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { ImMenu } from "react-icons/im";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";


function Navigation(){

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=> state.authentication.isAuthenticated)

     // Function to handle the button click
     const handleSignInClick = () => {
        dispatch(handleOnSignIn());
    };

    // HANDLES OPENING UPDATE PAGE
    const handleUpdateClick = () => {
        dispatch(openUpdate());
    }

    // HANDLES OPENING REVIEW
    const handleReviewClick = () => {
        dispatch(viewReviews());
        }

    // HANDLE VIEWING MAPS
    const handleOpenMapsClick = () => {
        dispatch(viewMaps());
    }

    // VIEW GALLERY
    const handleGalleryClick =()=>{
        dispatch(viewGallery())
    }

    return(

        // PARENT COMPONENT
        <div className="Navigation">

            {/* MENU NAVIGATION */}
            <div className="menu">

                {/* MENU LOGO */}
                <div className="menu-logo">
                    <div className="logo-abbreviation"><h2>R<span>H</span></h2></div>
                    <div><h3>Rest Hotel<span>y</span></h3></div>
                </div>
                {/* MENU LOGO ENDS */}

                {/* MENU ACCOUNT */}
                <div className="menu-account">
                    <div><p>Rest Hotel<span>y your home</span></p></div>

                    {!isAuthenticated ? 
                    <div style={{borderRadius: '50px', border: '2px solid black', padding: 0, background: 'white'}}>
                        <button style={{background: 'white', border: 'none', padding: '.2em .4em'}}
                        onClick={handleUpdateClick}
                        >
                        <ImMenu className="user-icon"/>
                        <div className="user-radius">
                            <FaRegCircleUser className="user-icon" style={{color: 'white'}}/>
                        </div>
                        </button>
                    </div>

                    :
                    
                    <div style={{borderRadius: '50px', border: '2px solid black', padding: '.3em', background: 'white'}}>
                        <button onClick={handleSignInClick}>
                        Sign In
                        </button>
                    </div>
                    }

                </div>
                {/* MENU ACCOUNT */}

            </div>
            {/* MENU ENDS */}

            {/* SEARCH NAVIGATION */}
            <div className="search">
                <input type="text" placeholder="Where ?"></input>
                <div className="search-icon">
                    <CiSearch className="search-icon-image"/>
                </div>
            </div>
            {/* SEARCH ENDS */}

            {/* NAVIGATION BAR */}

            <div className="navigation-bar">

                {/* accomodation */}
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
                <div className="nav-bar">
                    <p> <BiSolidContact className="menu-icons"/>Contact Us</p>
                </div>

            </div>
            

        </div>
        // PARENT COMPONENT ENDS
    )
}

export default Navigation;