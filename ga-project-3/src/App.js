import './App.css';
import React from 'react';
import Header from './components/Header';
import MapShow from './components/MapShow';
import TripMap from './components/TripMap';
import Destinations from './components/Destinations';


function App() {
  return (
    <div className="App">
      <Header />
      {/* <MapShow /> */}
      <TripMap />
      <Destinations />
    </div>
  );
}

export default App;
