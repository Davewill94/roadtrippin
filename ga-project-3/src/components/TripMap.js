import React, { Component } from 'react'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


import styled from 'styled-components';
import axios from 'axios';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import Destinations from './Destinations';
import AsideLeft from './AssideLeft';
import Directions from './Directions';
import TripOverView from './TripOverView';
import SpotifyApp from './Spotify/SpotifyApp';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 40], // adjusted icons anchor location to appear correctly on map
});
//set marks icon to be defalut icon, should correct error in icon load
L.Marker.prototype.options.icon = DefaultIcon;


//styled component for map wrapper
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
            tripDetails: [],
            maptype: [
                {type: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'},
                {type: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'},
                {type: 'https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png'}
            ],
            currentMap: 0,
            playlisttime: 0
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
                `http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAP_KEY}&location=${cord.latitude},${cord.longitude}`
            )
            let location = `${resp.data.results[0].locations[0].adminArea5},${resp.data.results[0].locations[0].adminArea3}`
            locations.from = location;
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
          return locations
        //not currently functional
    }
    
    tripSubmit = async (e, locations) => {
        e.preventDefault();
        //ties to function that currently does not work
        // if(locations.from==='') {
        //     await this.getLocation(locations);
        // }
        //check to see if current trip name existis
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
    //function gets lat lng coordinates of entered cities
    getLatLng = async (locations) => {
        const resp = await axios.get(
            `http://www.mapquestapi.com/geocoding/v1/batch?key=${process.env.REACT_APP_MAP_KEY}&location=${locations.from}&location=${locations.to}`
        )
        let waypoints = [];
        waypoints.push(resp.data.results[0].locations[0].latLng);
        waypoints.push(resp.data.results[1].locations[0].latLng);
        this.setState({
            waypoints
        });

        await this.map.remove();
        this.adjustMap();
        this.genRoute();
    }
    //overal function removes existing routes and plots a new one
    genRoute = () => {
        this.removeRoute();
        let routingControl = L.Routing.control({
            waypoints: [
                L.latLng(this.state.waypoints[0].lat, this.state.waypoints[0].lng),
                L.latLng(this.state.waypoints[1].lat, this.state.waypoints[1].lng)
            ],
        }).addTo(this.map);

        //the .hide() hides the instructions -> to view instructions remove the .hide()
        //funciton uses leaflet-routing-macine to calculated an plot route between two points
        routingControl.on('routesfound', (e) => {
            let tripDetails = [];
            let summary = e.routes[0].summary;
            tripDetails.push(summary)
            this.setState({
                routingControl,
                tripDetails
            })
            //delay to set allow routingControl and tripdetails to update in state - place for future improvement 
            setTimeout(() => {
                this.setState({
                    directionsReady: true
                })
            }, 1)
        }).hide();
    }

    //function removes an existing routing if one already exists on the map
    removeRoute = () => {
        if(this.state.routingControl != null ) {
            this.map.removeControl(this.state.routingControl)
        }
    }

    //function re-centers map to be the mid point of the two waypoints seclected
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
        //once map is re-centered and route is generating call map gen
        this.genMap();
    }

    //generates map that centers around current center
    genMap = () => {
        this.map = L.map('map', {
            center: this.state.center, 
            zoom: 6,
            zoomControl: false
          });
        
          //add selected map skin to the map area and set the map area
          L.tileLayer(`${this.state.maptype[this.state.currentMap].type}`, {
            detectRetina: true,
            maxZoom: 17, 
            maxNativeZoom: 17,
          }).addTo(this.map);
          if(this.state.routingControl!==null) {
            L.marker([this.state.waypoints[0].lat, this.state.waypoints[0].lng]).addTo(this.map);
            L.marker([this.state.waypoints[1].lat, this.state.waypoints[1].lng]).addTo(this.map);              
          }

    }
    //pans map to starting location and zooms to max
    startTrip = async () => {
        //removes route line from map to keep weird red screen from occuring
        this.removeRoute()
        //made await to keep line from reapearing till the animation is done
        await this.map.flyTo([this.state.waypoints[0].lat, this.state.waypoints[0].lng], 14, {
            animate: true,
            duration: 4
        });
        //re-adds the route line back to map and surpesses leaflet built in directions
        this.state.routingControl.addTo(this.map).hide();
    }

    //function handles night mode request from SpotifyAppy component
    nightMode = async (selectedGenre) => {
        //metal night mode easter egg
       if(selectedGenre!=="metal") {
            if(this.state.currentMap===0) {
                this.setState({
                    currentMap: 1
                })
            } else if(this.state.currentMap===1) {
                this.setState({
                    currentMap: 0
                })
            } else {
                this.setState({
                    currentMap: 0
                })
            }
       } else {
           if(this.state.currentMap===2) {
                this.setState({
                    currentMap: 0
                })
           } else {
                this.setState({
                    currentMap: 2
                })
           }
       }
       //waits for update of state to new map layer then removes current map layer
       await this.map.removeLayer(this.map)
       //adds the new map layer back to map
       L.tileLayer(`${this.state.maptype[this.state.currentMap].type}`, {
            detectRetina: true,
            axZoom: 17, 
            maxNativeZoom: 17,
        }).addTo(this.map);
    }
    //once trip data is displayed and a playlist is selected this should update total time
    updatePlaylistTime = (time) => {
        this.setState({
            playlisttime: time
        })
    }

    //generate an empty map when page loads
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
                    <TripOverView overView = {this.state.tripDetails} directionsReady={this.state.directionsReady} startTrip={this.startTrip} playlisttime={this.state.playlisttime}/>
                    <SpotifyApp nightMode={this.nightMode} currentMap={this.state.currentMap} updatePlaylistTime={this.updatePlaylistTime} directionsReady={this.state.directionsReady}/>
                </div>

                <Wrapper width="600px" height="200px" id="map" />
            </div>    
        )
    }
  }
    
export default TripMap;