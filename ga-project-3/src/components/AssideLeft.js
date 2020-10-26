import React, {Component} from 'react';
import L, { routing } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


class AsideLeft extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instructions: props.routeInfo
        }
    }
    // let instructions = [];
    // console.log(props.routeInfo)
    // if(props.routeInfo != null) {
    //     console.log(props.routeInfo._selectedRoute.instructions)
    //     instructions = props.routeInfo._selectedRoute.instructions;
    // }
    
    render () {
        console.log(this.state.instructions);
        

        return (
            <div>
                <div className="previous-trips">
                    {this.props.previousTrips.map((trip, id) => {
                        return (
                            <div>
                                <h3>{trip.name}</h3>
                                <p>From: {trip.from}</p>
                                <p>To: {trip.to}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="trip-directions" >
                    <p>p</p>
                </div>
                
            </div>
        )
    }

}

export default AsideLeft;