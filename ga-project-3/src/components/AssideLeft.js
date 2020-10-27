import React from 'react';
import 'leaflet/dist/leaflet.css';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


function AsideLeft (props) {
  
    //    if(props.directionsReady) {
    //      console.log(props.routeInfo._selectedRoute.instructions);  
    //    } 
        

        return (
            <div className="trips">
                <div className="previous-trips">
                    {props.previousTrips.map((trip, id) => {
                        return (
                            <div className="old-trip" key={id} onClick={(e) => {props.tripSubmit(e, trip)}}>
                                <h3>{trip.name}</h3>
                                <p>From: {trip.from}</p>
                                <p>To: {trip.to}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
}

export default AsideLeft;