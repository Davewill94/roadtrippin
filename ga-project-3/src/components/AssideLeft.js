import React, {Component} from 'react';
import L, { routing } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


function AsideLeft (props) {
  
       if(props.routeInfo != null) {
         console.log(props.routeInfo._selectedRoute);  
       } 
        
       

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
                {props.routeInfo != null && 
                    <div className="trip-directions" >
                        <p>p</p>
                    </div>
                
                }
            </div>
        )
}

export default AsideLeft;