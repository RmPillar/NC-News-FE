import React from 'react';
import {Link} from '@reach/router'

const ArticleCard = ({articleData:{article_id, title,author,topic,created_at,votes,comment_count}}) => {
    return (
        <article>
            <Link id='name' to={`articles/${article_id}`}>
                <h4>{title}</h4>
            </Link>
            <h6>{author}</h6>
            <p>{topic}</p>
            <p>Posted At: {created_at}</p>
            <p>Votes: {votes}</p>
            <p>Comments: {comment_count}</p>
        </article>
    );
};

export default ArticleCard;