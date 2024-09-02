
import React from "react";
import '../Styling/Footer.css';
import { useDispatch } from "react-redux";
import { viewReviews, viewMaps, viewGallery, showLoader } from "../../redux/actions/UserInterface";

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

            <div className="copyright">
            <p>&copy; 2024 Rest Hotely. All rights reserved.</p>
            <p>
                Rest Hotely is committed to protecting your privacy and ensuring a secure and transparent experience on our platform.
                By using our services, you agree to our .
             </p>
            </div>
        </div>
    )
}

export default Footer;