import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import CommentCard from './CommentCard'
import styled from 'styled-components'
import Loader from './Loader';
import posed from 'react-pose';
import * as api from '../utils/api'

const Box = posed.div(
    {
        visible: { opacity: 1, transition: { duration: 1000 } },
        hidden: { opacity: 0, transition: { duration: 1000 } }
      }
);

class CommentList extends Component {

    state = {
        comments:[],
        isLoaded: false,
        viewComments: false,
        createComment: false,
        newComment: '',
        hasCommented: false
    }

    Section = styled.section`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

    Info = styled.section`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-around;
    `

    style = {
        color: `#44AF69`,
        border: `2px solid #44AF69`, 
        margin: '5px'
    }

    componentDidMount() {
        return this.fetchCommentsByArticleId(this.props.article_id)
    }

    fetchCommentsByArticleId = id => {
        return api.getCommentsByArticleId(id)
        .then(data => {
            this.setState({comments:data,isLoaded:true})
        }).catch(({response:{data:{msg}}}) => {
            this.setState({err:msg,isLoaded:true})
        })
    }
    
    handleClick = ({currentTarget}) => {
        this.setState((currentState) => {
            return currentTarget.name === 'view' ? {viewComments:!currentState.viewComments} : currentTarget.name === 'create' ? {createComment:!currentState.createComment} : {}
        })
    }

    handleChange = ({target:{value}}) => {
        this.setState(() => {
            return {newComment: value}
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({hasCommented:true})
        return api.postComment(this.props.article_id,this.props.user,event.currentTarget[0].value)
        .then(response => {
            this.setState((currentState) => {
                return {
                    viewComments: true,
                    comments:[response.data.comment,...currentState.comments],
                    newComment:'',
                    createComment:false,
                    hasCommented:false
                }
            })
        })
    }

    render() {
        const {viewComments, hasCommented, comments, createComment, newComment,isLoaded} = this.state
        if(!isLoaded) return <Loader/>
        return (
            <>
            <Button variant='outlined' style={this.style} name='view' onClick={this.handleClick}>{viewComments ? 'Hide':'Show'} Comments</Button>
                <Button variant='outlined' style={this.style} name='create' onClick={this.handleClick}>Comment</Button>

                <this.Info>
                    {createComment && <form onSubmit={this.handleSubmit}>
                        <TextField error={!newComment} variant='outlined' placeholder='Comment' onChange={this.handleChange} value={newComment}></TextField>
                        <Button variant='outlined' style={this.style} disabled={!newComment || hasCommented} type='submit'>Submit</Button>   
                    </form>}
                </this.Info>

                <Box classname='box' pose={viewComments ? 'visible' : 'hidden'}>
                <this.Section >
                    {viewComments && comments.map((comment,index) => {
                        return <CommentCard 
                            key={comment.comment_id} 
                            comment={comment} 
                            color={this.props.colors[index%4]} 
                            user={this.props.user} 
                            article_id={this.props.article_id}
                        />
                    })}
                </this.Section>
            </Box>
            </>
        );
    }
}

export default CommentList;