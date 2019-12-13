import React, { Component } from 'react';
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
                {topics.map(topic => {
                    return <button key={topic.slug}>{topic.slug}</button>
                })}
            </nav>
                
            
        );
    }
}

export default Navbar;