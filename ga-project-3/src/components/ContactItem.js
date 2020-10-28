import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
padding: 10px;
margin: 10px;
line-height: 100%;
border-radius: 18px;
background: linear-gradient(145deg, #ffffff, #e6e6e641);
box-shadow:  5px 5px 10px #999999, 
             -5px -5px 10px #ffffff;
`


export default function ContactItem(props) {
console.log(props)
    return (
        <div id = "contactWrapper">
        <div>
            <img id="profileImg" src={props.item.picture} alt="manning"></img>
        </div>
        <WrapperDiv>
            <h1>{props.item.name}</h1>
            <h3>Email: <span>{props.item.email}</span></h3>
            <h3>States Visited: <span>{props.item.states}</span></h3>
            <h3>Vehicle: <span>{props.item.car}</span></h3>
            <div id="carDiv">
                <img id="carImg" src={props.item.carimg} alt="manning"></img>
            </div>
        </WrapperDiv>
        
        
        </div>
    )
}
