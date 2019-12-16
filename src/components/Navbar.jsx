import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import Button from './Button'
import * as api from '../utils/api'

class Navbar extends Component {

    state = {
        topics: []
    }

        Nav = styled.nav`
        display: inline-block;
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        width: 90vw;
        background: transparent;
        color: black;
        border: 2px solid black;
        font-family: 'Montserrat', sans-serif;
    `

    componentDidMount() {
        api.getAllTopics().then(topics => {
            this.setState(() => {
                return {topics}
            })
        })
    }

    render() {
        const {topics} = this.state
        return (
            <this.Nav>
                <Link to='/'><Button>Home</Button></Link>
                {topics.map(({slug}) => {
                    return <Link to ={`topic/${slug}`.toLowerCase()} key={slug}>
                        <Button>{slug}</Button>
                    </Link>
                })}
            </this.Nav>

        );
    }
}

export default Navbar;