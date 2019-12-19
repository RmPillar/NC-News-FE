import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import moment from 'moment'
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';
import * as api from '../utils/api'
import Voter from './Voter';
import CommentList from './CommentList';
import posed from 'react-pose';

const Box = posed.div(
    {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }
);

class SingleArticle extends Component {
    state = {
        article: {},
        isLoaded:false,
        isVisible:false,
        err:'',
        
    }

    Article = styled.article`
        padding: 0px 20px 0px 20px;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #F7FFF7;
        background: #44AF69;
        width: 40vw;
        min-width: 300px;
        height: auto;
        border: 2px solid #44AF69;
        font-family: 'Roboto', sans-serif;
        font-size:20px;
        display:flex;
        flex-direction:column;
        align-items:center;
    `

    Info = styled.section`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-around;
    `

    P = styled.p`
        margin:3px 10px 3px 10px;
    `

    style = {
        color: `#44AF69`,
        border: `2px solid #44AF69`, 
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
            this.setState({article ,isLoaded:true},() => {this.setState({isVisible:true})})
        }).catch(({response:{data:{msg}}}) => {
            this.setState({err:msg,isLoaded:true})
        })
    }
    
    render() {
        const {isLoaded, isVisible,err, article:{title,body,votes,topic,author,created_at,comment_count}} = this.state
        if(!isLoaded) return <Loader/>
        if(err) return <ErrorDisplay err={err}/>
        return (
               <Box classname='box' pose={isVisible ? 'visible' : 'hidden'}>
           <section>
                <this.Article>
                    <h2>{title}</h2>
                    <this.Info>
                        <this.P>Created By:<Link to={`/user/${author}`}>{author}</Link></this.P>
                        <this.P>Topic: {topic}</this.P>
                    </this.Info>
                    <p>{body}</p>
                    <p>Posted At: {moment(created_at).format("LT on l")}</p>
                    <this.Info>
                        <p>Comments: {comment_count}</p> 
                    </this.Info>
                    <Voter id={this.props.article_id} color={this.style.color} votes={votes} type='articles'/>
                </this.Article>
                    <CommentList article_id={this.props.article_id} colors={this.props.colors}/>
           </section>
                </Box>
        );
    }
}

export default SingleArticle;