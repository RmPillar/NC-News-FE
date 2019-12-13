import React, { Component } from 'react';
import {Link} from '@reach/router'
import * as api from '../utils/util'

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
                <Link to='/'><button>Home</button></Link>
                {topics.map(topic => {
                    return <Link to ={`/topics/${topic.slug}`}key={topic.slug}>
                        <button >{topic.slug}</button>
                    </Link>
                })}
            </nav>

        );
    }
}

export default Navbar;