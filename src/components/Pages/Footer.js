
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal, faGoogle, faBehance, faCcVisa, faApplePay, faStripe} from "@fortawesome/free-brands-svg-icons";

function Footer({handleOpenPrivacy}){
    const dispatch = useDispatch();

    const currentYear = new Date().getFullYear();


    // HANDLES OPENING REVIEW
    const handleReviewClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewReviews());
            dispatch(showLoader(false));
        }, 500);
        
        }

    // HANDLE VIEWING MAPS
    const handleOpenMapsClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewMaps());
            dispatch(showLoader(false));
        }, 500);
        
    }

    // VIEW GALLERY
    const handleGalleryClick = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewGallery());
            dispatch(showLoader(false));
        }, 500);
    }

    const sponsors = [
        faGoogle,
        faCcPaypal,
        faBehance,
        faCcVisa,
        faApplePay,
        faStripe,
    ];

    return(

        <div className="Footer">
            <div className="Footer-content">

                 {/* SPONSORS/PARTNERS */}
                 <div className="sponsers">
                    <div className="sponsor-container">
                        {sponsors.map((icon, index) => (
                            <FontAwesomeIcon icon={icon} className="sponser-icon" key={index} />
                        ))}
                        {/* Duplicate for seamless effect */}
                        {sponsors.map((icon, index) => (
                            <FontAwesomeIcon icon={icon} className="sponser-icon" key={index + sponsors.length} />
                        ))}
                    </div>
                </div>
                {/* ENDS */}

                {/* FOOTER LOGO */}
                <div className="footer-logo-content">
                    <div className="footer-logo">
                        <div className="footer-logo-abbreviation">
                            <h1>R<span>H</span></h1>
                        </div>
                        <div className="footer-logo-name">
                            <h2>Rest hotel<span>y</span></h2>
                        </div>

                    </div>

                    <div className="footer-maps">
                        <div className="footer-map-wrapper">
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
                {/* FOOTER SECTION ENDS */}

                {/* FOOTER NAVIGATION */}
                <div className="footer-navigation-bar">

                        {/* Gallery */}
                        <div className="nav-bar-footer" style={{color: 'rgba(0, 0, 0, .5)', cursor: 'unset', fontSize: '1.3em'}}>
                            <p>Quick links</p>
                        </div>

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
                            {/* privacy */}
                        <div className="nav-bar-footer" onClick={handleOpenPrivacy}>
                            <p> Privacy & Policy</p>
                        </div>
                            {/* maps */}
                        <div className="nav-bar-footer" onClick={handleOpenPrivacy}>
                            <p> Terms and Conditions</p>
                        </div>

                </div>
                {/* ENDS */}


                {/* FOOTER NAVIGATION */}
                <div className="footer-navigation-bar">

                        {/* Gallery */}
                        <div className="nav-bar-footer" style={{color: 'rgba(0, 0, 0, .5)', cursor: 'unset', fontSize: '1.3em'}}>
                            <p>Contact</p>
                        </div>

                        <div className="nav-bar-footer" style={{cursor: 'unset'}}>
                            <p className="info">Email: resthotel@accomodation.co.za</p>
                        </div>

                            {/* reviews */}
                        <div className="nav-bar-footer" style={{cursor: 'unset'}}>
                            <p className="info">info: info@resthotel.co.za</p> 
                        </div>
                            
                            {/* maps */}
                        <div className="nav-bar-footer" style={{cursor: 'unset'}}>
                            <p className="info">telephone: 011 012 0144</p>
                        </div>
                            {/* privacy */}
                        <div className="nav-bar-footer" style={{cursor: 'unset'}}>
                            <p className="info">hotline: 011 110 1212</p>
                        </div>
                            
                </div>
                {/* ENDS */}

                {/* SOCIAL MEDIA */}

                <div className="footer-social-wrapper">
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

                    <div className="footer-social-subscription">
                        <p>Subscribe to our newsletter</p>
                        <input type="email" placeholder="Enter your email"></input>
                        <button>Subscribe</button>
                    </div>

                </div>

            </div>

            <div className="copyright">
            <p>&copy; {currentYear} Rest Hotely. All rights reserved.</p>
            <p>
                Rest Hotely is committed to protecting your privacy and ensuring a secure and transparent experience on our platform.
                By using our services, you agree to all our <span style={{color: '#1DA1F2', cursor: 'pointer'}} onClick={handleOpenPrivacy}>Privacy & Policy</span> and <span style={{color: '#1DA1F2', cursor: 'pointer'}} onClick={handleOpenPrivacy}>Terms & Conditions</span>
             </p>
            </div>
        </div>
    )
}

export default Footer;