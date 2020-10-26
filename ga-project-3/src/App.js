import './App.css';
import React from 'react';
import Header from './components/Header';
import MapShow from './components/MapShow';
import { Route } from 'react-router-dom';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Route exact path="/" >
          <Header />
          <MapShow />
      </Route>
      <Route path="/about">
        <Header/>
        <About/> 
      </Route> 
      
      
    </div>
  );
}

export default App;
