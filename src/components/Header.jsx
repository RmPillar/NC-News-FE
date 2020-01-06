import React from 'react';
import styled from 'styled-components'
import {Link} from '@reach/router'
import { Button } from '@material-ui/core';

const HeaderBar = styled.header`
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
        font-family: 'Roboto', sans-serif;
        z-index:1
    `

    const H1 = styled.h1`
        font-size: 50px;
        color:#F7FFF7;
        margin: 0px 0px 0px 10px
    `
    const H2 = styled.h2`
        color:#F7FFF7;
        margin: 0px 10px 0px 0px;
    `

    const buttonStyle = {
        color: `#F7FFF7`,
        border: `2px solid #F7FFF7`, 
        width: '100px',
        marginRight: '10px',
    }


const Header = ({user,handleClick}) => {

    return (
        <HeaderBar>
            <Link to='/articles'>
                <H1>NC NEWS</H1>
            </Link>
            <H2>{user}</H2>
            <Link to='/'><Button onClick = {handleClick} style={buttonStyle}>Logout</Button></Link>
        </HeaderBar>
    );
};

export default Header;