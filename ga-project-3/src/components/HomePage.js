import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div id="homepage">
            <div>
                <nav>
                    <p>Plan your next trip now!</p>
                    <Link to="/newTrip">New Trip</Link>
                </nav>
            </div>
            <div>
                <img id="homemap" src="/HomePage.png" />
            </div>

        </div>
    )
}

export default HomePage;