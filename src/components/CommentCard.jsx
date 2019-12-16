import React, { Component } from 'react';
import styled from 'styled-components'
import * as api from '../utils/api'

class CommentCard extends Component {
    
    state = {
        isDeleted: false
    }

    Section = styled.section`
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #3e3e3e;
        background: transparent;
        width: 35vw;
        min-width: 300px;
        height: 200px;
        border: 2px solid #${this.props.color};
        font-family: 'Roboto', sans-serif;
    `

    handleClick = ({target}) => {
        return api.deleteComment(target.value).then(() => {
            this.setState({isDeleted:true})
        })
    }

    render() {
        const {comment,user} = this.props
  
        if(this.state.isDeleted) return <h3>Your comment has been deleted</h3>
        return (
            <this.Section>
                <p>{comment.author}</p>
                <p>{comment.body}</p>
                <p>{comment.created_at}</p>
                <p>{comment.votes}</p>
                {user===comment.author && <button value={comment.comment_id}onClick={this.handleClick}>Delete</button>}
            </this.Section>
        );
    }
}

export default CommentCard;