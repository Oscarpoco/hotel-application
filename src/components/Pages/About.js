
import React from "react";
import '../Styling/About.css';

function About(){
    

    return(

        <div className="About">
            <div className="About-content">
                <div className="About-left">
                    <h1>About Us</h1>
                    <p>Welcome to Rest Hotely, founded in 2020 by Gamefuxion, a group of passionate individuals who envisioned making life simpler for tourists. Nestled in the heart of Johannesburg, we provide an ideal blend of comfort and elegance, offering a serene retreat for both business and leisure travelers.

                        At Rest Hotely, we take pride in our modern rooms, exceptional dining experiences, and a dedicated team ready to cater to your every need. Whether it's a brief stay or a longer getaway, we ensure your experience is nothing short of exceptional with our luxurious amenities and personalized service.

                        <br></br>
                        <br></br>
                        Discover a place where your comfort comes first, and every moment is designed to make your stay unforgettable.
                    </p>
                </div>
                <div className="About-right">
                    <img src="about.jpeg" alt="About Us"></img>
                </div>
            </div>
        </div>
    )
}

export default About;