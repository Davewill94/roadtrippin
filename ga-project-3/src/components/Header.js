import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const LogoImg = styled.img`
height: 90%;
margin-left: 60px;
`




const Header = () => {
    return (
        <div id="header">
            <LogoImg src="./images/logo.png" alt="logo"/>
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