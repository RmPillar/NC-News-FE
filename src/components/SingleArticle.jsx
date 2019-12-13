import React, { Component } from 'react';
import * as api from '../utils/api'
import Loader from './Loader';
import CommentCard from './CommentCard'

class SingleArticle extends Component {
    state = {
        article: {},
        comments:[],
        isLoaded:false
    }

    componentDidMount() {
        return this.fetchArticleById(this.props.article_id)
    }

    componentDidUpdate(prevProps) {
        if(this.props.article_id !== prevProps.article_id) {
            return this.fetchArticleById(this.props.article_id)
    }}

    fetchArticleById = id => {
        return Promise.all([api.getArticleById(id), api.getCommentsByArticleId(id)])
        .then(data => {
            this.setState({article:data[0],comments:data[1],isLoaded:true})
        })
        }
    

    render() {
        const {title,body,votes,topic,author,created_at,comment_count} = this.state.article
        if(!this.state.isLoaded) return <Loader/>
        return (
            <article>
                <h3>{title}</h3>
                <h5>{author}</h5>
                <p>{topic}</p>
                <p>{body}</p>
                <p>Posted At: {created_at}</p>
                <p>Votes: {votes}</p>
                <p>Comments: {comment_count}</p>
                {this.state.comments.map(comment => {
                    return <CommentCard key={comment.comment_id} comment={comment}/>
                })}
            </article>
        );
    }
}

export default SingleArticle;