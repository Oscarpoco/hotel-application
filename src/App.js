import './App.css';
import { useSelector } from 'react-redux';
import Footer from './components/Pages/Footer';
import HandleAuthentication from './components/Pages/HandleAuthentication';
import Navigation from './components/Pages/Navigation';
import RoomDetails from './components/Pages/RoomDetails';
import Rooms from './components/Pages/Rooms';

function App() {

  const isViewRoomDetailsOpen = useSelector((state) => state.userInterface.isViewRoomDetailsOpen);
  return (
    <div className="App">

      {/* NAVIGATION */}
      <nav>
        <Navigation />
      </nav>
      {/* ENDS */}

      {/* MAIN */}
      <main>
        <Rooms />
      </main>
      {/* MAIN */}

      {/* FOOTER */}
      <footer>
        <Footer />
      </footer>
      {/* FOOTER ENDS */}

      {/* POPUPS */}
      <HandleAuthentication />

      {isViewRoomDetailsOpen && (<RoomDetails />)}
    </div>
  );
}

export default App;
