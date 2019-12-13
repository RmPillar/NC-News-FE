import React, { Component } from 'react';
import {Link} from '@reach/router'
import Button from './Button'
import * as api from '../utils/api'

class Navbar extends Component {

    state = {
        topics: []
    }

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
            <nav>
                <Link to='/'><Button>Home</Button></Link>
                {topics.map((topic) => {
                    return <Link to ={`/${topic}`.toLowerCase()} key={topic}>
                        <Button>{topic}</Button>
                    </Link>
                })}
            </nav>

        );
    }
}

export default Navbar;