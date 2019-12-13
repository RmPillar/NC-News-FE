import React, { Component } from 'react';
import {Link} from '@reach/router'
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
                <Link to='/'><button>Home</button></Link>
                {topics.map(({slug}) => {
                    return <Link to ={`/${slug}`} key={slug}>
                        <button>{slug}</button>
                    </Link>
                })}
            </nav>

        );
    }
}

export default Navbar;