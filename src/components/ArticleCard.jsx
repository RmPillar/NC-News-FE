import React, { Component } from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import moment from 'moment'
import Voter from './Voter';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as api from '../utils/api'


const H2 = styled.h2`
    color:#F7FFF7;
    &:hover {
        text-decoration: underline; 
    };
    margin: 10px 0px 10px 0px;
`

const P = styled.p`
    margin:10px 10px 3px 10px;  
`

const Div = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`

const Article = styled.article`
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    border-radius: 10px;
    color: #F7FFF7;
    background: ${props => props.color};
    width: 35vw;
    min-width: 300px;
    height: auto;
    min-height: 200px;
    border: 2px solid ${props => props.color};
    font-size: 20px
    font-family: 'Roboto', sans-serif;
    display:flex;
    flex-direction: column;
    align-items:center;
`
const style = {
    color: `#F7FFF7`,
    border: `2px solid #F7FFF7`, 
    width: '100px',
    margin: '5px',
    display:'flex',
    justifyContent: 'center'
}


class ArticleCard extends Component {

    state = {
        isDeleted: false
    }

    deleteArticle = ({currentTarget}) => {
        api.deleteArticle(currentTarget.value).then(() => {
            this.setState({isDeleted:true})
        })
    }
    
    render() {
        const {articleData:{article_id, title,author,topic,created_at,votes,comment_count},color, user} = this.props
        if(this.state.isDeleted) return <h3>Your article has been deleted</h3>
        return (
            <Article color={color}>
            <section>
                <Link id='name' to={`/articles/${article_id}`}>
                    <H2>{(title.length < 40 ? title.toUpperCase() : title.slice(0,40).toUpperCase()+'...')}</H2>
                </Link>
                <Div>
                    <P>{'Created By: '}<Link to={`/user/${author}`}>{author}</Link></P>
                    <P>{`Topic: ${topic}`}</P>
                </Div>
                <P>Posted: {moment(created_at).fromNow()}</P>
                <br></br>
                <P>{`Comments: ${comment_count || 0}`}</P>
            </section>
            <section>
                <Voter id={article_id} color={color} votes={votes} type='articles'/>
            </section>
                {user===author && <Button value={article_id} variant='outlined' startIcon={<DeleteIcon />} style={style} onClick={this.deleteArticle}>Delete</Button>}
        </Article>
        );
    }
}

export default ArticleCard;
