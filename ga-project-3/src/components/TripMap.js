import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


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
                ]
          }
      }
    
    componentDidMount(){
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

      L.Routing.control({
          waypoints: [
              L.latLng(this.state.waypoints[0].lat, this.state.waypoints[0].lng),
              L.latLng(this.state.waypoints[1].lat, this.state.waypoints[1].lng)
          ],
          routeWhileDragging: true
      }).addTo(this.map);

    }

    render() {
      return <Wrapper width="600px" height="200px" id="map" />
    }
  }
    
export default TripMap;