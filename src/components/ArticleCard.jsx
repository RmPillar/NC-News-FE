import React from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'

const ArticleCard = ({articleData:{article_id, title,author,topic,created_at,votes,comment_count},color}) => {
    
    const Article = styled.article`

        background: ${`#${color}`};
        


        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: white;
        width: 35vw;
        border: 2px white;
        font-family: 'Montserrat', sans-serif;
    `

    const H4 = styled.h4`
    color:black;
        text-decoration: linethrough
        &:hover {
            text-decoration: underline; 
        };
    `

    return (
        <Article>
            <Link id='name' to={`articles/${article_id}`}>
                <H4>{title}</H4>
            </Link>
            <h6>{author}</h6>
            <p>{topic}</p>
            <p>Posted At: {created_at}</p>
            <p>Votes: {votes}</p>
            <p>Comments: {comment_count}</p>
        </Article>
    );
};

export default ArticleCard;