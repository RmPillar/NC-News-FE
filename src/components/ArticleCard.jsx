import React from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'


const ArticleCard = ({articleData:{article_id, title,author,topic,created_at,votes,comment_count},color}) => {
    
    const Article = styled.article`
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #3e3e3e;
        background: transparent;
        width: 30vw;
        height: 200px;
        border: 2px solid ${`#${color}`};
        font-family: 'Roboto', sans-serif;
        display:grid;
        grid-template-columns: 3fr 1fr
        grid-areas: main buttons;
    `

    const Button = styled.button`
        display: inline-block;
        padding: 0.5rem 0;
        margin: 0.4rem 1rem;
        width: 5rem;
        background: transparent;
        color: #FCFCFC;
        border: 2px solid ${`#${color}`};
        border-radius: 10px;
        font-family: 'Roboto', sans-serif;
        font-size: 10px;
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
                <Link id='name' to={`articles/${article_id}`}>
                    <H4>{title}</H4>
                </Link>
                <P>{author}</P>
                <P>{topic}</P>
                <P>Posted At: {created_at}</P>
                <P>Votes: {votes}</P>
                <P>Comments: {comment_count}</P>
            </section>
            <section id='buttons'>
                <Button><img src='/like.png'/></Button>
                <Button><img src='/dislike.png'/></Button>
                <Button><img src='/comment.png'/></Button>
            </section>
        </Article>
    );
};

export default ArticleCard;