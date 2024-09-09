import React, { useEffect, useState } from "react";
import "../Styling/Reviews.css";
import { useDispatch } from "react-redux";
import { viewReviews, showLoader } from "../../redux/actions/UserInterface";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore methods

// ICONS
import { IoIosArrowBack } from "react-icons/io";
import { MdDoneOutline } from "react-icons/md";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";
import { IoIosStar } from "react-icons/io";

function Reviews() {
  const dispatch = useDispatch();
  const [accommodationsWithReviews, setAccommodationsWithReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const firestore = getFirestore();

  // HANDLES CLOSING REVIEW
  const handleClose = () => {
    dispatch(showLoader(true));

    setTimeout(() => {
      dispatch(viewReviews());
      dispatch(showLoader(false));
    }, 3000);
  };

  // Fetch accommodations with reviews
  useEffect(() => {
    const fetchAccommodationsWithReviews = async () => {
      setLoading(true);

      try {
        // Query to fetch accommodations where reviews field exists and is not empty
        const accommodationsQuery = query(
          collection(firestore, "accommodations"),
          where("reviews", "!=", []) // Fetch accommodations that have reviews
        );

        const querySnapshot = await getDocs(accommodationsQuery);

        const fetchedAccommodations = [];
        
        querySnapshot.forEach((doc) => {
          const accommodationData = doc.data();
          // If there are reviews, add them to the array
          if (accommodationData.reviews && accommodationData.reviews.length > 0) {
            accommodationData.reviews.forEach((review) => {
              fetchedAccommodations.push({
                ...review,
                accommodationName: accommodationData.title, 
                location: accommodationData.location, 
                image: accommodationData.images[0],
              });
            });
          }
        });

        setAccommodationsWithReviews(fetchedAccommodations); // Set state with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accommodations with reviews:", error);
        setLoading(false);
      }
    };

    fetchAccommodationsWithReviews();
  }, [firestore]);

  return (
    <div className="reviews-overlay">
      <div className="reviews-content">
        <h2>
          <IoIosArrowBack className="back-arrow" onClick={handleClose} />
          Reviews
        </h2>
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
                <MdDoneOutline className="review-icon" />
              </div>
              <h2>It starts with a booking</h2>
              <p>
                The only way to leave a review is first make a booking. That's
                how we know our reviews come from real guests who have stayed at
                the property
              </p>
            </div>

            {/* second */}
            <div className="review-header-step">
              <div className="second-step">
                <BsFillHouseCheckFill className="review-icon" />
              </div>
              <h2>Follow by a trip</h2>
              <p>
                When guests stay at the property they check out how quiet the
                room is, how friendly the staff are and more.
              </p>
            </div>

            {/* third */}
            <div className="review-header-step">
              <div className="third-step">
                <RiTodoLine className="review-icon" />
              </div>
              <h2>Write review</h2>
              <p>
                After their trip, guests tell us about their stay. We check for
                naughty words and verify the authenticity of all guest reviews
                before adding them to our site.
              </p>
            </div>
          </div>
          {/* ENDS */}
        </div>

        {/* REVIEWS SECTION */}
        <div className="reviews">
          <h2>Recent reviews</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="reviews-gallery">
              {/* REVIEWS CARDS */}
              {accommodationsWithReviews.map((review, index) => (
                <div className="reviews-card" key={index}>
                  <div className="reviews-card-image">
                    <img src={review.image} alt={review.accommodationName} />
                  </div>
                  <div className="reviews-card-review">
                    <p>{review.review}</p>
                  </div>
                  <div className="reviews-card-user">
                    <p>
                        <strong>{review.fullName}</strong>
                      
                        <br></br>
                        {review.location}
                    </p>

                    <div className="star-box">
                        <p>{review.rating}</p>
                        <IoIosStar className="star"/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
