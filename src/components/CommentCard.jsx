import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import moment from 'moment'
import * as api from '../utils/api'
import Voter from './Voter';

class CommentCard extends Component {
    
    state = {
        isDeleted: false
    }

    Section = styled.section`
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #FCFCFC;
        background: ${this.props.color};
        width: 40vw;
        min-width: 300px;
        height: auto;
        border: 2px solid ${this.props.color};
        font-family: 'Roboto', sans-serif;
    `

    handleClick = ({target}) => {
        return api.deleteComment(target.value).then(() => {
            this.setState({isDeleted:true})
        })
    }

    render() {
        const {comment:{author,body,created_at,comment_id,votes},user,color} = this.props
  
        if(this.state.isDeleted) return <h3>Your comment has been deleted</h3>
        return (
            <this.Section>
                <h5><Link to={`/user/${author}`}>{author}</Link></h5>
                <p>{body}</p>
                <p>Posted At: {moment(created_at).format("LT on L")}</p>
                <Voter id={comment_id} color={color} votes={votes} type='comments'/>
                {user===author && <button value={comment_id}onClick={this.handleClick}>Delete</button>}
            </this.Section>
        );
    }
}

export default CommentCard;