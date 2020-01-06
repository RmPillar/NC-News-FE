import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
        isDeleted:false,
        err:'',
        
    }

    Article = styled.article`
        padding: 0px 20px 0px 20px;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #F7FFF7;
        background: #26547C;
        width: 40vw;
        min-width: 300px;
        height: auto;
        border: 2px solid #26547C;
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
        color: `#26547C`,
        border: `2px solid #26547C`, 
        margin: '5px'
    }

    deleteStyle = {
        color: `#F7FFF7`,
        border: `2px solid #F7FFF7`, 
        width: '100px',
        margin: '5px',
        display:'flex',
        justifyContent: 'flex-start'
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
            this.setState({article ,isLoaded:true, isDeleted:false})
        }).catch(({response:{data:{msg}}}) => {
            this.setState({err:msg,isLoaded:true})
        })
    }

    deleteArticle = ({target}) => {
        return api.deleteArticle(target.value).then(() => {
            this.setState({isDeleted:true})
        }).catch(console.dir)
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
        const {isLoaded, err, isDeleted, article:{title,body,votes,topic,author,created_at,comment_count}} = this.state
        if(!isLoaded) return <Loader/>
        if(isDeleted) return <h3>Your article has been deleted</h3>
        if(err) return <ErrorDisplay err={err}/>
        return (
               
           <section>
                <this.Article>
                    <h2>{title.toUpperCase()}</h2>
                    <this.Info>
                        <this.P>Created By:<Link to={`/user/${author}`}>{author}</Link></this.P>
                        <this.P>Topic: {topic}</this.P>
                    </this.Info>
                    <p>{body}</p>
                    <p>Posted: {moment(created_at).fromNow()}</p>
                    <this.Info>
                        <p>Comments: {comment_count}</p> 
                    </this.Info>
                    <Voter id={this.props.article_id} color={'#26547C'} votes={votes} type='articles'/>
                    {this.props.user===author && <Button value={this.props.article_id} variant='outlined' startIcon={<DeleteIcon />} style={this.style} onClick={this.deleteArticle}>Delete</Button>}
                </this.Article>
                    <CommentList article_id={this.props.article_id} user={this.props.user} colors={this.props.colors}/>
           </section>
                
        );
    }
}
export default SingleArticle;