import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div id="homepage">
            <div id="start">
                <nav className="start">
                    <Link to="/newTrip">Start a Trip</Link>
                </nav>
            </div>
        </div>
    )
}

export default HomePage;