import React, {Component} from 'react';
import L, { routing } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

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
                            <div className="old-trip" key={id}>
                                <h3>{trip.name}</h3>
                                <p>From: {trip.from}</p>
                                <p>To: {trip.to}</p>
                            </div>
                        )
                    })}
                </div>
                {/* <div className="directions">
                    {props.directionsReady && 
                        props.routeInfo._selectedRoute.instructions.map((direction, id) => {
                            return (
                                <div className="leaflet-routing-alt" key={id}>
                                    <p>
                                        {direction.text} {direction.distance < 1000 ? 
                                        `${direction.distance} m` 
                                        : 
                                        `${Math.floor(direction.distance/1000)} km`}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                 */}
            </div>
        )
}

export default AsideLeft;