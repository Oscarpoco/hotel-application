
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
                        <div className="nav-bar-footer" onClick={handleGalleryClick}>
                            <p>Gallery</p>
                        </div>

                            {/* reviews */}
                        <div className="nav-bar-footer" onClick={handleReviewClick}>
                            <p> Reviews</p>
                        </div>
                            
                            {/* maps */}
                        <div className="nav-bar-footer" onClick={handleOpenMapsClick}>
                            <p> Maps</p>
                        </div>

                </div>
                {/* ENDS */}

                {/* SOCIAL MEDIA */}

                <div className="footer-social">

                    <div className="footer-social-media">
                        <span className="tooltip" style={{background: "#1877F2"}}>Facebook</span>
                        <GrFacebookOption className="footer-icons" style={{color: "#1877F2"}}/>
                    </div>

                    <div className="footer-social-media">
                        <span className="tooltip" style={{background: "#1DA1F2"}}>Twitter</span>
                        <FaTwitter className="footer-icons" style={{color: "#1DA1F2"}}/>
                    </div>
                    <div className="footer-social-media">
                        <span className="tooltip" style={{background: "#0077B5"}}>LinkedIn</span>
                        <BiLogoLinkedin className="footer-icons" style={{color: "#0077B5"}}/>
                    </div>
                    <div className="footer-social-media">
                        <span className="tooltip" style={{background: "#DD2A7B"}}>Instagram</span>
                        <RiInstagramFill className="footer-icons" style={{color: "#DD2A7B"}}/>
                    </div>
                    <div className="footer-social-media">
                        <span className="tooltip" style={{background: "#25D366"}}>WhatsApp</span>
                        <IoLogoWhatsapp className="footer-icons" style={{color: "#25D366"}}/>
                    </div>
                </div>
            </div>

            <div className="copyright">
            <p>&copy; 2024 Rest Hotely. All rights reserved.</p>
            <p>
                Rest Hotely is committed to protecting your privacy and ensuring a secure and transparent experience on our platform.
                By using our services, you agree to all our <span style={{color: '#1DA1F2', cursor: 'pointer'}}>Privacy & Policy</span> and <span style={{color: '#1DA1F2', cursor: 'pointer'}}>Terms & Conditions</span>
             </p>
            </div>
        </div>
    )
}

export default Footer;