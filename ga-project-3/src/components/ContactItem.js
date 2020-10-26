import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
padding: 10px;
line-height: 100%;
border-radius: 0px;
background: linear-gradient(145deg, #e6e6e6, #ffffff);
box-shadow:  13px 13px 21px #999999, 
             -13px -13px 21px #ffffff;
`


export default function ContactItem(props) {
console.log(props)
    return (
        <WrapperDiv>
            <h1>{props.item.name}</h1>
            <h3>Email: {props.item.email}</h3>
        </WrapperDiv>
    )
}
