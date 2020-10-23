import React, { Component } from 'react'
import L, { routing } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import axios from 'axios';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import Destinations from './Destinations';


const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;


  class TripMap extends Component {
      constructor(props) {
          super(props)

          this.state = {
            waypoints: [
                  {lat: 41.523529, lng: -90.577042},
                  {lat: 41.878113, lng: -87.629799}
            ],
            routingControl: null
          }
      }
    
    tripSubmit = (e, locations) => {
        e.preventDefault();
        this.getLatLng(locations)
    }
// Dqwo8TsEVnyjgzGJZ8ae6Dl1dpm7W2Ft
// http://www.mapquestapi.com/geocoding/v1/batch?key=Dqwo8TsEVnyjgzGJZ8ae6Dl1dpm7W2Ft&location=Denver,CO&location=Boulder,CO

    getLatLng = async (locations) => {
        const resp = await axios.get(
            `http://www.mapquestapi.com/geocoding/v1/batch?key=Dqwo8TsEVnyjgzGJZ8ae6Dl1dpm7W2Ft&location=${locations.from}&location=${locations.to}`
        )
        let waypoints = [];
        waypoints.push(resp.data.results[0].locations[0].latLng);
        waypoints.push(resp.data.results[1].locations[0].latLng);
        this.setState({
            waypoints
        });

        this.genRoute();
    }
    
    genRoute = () => {
        this.removeRoute();
        
        let routingControl = L.Routing.control({
            waypoints: [
                L.latLng(this.state.waypoints[0].lat, this.state.waypoints[0].lng),
                L.latLng(this.state.waypoints[1].lat, this.state.waypoints[1].lng)
            ],
        }).addTo(this.map);
        this.setState({
            routingControl
        })
    }

    removeRoute = () => {
        if(this.state.routingControl != null ) {
            this.map.removeControl(this.state.routingControl)
        }
    }

    componentDidMount() {
      this.map = L.map('map', {
        center: [42,-90], 
        zoom: 6,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        detectRetina: true,
        maxZoom: 15, 
        maxNativeZoom: 17,
      }).addTo(this.map);

      this.genRoute();
    }

    render() {
      return (
          <div>
            <Wrapper width="600px" height="200px" id="map" />
            <Destinations tripSubmit={this.tripSubmit}/>
          </div>
)
    }
  }
    
export default TripMap;