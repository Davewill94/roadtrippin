import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div id="header">
            <h1>RoadTrippin</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/newTrip">New Trip</Link>
                <Link to="/contacts">Contacts</Link>
            </nav>

        </div>
    )
}

export default Header;