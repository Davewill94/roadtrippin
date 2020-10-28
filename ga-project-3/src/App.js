import './App.css';
import React from 'react';
import Header from './components/Header';
// import MapShow from './components/MapShow';
import HomePage from './components/HomePage';

import TripMap from './components/TripMap';

import { Route } from 'react-router-dom';
import About from './components/About';
import Contacts from './components/Contacts';



function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path={["/home","/"]} >
          <HomePage />
      </Route>

      <Route path="/newTrip" >
          {/* <SpotifyApp /> */}
          <TripMap />
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
