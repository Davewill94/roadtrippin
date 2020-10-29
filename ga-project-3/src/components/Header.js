import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const LogoImg = styled.img`
height: 100%;
margin-left: 10vw;
@media only screen and (max-width: 450px) {
    margin-left: 0;
}
`




const Header = () => {
    return (
        <div id="header">
            <LogoImg src="./images/Logo2.png" alt="logo"/>
            <nav>
                <NavLink to='/home' activeClassName="active">Home</NavLink>
                <NavLink to='/about' activeClassName="active">About</NavLink>
                <NavLink to='/newTrip' activeClassName="active">New Trip</NavLink>
                <NavLink to='/contacts' activeClassName="active">Contacts</NavLink>
            </nav>
        </div>
    )
}

export default Header;