import React, { Component } from 'react';
import {Link} from '@reach/router'
import * as api from '../utils/api'
import {Nav} from '../styledComponents/Nav'
import { TextField, MenuItem, Button} from '@material-ui/core';

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

    style = {
        color: `#FCFCFC`,
        background: '#26547C',
        border: `2px solid #26547C`, 
        margin: '0px 20px 0px 20px'
    }


    render() {
        const {topics, topicFilter} = this.state
        return (
            <div>
                <Nav>
                <Link to='/articles/new-article'><Button variant='outlined' style={this.style}>Create Article</Button></Link>
                    <form onSubmit={this.props.handleSubmit}>
                        
                            <TextField select helperText="Sort Articles By">
                                <MenuItem value='created_at'>Date Created</MenuItem>
                                <MenuItem value='comment_count'>Comment Count</MenuItem>
                                <MenuItem value='votes'>Votes</MenuItem>
                            </TextField>
                            <Button variant='outlined' style={this.style}>Sort</Button>
                      
                    </form>
                    <form>
                        
                            <TextField select helperText="Filter Articles By Topic"onChange={this.handleChange}>
                                {topics.map(({slug}) => {
                                    return<MenuItem key={slug} value={slug}>{slug}</MenuItem>
                                })}
                            </TextField>
                            <Link to={`topic/${topicFilter}`}><Button variant='outlined' style={this.style}>Filter!</Button></Link>
                    </form>
                </Nav>
            </div>

        );
    }
}

export default Navbar;