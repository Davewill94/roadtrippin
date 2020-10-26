import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
display: flex;
text-align: left;
justify-content: center;
align-items: center;
border: 6px solid grey;
width: 80vw;
height: 60vh;
font-size: 40px;
margin: 10vh;
padding: 15px;
border-radius: 25px;
font-weight: bold;

p {
   line-height: 175%;
}


`


export default function About() {
    return (
        <WrapperDiv>
            <p>
                Use this amazing app to plan your next road trip! Enter a start 
                location and watch the app give you step by step instructions to your destination.
                We will provide some useful information such as total trip time, estimated travel time,
                and average gas consumption.
            </p>
        </WrapperDiv>
    )
}
