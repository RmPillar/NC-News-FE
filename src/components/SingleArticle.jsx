import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'

import moment from 'moment'
import Loader from './Loader';

import ErrorDisplay from './ErrorDisplay';
import * as api from '../utils/api'
import Voter from './Voter';
import CommentList from './CommentList';

class SingleArticle extends Component {
    state = {
        article: {},
        isLoaded:false,
        err:'',
        
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
        api.getArticleById(id)
        .then(article => {
            this.setState({article ,isLoaded:true})
        })
        // .catch(({response}) => {
        //     this.setState({err:msg,isLoaded:true})
        // })
    }
    
    render() {
        const {isLoaded,err, article:{title,body,votes,topic,author,created_at,comment_count}} = this.state
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
                    <CommentList article_id={this.props.article_id} colors={this.props.colors}/>
           </section>
        );
    }
}

export default SingleArticle;