// About.jsx
import React from 'react';
import '../Styling/About.css';

const About = () => {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__content">
          <div className="about__text">
            <h1 className="about__title">About Us</h1>
            <p className="about__description">
              Welcome to Rest Hotely, founded in 2020 by Gamefuxion, a group of passionate 
              individuals who envisioned making life simpler for tourists. Nestled in the 
              heart of Johannesburg, we provide an ideal blend of comfort and elegance, 
              offering a serene retreat for both business and leisure travelers.
            </p>
            <p className="about__description">
              At Rest Hotely, we take pride in our modern rooms, exceptional dining 
              experiences, and a dedicated team ready to cater to your every need. 
              Whether it's a brief stay or a longer getaway, we ensure your experience 
              is nothing short of exceptional with our luxurious amenities and 
              personalized service.
            </p>
            <p className="about__description">
              Discover a place where your comfort comes first, and every moment is 
              designed to make your stay unforgettable.
            </p>
          </div>
          <div className="about__image">
            <img src="about.jpeg" alt="About Rest Hotely" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;