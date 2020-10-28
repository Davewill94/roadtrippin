import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
display: flex;
flex-direction: row;
text-align: left;
justify-content: start;

`

const TextDiv = styled.div`
display: flex;
text-align: left;
width: 750px;
height:auto;
font-size: 18px;
padding: 15px;
border-radius: 25px;
margin: 100px 100px 0 -200px;
border: 2px solid rgb(60, 60, 60);
background: rgba(237, 248, 255, 0.687);
color: black;

p {
   line-height: 175%;
}
`


export default function About() {
    return (
        
        <WrapperDiv>
            <TextDiv>
            <p>
                <h4>Roadtrip Soundtrack </h4>
                Have you ever started a road trip and struggled to find the right podcast or album to listen to? 
                With this app, you can plan your route, view estimated travel times, and create your roadtrip soundtrack ahead of time. 
                 <br></br>
                Enter a start location and watch the app give you step by step instructions to your destination.
                <br></br>
                We will provide some useful information such as total trip time, estimated travel time,
                and average gas consumption.
                <h4>Spotify API:</h4>
                <p>This APP utilizes the Spotify API which gives you access to the "danceability, energy, and loudness" of songs.
                    These keywords allow you to narrow in on the exact type of roadtrip soundtrack you are looking for. 
                               
                <a href="https://developer.spotify.com/documentation/web-api/" target="_blank">  Spotify API</a>
                </p> 

                <h4>LeafLet API:</h4>
                <p>The map portion of this app was creating using Leaflet React. <br></br>
                One issue with using leaflet is the server seemed to go down every day between 11am-2pm. 
                <a href="https://react-leaflet.js.org/?_sm_au_=iVVF1T4WqPf0JLJNL321jK0f1JH33" target="_blank">React Leaflet API</a>
                </p>

                <p>Other Helpful Roadtrip Planning Links</p>
                <a href="http://www.ultimatecampgrounds.com/index.php/products/full-map" target="_blank">ultimagecampgrounds.com</a><br></br>
                <a href="https://www.fueleconomy.gov/trip/" target="_blank">fueleconomy.gov </a><br></br>
                <a href="https://roadtrippers.com/" target="_blank">roadtrippers.com</a>
            </p>
            </TextDiv>
        </WrapperDiv>
    )
}
