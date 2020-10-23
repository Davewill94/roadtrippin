import './App.css';
import React from 'react';
import Header from './components/Header';
import MapShow from './components/MapShow';
import TripMap from './components/TripMap';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <MapShow /> */}
      <TripMap />
    </div>
  );
}

export default App;
