import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import { Button, TextField } from '@material-ui/core';
import moment from 'moment'
import Loader from './Loader';
import CommentCard from './CommentCard'
import ErrorDisplay from './ErrorDisplay';
import * as api from '../utils/api'
import Voter from './Voter';

class SingleArticle extends Component {
    state = {
        article: {},
        comments:[],
        isLoaded:false,
        err:'',
        viewComments: false,
        createComment: false,
        newComment: '',
        hasCommented: false
    }

    Article = styled.article`
        padding: 0px 20px 0px 20px;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #3e3e3e;
        background: transparent;
        width: 40vw;
        min-width: 300px;
        height: auto;
        border: 2px solid #26547C;
        font-family: 'Roboto', sans-serif;
    `

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
        color: `#26547C`,
        border: `2px solid #26547C`, 
        margin: '5px'
    }

    componentDidMount() {
        return this.fetchArticleById(this.props.article_id)
    }

    componentDidUpdate(prevProps) {
        if(this.props.article_id !== prevProps.article_id) {
            return this.fetchArticleById(this.props.article_id)
        }
    }

    fetchArticleById = id => {
        return Promise.all([api.getArticleById(id), api.getCommentsByArticleId(id)])
        .then(data => {
            this.setState({article:data[0],comments:data[1],isLoaded:true})
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
        const {isLoaded,err, viewComments, hasCommented, comments, createComment, newComment, article:{title,body,votes,topic,author,created_at,comment_count}} = this.state
        if(!isLoaded) return <Loader/>
        if(err) return <ErrorDisplay err={err}/>
        return (
           <section>
                <this.Article>
                    <h2>{title}</h2>
                    <this.Info>
                        <h5>Created By:<Link to={`/user/${author}`}>{author}</Link></h5>
                        <h5>Topic: {topic}</h5>
                    </this.Info>
                    <p>{body}</p>
                    <p>Posted At: {moment(created_at).format("LT on l")}</p>
                    <this.Info>
                        <p>Comments: {comment_count}</p> 
                    </this.Info>
                    <Voter id={this.props.article_id} color={this.style.color} votes={votes} type='article'/>
                </this.Article>

                <Button variant='outlined' style={this.style} name='view' onClick={this.handleClick}>View Comments</Button>
                <Button variant='outlined' style={this.style} name='create' onClick={this.handleClick}>Comment</Button>

                <this.Info>
                    {createComment && <form onSubmit={this.handleSubmit}>
                        <TextField error={!newComment} variant='outlined' placeholder='Comment' onChange={this.handleChange} value={newComment}></TextField>
                        <Button variant='outlined' style={this.style} disabled={!newComment || hasCommented} type='submit'>Submit</Button>   
                    </form>}
                </this.Info>

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
           </section>
        );
    }
}

export default SingleArticle;