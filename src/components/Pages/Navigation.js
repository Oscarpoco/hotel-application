import React from "react";
import '../Styling/Navigation.css';
import { useDispatch } from "react-redux";
import { handleOnSignIn } from "../../redux/actions/UserInterface";

// OTHER IMPORTS INCLUDING ICONS
import { CiSearch } from "react-icons/ci";
import { PiWarehouseLight } from "react-icons/pi";
import { MdOutlineReviews } from "react-icons/md";


function Navigation(){

    const dispatch = useDispatch();

     // Function to handle the button click
     const handleSignInClick = () => {
        dispatch(handleOnSignIn());
    };

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
                    <div style={{borderRadius: '50px', border: '1px solid black', padding: '.3em', background: 'white'}}><button onClick={handleSignInClick}>Sign In</button></div>
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
                <div className="nav-bar">
                    <p style={{display: 'flex', gap: '.7em',justifyContent: 'center', alignItems: 'center'}}><PiWarehouseLight className="menu-icons"/> Accomodation</p>
                </div>
          

         
                <div className="nav-bar">
                    <p style={{display: 'flex', justifyContent: 'center' , gap: '.7em', alignItems: 'center'}}><MdOutlineReviews className="menu-icons"/> Reviews</p>
                </div>
        

      
                <div className="nav-bar">
                    <p>Home</p>
                </div>
     

      
                <div className="nav-bar">
                    <p>Home</p>
                </div>

            </div>
            

        </div>
        // PARENT COMPONENT ENDS
    )
}

export default Navigation;