import React, { Component } from 'react';
import * as api from '../utils/api'
import Loader from './Loader';
import CommentCard from './CommentCard'
import styled from 'styled-components'
import ErrorDisplay from './ErrorDisplay';
import moment from 'moment'

class SingleArticle extends Component {
    state = {
        article: {},
        comments:[],
        isLoaded:false,
        err:'',
        viewComments: false,
        createComment: false,
        newComment: ''
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
    
    handleClick = ({target}) => {
        this.setState((currentState) => {
            return target.name === 'view' ? {viewComments:!currentState.viewComments} : target.name === 'create' ? {createComment:!currentState.createComment} : {}
        })
    }

    handleChange = ({target:{value}}) => {
        this.setState(() => {
            return {newComment: value}
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        return api.postComment(this.props.article_id,this.props.user,event.target[0].value)
        .then(response => {
            console.log(response)
            this.setState((currentState) => {
                return {
                    viewComments: true,
                    comments:[response.data.comment,...currentState.comments],
                    newComment:'',
                    createComment:false
                }
            })
        })
    }

    render() {
        const {isLoaded,err, article:{article_id,title,body,votes,topic,author,created_at,comment_count}} = this.state
        if(!isLoaded) return <Loader/>
        if(err) return <ErrorDisplay err={err}/>
        return (
           <section>
                <this.Article>
                    <h2>{title}</h2>
                    <this.Info>
                        <h5>Created By: {author}</h5>
                        <h5>Topic: {topic}</h5>
                    </this.Info>
                    <p>{body}</p>
                    <p>Posted At: {moment(created_at).format("LT l")}</p>
                    <this.Info>
                        <p>Votes: {votes}</p>
                        <p>Comments: {comment_count}</p> 
                    </this.Info>
                </this.Article>
                <button name='view' onClick={this.handleClick}>View Comments</button>
                <button name='create' onClick={this.handleClick}>Comment</button>
                {this.state.createComment && <form onSubmit={this.handleSubmit}>
                    <label>
                        Comment:
                        <textarea row='1' cols='50' onChange={this.handleChange} value={this.state.newComment}></textarea>
                        <button>Submit</button>
                    </label>
                </form>}
                <this.Section >
                {this.state.viewComments && this.state.comments.map((comment,index) => {
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