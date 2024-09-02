
import React from "react";
import '../Styling/Footer.css';
import { useDispatch, useSelector } from "react-redux";
import { handleOnSignIn, openUpdate, viewReviews, viewMaps, viewGallery } from "../../redux/actions/UserInterface";

// ICONS
import { GrFacebookOption } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { BiLogoLinkedin } from "react-icons/bi";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer(){
    const dispatch = useDispatch();


    // HANDLES OPENING REVIEW
    const handleReviewClick = () => {
        dispatch(viewReviews());
        }

    // HANDLE VIEWING MAPS
    const handleOpenMapsClick = () => {
        dispatch(viewMaps());
    }

    // VIEW GALLERY
    const handleGalleryClick = () => {
        dispatch(viewGallery());
        console.log('clicked')
    }

    return(

        <div className="Footer">
            <div className="Footer-content">

                {/* FOOTER LOGO */}
                <div className="footer-logo">
                    <div className="footer-logo-abbreviation">
                        <h1>R<span>H</span></h1>
                    </div>
                    <div className="footer-logo-name">
                        <h2>Rest hotel<span>y</span></h2>
                    </div>
                </div>
                {/* FOOTER SECTION ENDS */}

                    {/* FOOTER NAVIGATION */}
                    <div className="footer-navigation-bar">

                        {/* Gallery */}
                        <div className="nav-bar" onClick={handleGalleryClick}>
                            <p>Gallery</p>
                        </div>

                            {/* reviews */}
                        <div className="nav-bar" onClick={handleReviewClick}>
                            <p> Reviews</p>
                        </div>
                            
                            {/* maps */}
                        <div className="nav-bar" onClick={handleOpenMapsClick}>
                            <p> Maps</p>
                        </div>

                            {/* contact us */}
                        <div className="nav-bar">
                            <p> Contact Us</p>
                        </div>

                        </div>
                    {/* ENDS */}

                    {/* SOCIAL MEDIA */}

                <div className="footer-social">
                    <div className="footer-social-media">
                    <GrFacebookOption className="footer-icons"/>
                    </div>
                    <div className="footer-social-media">
                    <FaTwitter className="footer-icons"/>
                    </div>
                    <div className="footer-social-media">
                    <BiLogoLinkedin className="footer-icons"/>
                    </div>
                    <div className="footer-social-media">
                    <RiInstagramFill className="footer-icons"/>
                    </div>
                    <div className="footer-social-media">
                    <IoLogoWhatsapp className="footer-icons"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;