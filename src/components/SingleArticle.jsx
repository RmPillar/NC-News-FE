import React, { Component } from 'react';
import * as api from '../utils/api'
import Loader from './Loader';
import CommentCard from './CommentCard'
import styled from 'styled-components'
import ErrorDisplay from './ErrorDisplay';

class SingleArticle extends Component {
    state = {
        article: {},
        comments:[],
        isLoaded:false,
        err:'',
        viewComments: false
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
    
    clickHandler = (currentState) => {
        this.setState({viewComments:!currentState.viewComments})
    }

    render() {
        const {isLoaded,err, article:{title,body,votes,topic,author,created_at,comment_count}} = this.state
        if(!isLoaded) return <Loader/>
        if(err) return <ErrorDisplay err={err}/>
        return (
            <section>
                <this.Article>
                    <h3>{title}</h3>
                    <h5>{author}</h5>
                    <p>{topic}</p>
                    <p>{body}</p>
                    <p>Posted At: {created_at}</p>
                    <p>Votes: {votes}</p>
                    <p>Comments: {comment_count}</p> 
                </this.Article>
                <button onClick={this.clickHandler}>View Comments</button>
                {this.state.viewComments && this.state.comments.map((comment,index) => {
                        return <CommentCard key={comment.comment_id} comment={comment} color={this.props.colors[index%4]}/>
                })}
            </section>
        );
    }
}

export default SingleArticle;