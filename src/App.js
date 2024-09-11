import './App.css';
import { useSelector } from 'react-redux';
import React, { useRef } from 'react';

// 
import Footer from './components/Pages/Footer';
import HandleAuthentication from './components/Pages/HandleAuthentication';
import Navigation from './components/Pages/Navigation';
import RoomDetails from './components/Pages/RoomDetails';
import Rooms from './components/Pages/Rooms';
import UpdateUserDetails from './components/Pages/UpdateUserDetails';
import Reviews from './components/Pages/Reviews';
import Maps from './components/Pages/Maps';
import Gallery from './components/Pages/Gallery';
import Loader from './components/Pages/Loader';

function App() {

  const footerRef = useRef(null);

  const isViewRoomDetailsOpen = useSelector((state) => state.userInterface.isViewRoomDetailsOpen);
  const isUpdateOpen = useSelector((state) => state.userInterface.isUpdateOpen);
  const isReviewOpen = useSelector((state) => state.userInterface.isReviewOpen);
  const isMapOpen = useSelector((state) => state.userInterface.isMapOpen);
  const isGalleryOpen = useSelector((state) => state.userInterface.isGalleryOpen);
  const isLoading = useSelector((state) => state.userInterface.isLoading);


  // HANDLE SCROLL TO FOOTER
  const handleScroll = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">

      {/* NAVIGATION */}
      <nav>
        <Navigation handleScroll= {handleScroll}/>
      </nav>
      {/* ENDS */}

      {/* MAIN */}
      <main>
        <Rooms />
      </main>
      {/* MAIN */}

      {/* FOOTER */}
      <footer ref={footerRef}>
        <Footer />
      </footer>
      {/* FOOTER ENDS */}

      {/* POPUPS */}

      {/* SIGN IN AND UP */}
      <HandleAuthentication />

      {/* ROOM DETAILS */}
      {isViewRoomDetailsOpen && (<RoomDetails />)}

      {/* OPEN UPDATE USER DETAILS */}
      {isUpdateOpen && (<UpdateUserDetails />)}

      {/* OPEN REVIEWS */}
      {isReviewOpen && (<Reviews />)}

      {/* MAPS */}
      {isMapOpen && (<Maps />)}

      {/* GALLERY */}
      {isGalleryOpen && (<Gallery />)}

      {/* LOADER */}
      {/* {isLoading && (<Loader />)} */}

      
    </div>
  );
}

export default App;
