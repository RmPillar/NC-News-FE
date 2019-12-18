import React, { Component } from 'react';
import {Link} from '@reach/router'
import * as api from '../utils/api'
import {Nav} from '../styledComponents/Nav'

class Navbar extends Component {

    state = {
        topicFilter: 'coding',
        topics: [],
        sortBy: ['created_at','comment_count','votes']
    }

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
        const {topics, topicFilter} = this.state
        return (
            <div>
                <Nav>
                <Link to='/articles/new-article'><button>New Article</button></Link>
                    <form onSubmit={this.props.handleSubmit}>
                        <label>
                            Sort By: 
                            <select>
                                <option value='created_at'>Date Created</option>
                                <option value='comment_count'>Number of Comments</option>
                                <option value='votes'>Votes</option>
                            </select>
                            <button>Sort</button>
                        </label>
                    </form>
                    <form>
                        <label>
                            Filter:
                            <select onChange={this.handleChange}>
                                {topics.map(({slug}) => {
                                    return<option key={slug}>{slug}</option>
                                })}
                            </select>
                            <Link to={`topic/${topicFilter}`}><button>Filter!</button></Link>
                        </label>
                    </form>
                </Nav>
            </div>

        );
    }
}

export default Navbar;