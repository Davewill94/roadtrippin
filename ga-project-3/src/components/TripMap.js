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
import AssideLeft from './AssideLeft';


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
            routingControl: null,
            center: [42,-90],
            previousTrips: [
                {
                    name: "Super Awsome Trip 2019",
                    from: "Seatle, WA",
                    to: "Miami, FL"
                },
                {
                    name: "Classic Route 66",
                    from: "Chicago, IL",
                    to: "Santa Monica, CA"
                }
            ]
          }
      }
    
    tripSubmit = (e, locations) => {
        e.preventDefault();
        console.log(locations)
        let previousTrips = this.state.previousTrips
        previousTrips.push({name: locations.name, from: locations.from, to: locations.to})
        this.setState({
            previousTrips
        })
        console.log(previousTrips)
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

        this.map.remove();
        this.adjustMap();
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

        //the .hide() hides the instructions -> to view instructions remove the .hide()
        // routingControl.on('routesfound', function(e) {
            // let routes = e.routes;
            // let summary = routes[0].summary;
            // // alert distance and time in km and hours(rounded)
            // alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime / 3600) + ' hours');
        //  }).hide();
    }

    removeRoute = () => {
        if(this.state.routingControl != null ) {
            this.map.removeControl(this.state.routingControl)
        }
    }

    adjustMap = () => {
        let lats = 0;
        let lngs = 0;
        let center = [];
        for(let i=0; i < this.state.waypoints.length; i++) {     
            lats += this.state.waypoints[i].lat;
            lngs += this.state.waypoints[i].lng;
        }

        center.push(lats/this.state.waypoints.length);
        center.push(lngs/this.state.waypoints.length);
        
        this.setState({
            center
        })
        this.genMap();
    }

    //generates map that centers around
    genMap = () => {
        this.map = L.map('map', {
            center: this.state.center, 
            zoom: 6,
            zoomControl: false
          });
    
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 15, 
            maxNativeZoom: 17,
          }).addTo(this.map);
    }

    componentDidMount() {
        this.genMap();
    }

    render() {

        return (
            <div className="main-new-trip">
                <div className="trip-details">
                    <Destinations tripSubmit={this.tripSubmit} />
                    <AssideLeft routeInfo={this.state.routingControl} previousTrips={this.state.previousTrips}/>
                </div>

                <Wrapper width="600px" height="200px" id="map" />
                {/* <div className="trip-details">
                    <Destinations tripSubmit={this.tripSubmit} />
                    <AssideLeft routeInfo={this.state.routingControl} previousTrips={this.state.previousTrips}/>
                </div> */}
            </div>    
        )
    }
  }
    
export default TripMap;