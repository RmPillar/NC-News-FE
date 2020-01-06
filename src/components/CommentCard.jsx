import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import moment from 'moment'
import * as api from '../utils/api'
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Voter from './Voter';

class CommentCard extends Component {
    
    state = {
        isDeleted: false
    }

    Section = styled.section`
        display:flex;
        flex-direction:column;
        align-items:center;
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #F7FFF7;
        background: ${this.props.color};
        width: 40vw;
        min-width: 300px;
        height: auto;
        border: 2px solid ${this.props.color};
        font-family: 'Roboto', sans-serif;
    `

    handleClick = (event) => {
        return api.deleteComment(event.currentTarget.name).then(() => {
            this.setState({isDeleted:true})
        })
    }

    style = {
        color: `#F7FFF7`,
        border: `2px solid #F7FFF7`, 
        width: '100px',
        margin: '5px',
        display:'flex',
        justifyContent: 'center'
    }

    render() {
        const {comment:{author,body,created_at,comment_id,votes},user,color} = this.props
  
        if(this.state.isDeleted) return <h3>Your comment has been deleted</h3>
        return (
            <this.Section>
                <h5><Link to={`/user/${author}`}>{author}</Link></h5>
                <p>{body}</p>
                <p>Posted: {moment(created_at).fromNow()}</p>
                <Voter id={comment_id} color={color} votes={votes} type='comments'/>
                {user===author && <Button name={comment_id} variant='outlined' startIcon={<DeleteIcon />} style={this.style} onClick={this.handleClick}>Delete</Button>}
            </this.Section>
        );
    }
}

export default CommentCard;