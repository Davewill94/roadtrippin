import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
display: flex;
flex-direction: row;
text-align: left;
justify-content: space-around;
align-items: center;

`

const TextDiv = styled.div`
display: flex;
text-align: left;
width: 45vw;
height: 60vh;
font-size: 20px;
padding: 15px;
border-radius: 25px;
font-weight: bold;
margin: 100px 100px 0 10px;
border: 3px solid rgb(85, 20, 215);
background: rgba(139, 174, 196, 0.845);
color: black;

p {
   line-height: 175%;
}

`
const LinksDiv = styled.div`
text-align: center;

`




export default function About() {
    return (
        
        <WrapperDiv>
            <TextDiv>
            <p>
                Use this amazing app to plan your next road trip! Enter a start 
                location and watch the app give you step by step instructions to your destination.
                We will provide some useful information such as total trip time, estimated travel time,
                and average gas consumption.
            </p>
            </TextDiv>
            <LinksDiv>
            <div id="links">
                <p>Useful Links</p>
                <a href="http://www.ultimatecampgrounds.com/index.php/products/full-map" target="_blank">ultimagecampgrounds.com</a><br></br>
                <a href="https://www.fueleconomy.gov/trip/" target="_blank">fueleconomy.gov </a><br></br>
                <a href="https://roadtrippers.com/" target="_blank">roadtrippers.com</a>

            </div>
            </LinksDiv>
        </WrapperDiv>
    )
}
