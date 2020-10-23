import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;


  class MapShow extends Component {
    
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

    }

    render() {
      return <Wrapper width="600px" height="200px" id="map" />
    }
  }
    
export default MapShow;