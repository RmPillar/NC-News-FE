import React from 'react';
import styled from 'styled-components'
import Navbar from './Navbar';


const Header = ({user}) => {
    const Nav = styled.nav`
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 0.5rem 0;
        margin: 0 0 30px 0;
        width: 100%;
        background: #26547C;
        color: black;
        font-family: 'Roboto', sans-serif;
    `

    const H1 = styled.h1`
        font-size: 50px;
        color:#FCFCFC;
        margin: 0px 0px 0px 10px;
    `
    const H3 = styled.h3`
        color:#FCFCFC;

        margin: 0px 10px 0px 0px;
    `

    return (
        <Nav>
            <H1>NC NEWS</H1>
            <H3>Welcome: {user}</H3>
        </Nav>
    );
};

export default Header;