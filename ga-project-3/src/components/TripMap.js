import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import axios from 'axios';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import Destinations from './Destinations';
import AsideLeft from './AssideLeft';
import Directions from './Directions';
import TripOverView from './TripOverView';
import SpotifyApp from './Spotify/SpotifyApp';



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
            ],
            directionsReady: false,
            tripDetails: []
          }
      }
    
    getLocation = (locations) => {
        //not working yet put required field on text input
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
        async function success(pos) {
            let cord = pos.coords;
            const resp = await axios.get(
                `http://www.mapquestapi.com/geocoding/v1/reverse?key=Dqwo8TsEVnyjgzGJZ8ae6Dl1dpm7W2Ft&location=${cord.latitude},${cord.longitude}`
            )
            let location = `${resp.data.results[0].locations[0].adminArea5},${resp.data.results[0].locations[0].adminArea3}`
            locations.from = location;
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
          console.log("returning Locations")
          console.log(locations);
          return locations
    }
    
    tripSubmit = async (e, locations) => {
        e.preventDefault();
        if(locations.from==='') {
            await this.getLocation(locations);
        }
        // console.log(locations);
        let check = this.state.previousTrips.filter(trip => (
            trip.name === locations.name
        ))    
        if(check.length > 0) {
            this.setState({
                directionsReady: false
            })
        } else {
            let previousTrips = this.state.previousTrips
            previousTrips.push({name: locations.name, from: locations.from, to: locations.to})
            this.setState({
                previousTrips: previousTrips,
                directionsReady: false
            })
        }
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

        //the .hide() hides the instructions -> to view instructions remove the .hide()
        routingControl.on('routesfound', (e) => {
            let tripDetails = [];
            let summary = e.routes[0].summary;
            tripDetails.push(summary)
            this.setState({
                routingControl,
                tripDetails
            })
            setTimeout(() => {
                this.setState({
                    directionsReady: true
                })
            }, 1)
        }).hide();
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
    //pans map to starting location and zooms to max
    startTrip = () => {
        this.map.flyTo([this.state.waypoints[0].lat, this.state.waypoints[0].lng], 15)
    }

    componentDidMount() {
        this.genMap();
    }

    render() {

        return (
            <div className="main-new-trip">
                <div className="top-content" >
                    <div className="trip-details">
                        <div className="dest-direct">
                            <Destinations tripSubmit={this.tripSubmit} />
                            <Directions routeInfo={this.state.routingControl} directionsReady={this.state.directionsReady}/>
                        </div>
                        <AsideLeft previousTrips={this.state.previousTrips} tripSubmit={this.tripSubmit} />
                    </div>
                    <TripOverView overView = {this.state.tripDetails} directionsReady={this.state.directionsReady} startTrip={this.startTrip}/>
                    <SpotifyApp />
                </div>

                <Wrapper width="600px" height="200px" id="map" />
            </div>    
        )
    }
  }
    
export default TripMap;