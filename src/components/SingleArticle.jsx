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

const Article = styled.article`
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

const Info = styled.section`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
`

const P = styled.p`
    margin:3px 10px 3px 10px;   
`

const style = {
    color: `#F7FFF7`,
    border: `2px solid #F7FFF7`, 
    width: '100px',
    margin: '5px',
    display:'flex',
    justifyContent: 'flex-start'
}

class SingleArticle extends Component {
    state = {
        article: {},
        isLoaded:false,
        isDeleted:false,
        err:'',
        
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
    
    render() {
        const {isLoaded, err, isDeleted, article:{title,body,votes,topic,author,created_at,comment_count}} = this.state
        if(!isLoaded) return <Loader/>
        if(isDeleted) return <h3>Your article has been deleted</h3>
        if(err) return <ErrorDisplay err={err}/>
        return (
               
           <section>
                <Article>
                    <h2>{title.toUpperCase()}</h2>
                    <Info>
                        <P>Created By:<Link to={`/user/${author}`}>{author}</Link></P>
                        <P>Topic: {topic}</P>
                    </Info>
                    <p>{body}</p>
                    <p>Posted: {moment(created_at).fromNow()}</p>
                    <Info>
                        <p>Comments: {comment_count}</p> 
                    </Info>
                    <Voter id={this.props.article_id} color={'#26547C'} votes={votes} type='articles'/>
                    {this.props.user===author && <Button value={this.props.article_id} variant='outlined' startIcon={<DeleteIcon />} style={style} onClick={this.deleteArticle}>Delete</Button>}
                </Article>
                    <CommentList article_id={this.props.article_id} user={this.props.user} colors={this.props.colors}/>
           </section>
                
        );
    }
}
export default SingleArticle;