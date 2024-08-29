import './App.css';
import HandleAuthentication from './components/Pages/HandleAuthentication';
import Navigation from './components/Pages/Navigation';
import Rooms from './components/Pages/Rooms';

function App() {
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

      </footer>
      {/* FOOTER ENDS */}

      {/* POPUPS */}
      <HandleAuthentication />
    </div>
  );
}

export default App;
