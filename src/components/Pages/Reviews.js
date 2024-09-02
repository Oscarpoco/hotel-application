import React from "react";
import '../Styling/Reviews.css';
import { useDispatch } from "react-redux";
import { viewReviews, showLoader } from "../../redux/actions/UserInterface";

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { MdDoneOutline } from "react-icons/md";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";

function Reviews(){

    const dispatch = useDispatch();

    // HANDLES CLOSING REWIEW
    const handleClose = () => {
        dispatch(showLoader(true));

        setTimeout (()=> {
            dispatch(viewReviews());
            dispatch(showLoader(false));
        }, 3000);
        }


    return(
        <div className="reviews-overlay">
            <div className="reviews-content">
                <h2><IoIosArrowBack className="back-arrow" onClick={handleClose}/>Rewiews</h2>
                <div className="review-header">

                    {/* PICTURE */}
                    <div className="review-header-picture">
                        <img src="reviews.jpeg" alt="cover"></img>
                    </div>
                    {/* ENDS */}

                    {/* STEPS */}
                    <div className="review-header-steps">
                        <div className="review-header-step">
                            {/* first */}
                            <div className="first-step">
                                <MdDoneOutline className="review-icon"/>
                            </div>
                            <h2>It starts with a booking</h2>
                            <p>
                                The only way to leave a review is first 
                                make a booking. That's how we know our 
                                reviews come from real guests who have 
                                stayed at the property
                            </p>
                        </div>

                            {/* second */}
                        <div className="review-header-step">
                            <div className="second-step">
                                <BsFillHouseCheckFill className="review-icon"/>
                            </div>
                            <h2>Follow by a trip</h2>
                            <p>
                                When guests stay at the property they 
                                check out how quiet the room is, how 
                                friendly the staff are and more.
                            </p>
                        </div>

                        {/* third */}
                        <div className="review-header-step">
                            <div className="third-step">
                                <RiTodoLine className="review-icon"/>
                            </div>
                            <h2>Write review</h2>
                            <p>
                                After their trip, guests tell us about 
                                their stay. We check for naughty words
                                and verfiy the authenticity of all
                                guests reviews before adding them to our site.
                            </p>
                        </div>
                    </div>
                    {/* ENDS */}
                </div>

                {/* REVIEWS SECTION */}
                <div className="reviews">
                    <h2>Recent reviews</h2>
                    <div className="reviews-gallery">
                        {/* REVIEWS CARDS */}
                        <div className="reviews-card">
                            <div className="reviews-card-image">
                                <img src="room.jpeg" alt="review"></img>
                            </div>
                            <div className="reviews-card-review">
                                <p>Great place to stay, very clean and comfortable</p>
                            </div>
                            <div className="reviews-card-user">
                                <p>John Doe, South Africa</p>
                            </div>
                        </div>
                        <div className="reviews-card">
                            <div className="reviews-card-image">
                                <img src="room.jpeg" alt="review"></img>
                            </div>
                            <div className="reviews-card-review">
                                <p>Great place to stay, very clean and comfortable</p>
                            </div>
                            <div className="reviews-card-user">
                                <p>John Doe, South Africa</p>
                            </div>
                        </div>
                        <div className="reviews-card">
                            <div className="reviews-card-image">
                                <img src="room.jpeg" alt="review"></img>
                            </div>
                            <div className="reviews-card-review">
                                <p>Great place to stay, very clean and comfortable</p>
                            </div>
                            <div className="reviews-card-user">
                                <p>John Doe, South Africa</p>
                            </div>
                        </div>
                        <div className="reviews-card">
                            <div className="reviews-card-image">
                                <img src="room.jpeg" alt="review"></img>
                            </div>
                            <div className="reviews-card-review">
                                <p>Great place to stay, very clean and comfortable</p>
                            </div>
                            <div className="reviews-card-user">
                                <p>John Doe, South Africa</p>
                            </div>
                        </div>
                        <div className="reviews-card">
                            <div className="reviews-card-image">
                                <img src="room.jpeg" alt="review"></img>
                            </div>
                            <div className="reviews-card-review">
                                <p>Great place to stay, very clean and comfortable</p>
                            </div>
                            <div className="reviews-card-user">
                                <p>John Doe, South Africa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews;