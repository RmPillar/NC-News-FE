import React, { Component } from 'react';
import {Link,Navigate} from '@reach/router'
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
        font-family: 'Roboto', sans-serif;
    `

    componentDidMount() {
        api.getAllTopics().then(topics => {
            this.setState(() => {
                return {topics}
            })
        })
    }

    onSubmit=(event) => {
        event.preventDefault();
        console.log(event)
    }

    render() {
        const {topics} = this.state
        return (
            <this.Nav>
                <Link to='/'><Button>Home</Button></Link>
                <form onSubmit={this.onSubmit}>
                <label>
                    Filter By: 
                <select>
                    {topics.map((topic) => {
                        return <option key={topic.topic_id}>{topic}</option>
                    })}
                </select>
                <button>Filter</button>
                </label>
                </form>
            </this.Nav>

        );
    }
}

export default Navbar;