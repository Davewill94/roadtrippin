import React from 'react';
import styled from 'styled-components';
import ContactItem from './ContactItem';

const WrapperDiv = styled.div`
display: flex;
flex-direction: row;
height: 75vh;
justify-content: space-between;
margin-top: 40px;
`


const contactInfo = [
    {
        name: 'Jon Vaflor',
        email: 'VaflorJonathan@JohnDeere.com',
        states: "50",
        picture: "./images/jon.png",
        carimg: "./images/joncar.png",
        car: "Tesla Model 3 | 450hp | 116mpge"
    },
    {
        name: 'David Williams',
        email: 'WilliamsDavid@JohnDeere.com',
        states: "25",
        picture: "./images/david.png",
        carimg: "./images/davidcar.jpg",
        car: "Porsche 911 GT3 | 280hp | 20mpg"
    },
    {
        name: 'Michael Manning',
        email: 'ManningMichael@JohnDeere.com',
        states: "32",
        picture: "./images/manning2.png",
        carimg: "./images/manningcar.png",
        car: "Porsche 911 GT3 | 500hp | 15mpg"

    }
]


export default function Contacts() {
    return (
        <WrapperDiv>
            {contactInfo.map((item, id) => {
                return <div key={id}>
                    <ContactItem item={item} />
                </div>
            })}
        </WrapperDiv>
    )
}
