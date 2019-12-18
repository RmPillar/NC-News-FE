import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import * as api from '../utils/api'

class Navbar extends Component {

    state = {
        topicFilter: 'coding',
        topics: [],
        sortBy: ['created_at','comment_count','votes']
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

    handleChange = (event) => {
        this.setState({topicFilter:event.target.value})
    }

    render() {
        const {topics} = this.state
        return (
            <div>
                <this.Nav>
                    <form>
                        <label>
                            Filter:
                            <select onChange={this.handleChange}>
                                {topics.map(({slug}) => {
                                    return<option key={slug}>{slug}</option>
                                })}
                            </select>
                            <Link to={`topic/${this.state.topicFilter}`}><button>Filter!</button></Link>
                        </label>
                    </form>
                </this.Nav>
            </div>

        );
    }
}

export default Navbar;