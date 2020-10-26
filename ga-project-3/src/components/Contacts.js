import React from 'react';
import styled from 'styled-components';
import ContactItem from './ContactItem';

const WrapperDiv = styled.div`
display: flex;
flex-direction: column;
height: 75vh;
justify-content: space-between;
margin-top: 40px;
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
        name: 'Michael Manning',
        email: 'ManningMichael@JohnDeere.com',
        favoriteFood: "Chocolate"
    }
]


export default function Contacts() {
    return (
        <WrapperDiv>
            {contactInfo.map((item, id) => {
                return <div key={id}>
                    <ContactItem item={item}/>
                </div>
            })}
        </WrapperDiv>
    )
}
