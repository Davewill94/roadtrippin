import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
text-align: left;
justify-content: center;
width: 90vw;

@media only screen and (max-width: 450px) {
    width: 95vw;
}

`

const TextDiv = styled.div`
display: flex;
flex-wrap: row-wrap;
text-align: left;
width: 90vw;
height:auto;
font-size: 18px;
word-wrap: break-word;
padding: 15px;
border-radius: 25px;
margin: 30px 80px 0 80px;
border: 2px solid rgb(60, 60, 60);
background: rgba(237, 248, 255, 0.687);
color: black;

p {
   line-height: 175%;
}

img {
    visibility:hidden;
    position: fixed;
    right: 250px;
    bottom: 90px;
    height: 150px;

}

h4 {
    display: inline-block;
}

h4:hover + img{
        visibility:visible;
}

span {
    width: 50px;
}

@media only screen and (max-width: 450px) {
    font-size: 14px;
    margin: 25px 0;
}
`



export default function About() {
    return (
        
        <WrapperDiv>
            <TextDiv>
            <p>
                <span class="overlay"><h4>Roadtrip Soundtrack</h4>
                <img id="tripGif" src="https://thumbs.gfycat.com/DetailedIllfatedArawana.webp" alt="manning"></img> 

                </span><br></br>
                Have you ever started a road trip and struggled to find the right podcast or album to listen to? 
                With this app, you can plan your route, view estimated travel times, and create your roadtrip soundtrack ahead of time. 
                 <br></br>
                Enter a start location and watch the app give you step by step instructions to your destination.
                <br></br>
                We will provide some useful information such as total trip time, estimated travel time,
                and length of playlist. 
                <br></br>
                <span class="overlay"><h4>Spotify API:</h4>
                <img id="tripGif" src="https://media.tenor.com/images/6cc3abb6d3a1562319e217eb626612a5/tenor.gif" alt="manning"></img> 

                </span><br></br>
                <p>This travel app utilizes the Spotify API which gives you access to tons of information helping you decide which playlist or album you would like to listen to. 
                <br></br>               
                <a href="https://developer.spotify.com/documentation/web-api/" target="blank">  Spotify API</a>
                </p> 

                <span class="overlay"><h4>Leaflet API:</h4>
                <img id="tripGif" src="https://media0.giphy.com/media/d2jjuAZzDSVLZ5kI/giphy.gif" alt="manning"></img> 

                </span><br></br>
                <p>The map portion of this app was creating using Leaflet React. <br></br>
                <a href="https://react-leaflet.js.org/?_sm_au_=iVVF1T4WqPf0JLJNL321jK0f1JH33" target="blank">React Leaflet API</a>
                </p>

                <p>Other Helpful Roadtrip Planning Links</p>
                <a href="http://www.ultimatecampgrounds.com/index.php/products/full-map" target="blank">ultimagecampgrounds.com</a><br></br>
                <a href="https://www.fueleconomy.gov/trip/" target="blank">fueleconomy.gov </a><br></br>
                <a href="https://roadtrippers.com/" target="blank">roadtrippers.com</a>
            </p>
            </TextDiv>
        </WrapperDiv>
    )
}
