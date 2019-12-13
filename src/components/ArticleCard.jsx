import React from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'

const ArticleCard = ({articleData:{article_id, title,author,topic,created_at,votes,comment_count}}) => {
    
    const Article = styled.article`
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        width: 50vw;
        background: white;
        color: black;
        border: 2px solid black;
        font-family: 'Montserrat', sans-serif;
    `
    return (
        <Article>
            <Link id='name' to={`articles/${article_id}`}>
                <h4>{title}</h4>
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