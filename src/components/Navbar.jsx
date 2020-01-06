import React, { Component } from 'react';
import {Link} from '@reach/router'
import * as api from '../utils/api'
import {Nav} from '../styledComponents/Nav'
import { TextField, MenuItem, Button} from '@material-ui/core';
import styled from 'styled-components';


const Form = styled.form`
    display:flex;
    align-items:center;
`

class Navbar extends Component {

    state = {
        topicFilter: 'coding',
        topics: [],
        isLoaded: false
    }

    componentDidMount() {
        api.getAllTopics().then(topics => {
            this.setState(() => {
                return {topics,isLoaded:true}
            })
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    style = {
        color: '#F7FFF7',
        background: '#26547C',
        border: '2px solid #26547C', 
        margin: '0px 20px 0px 20px'
    }

    selectStyle = {
        margin: '20px 0px 20px 0px'
    }



    render() {
        const {topics, topicFilter} = this.state
        if(!this.state.isLoaded) return <div></div>
        return (
            
                <Nav>
                <Link to='/articles/new-article'><Button variant='outlined' style={this.style}>Create Article</Button></Link>
                    <Form>
                        <TextField select variant='outlined' style={this.selectStyle} helperText="Filter Articles By Topic" value={topicFilter} onChange={this.handleChange}>
                            {topics.map(({slug}) => {
                                return<MenuItem key={slug} value={slug}>{slug.slice(0,1).toUpperCase()+slug.slice(1)}</MenuItem>
                            })}
                        </TextField>
                        <Link to={`topic/${topicFilter}`}><Button variant='outlined' style={this.style}>Filter!</Button></Link>
                    </Form>
                    <TextField name='sortBy' select variant='outlined' style={this.selectStyle} value={this.props.sortBy} helperText="Sort Articles By" onChange={this.props.handleChange}>
                            <MenuItem value='created_at'>Date Created</MenuItem>
                            <MenuItem value='comment_count'>Comment Count</MenuItem>
                            <MenuItem value='votes'>Votes</MenuItem>
                    </TextField>     
                </Nav>
            
        );
    }
}

export default Navbar;