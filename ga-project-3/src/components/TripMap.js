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
              L.latLng(41.523529, -90.577042),
              L.latLng(41.878113, -87.629799)
          ],
          routeWhileDragging: true
      }).addTo(this.map);

    }

    render() {
      return <Wrapper width="600px" height="200px" id="map" />
    }
  }
    
export default TripMap;