import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
display: flex;
flex-direction: column;
height: 75vh;
justify-content: space-between;
margin-top: 40px;
`
const itemDiv = styled.div`
border: 3px solid black;
color: brown;

`

const contactInfo = [
    {
        name: 'Jon Vaflor',
        email: 'VaflorJonathan@JohnDeere.com',
        favoriteFood: "Mint Chocolate Ice Cream"
    },
    {
        name: 'David Williams',
        email: 'WilliamsDavid@JohnDeere.com',
        favoriteFood: "Pizza"
    },
    {
        name: 'Micheal Manning',
        email: 'ManningMicheal@JohnDeere.com',
        favoriteFood: "Chocolate"
    }
]


export default function Contacts() {
    return (
        <WrapperDiv>
            {contactInfo.map((item, id) => {
                return <itemDiv key={id}>
                    <h1>{item.name}</h1>
                    <h3>Email: {item.email}</h3>
                    <h3>Favorite Food: {item.favoriteFood}</h3>
                </itemDiv>
            })}
        </WrapperDiv>
    )
}
