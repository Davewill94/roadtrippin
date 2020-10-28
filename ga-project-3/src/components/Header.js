import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';




const Header = () => {
    return (
        <div id="header">
            <h1>RoadTrippin</h1>
            {/* <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/newTrip">New Trip</Link>
                <Link to="/contacts">Contacts</Link>
            </nav> */}
            <nav>
                <NavLink to='/home' activeClassName="active">Home</NavLink>
                <NavLink to='/about' activeClassName="active">About</NavLink>
                <NavLink to='/newTrip' activeClassName="active">New Trip</NavLink>
                <NavLink to='/contacts' activeClassName="active">Contacts</NavLink>
            </nav>
        </div>
    )
}

export default Header;