import './App.css';
import React from 'react';
import Header from './components/Header';
import MapShow from './components/MapShow';

import TripMap from './components/TripMap';



import { Route } from 'react-router-dom';
import About from './components/About';
import Contacts from './components/Contacts'
import SpotifyApp from './components/Spotify/SpotifyApp';


function App() {
  return (
    <div className="App">
      <Header />
      <SpotifyApp />
      

      {/* <MapShow /> */}
      {/* <TripMap /> */}

      <Route exact path="/" >
          <MapShow />
      </Route>
      <Route path="/about">
        <About/> 
      </Route> 
      <Route path="/contacts">
        <Contacts/> 
      </Route> 

    </div>
  );
}

export default App;
