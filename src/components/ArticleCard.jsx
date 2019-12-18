import React from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import moment from 'moment'
import Voter from './Voter';


const ArticleCard = ({articleData:{article_id, title,author,topic,created_at,votes,comment_count},color}) => {
    
    const Article = styled.article`
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #3e3e3e;
        background: transparent;
        width: 35vw;
        min-width: 300px;
        height: 200px;
        border: 2px solid ${`${color}`};
        font-family: 'Roboto', sans-serif;
        display:grid;
        grid-template-columns: 3fr 1fr
        grid-areas: main buttons;
    `

    const H4 = styled.h4`
        color:#3e3e3e;
        &:hover {
            text-decoration: underline; 
        };
        margin: 10px 0px 10px 0px;
    `

    const P = styled.p`
        margin:3px 0px 3px 0px;
    `

      
    return (
        <Article>
            <section id='main'>
                <Link id='name' to={`/articles/${article_id}`}>
                    <H4>{title.length < 40 ? title : title.slice(0,40)+'...'}</H4>
                </Link>
                <P>{'Created By:'}<Link to={`/user/${author}`}>{author}</Link></P>
                <P>{`Topic: ${topic}`}</P>
                <P>Posted At: {moment(created_at).format("LT on L")}</P>
                <P>{`Comments: ${comment_count}`}</P>
            </section>
            <section id='buttons'>
                <Voter id={article_id} color={color} votes={votes} type='articles'/>
            </section>
        </Article>
    );
};

export default ArticleCard;