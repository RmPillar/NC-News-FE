import React from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'


const ArticleCard = ({articleData:{article_id, title,author,topic,created_at,votes,comment_count},color}) => {
    
    const Article = styled.article`
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: whitesmoke;
        background: ${`#${color}`};
        width: 70vw;
        height: 200px;
        border: 2px whitesmoke;
        font-family: 'Montserrat', sans-serif;
        display:flex;
        align-items: center;
        justify-content: space-between;
    `

    const Button = styled.button`
        display: inline-block;
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        width: 5rem;
        background: whitesmoke;
        color: black;
        border: 2px solid whitesmoke;
        border-radius: 10px;
        font-family: 'Montserrat', sans-serif;
    `

    const H5 = styled.h5`
    color:white;
        text-decoration: linethrough
        &:hover {
            text-decoration: underline; 
        };
    `



    return (
        <Article>
            <section id='title'>
                <Link id='name' to={`articles/${article_id}`}>
                    <H5>{title}</H5>
                </Link>
                <h6>{author}</h6>
                <p>{topic}</p>
            </section>
            <section id='info'>
                <p>Posted At: {created_at}</p>
                <p>Votes: {votes}</p>
                <p>Comments: {comment_count}</p>
            </section>
            <section id='buttons'>
                <Button>+</Button>
                <Button>-</Button>
                <Button>Comment</Button>
            </section>
        </Article>
    );
};

export default ArticleCard;