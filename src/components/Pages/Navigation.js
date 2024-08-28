import React from "react";
import '../Styling/Navigation.css';
import { useDispatch } from "react-redux";
import { handleOnSignIn } from "../../redux/actions/UserInterface";

// OTHER IMPORTS INCLUDING ICONS
import { CiSearch } from "react-icons/ci";


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
                    <div></div>
                    <div><h3>Rest Hotel<span>y</span></h3></div>
                </div>
                {/* MENU LOGO ENDS */}

                {/* MENU NAVIGATION */}
                <div className="menu-navigation">
                    <div style={{fontWeight: 'bold'}}>Stay</div>
                    <div>Experiences / Reviews</div>
                </div>
                {/* MENU NAVIGATION ENDS */}

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

        </div>
        // PARENT COMPONENT ENDS
    )
}

export default Navigation;