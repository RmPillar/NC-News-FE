import React from 'react';

const ArticleCard = ({articleData:{title,author,topic,created_at,votes,comment_count}}) => {
    
    return (
        <section>
            <h4>{title}</h4>
            <h6>{author}</h6>
            <p>{topic}</p>
            <p>Posted At: {created_at}</p>
            <p>Votes: {votes}</p>
            <p>Comments: {comment_count}</p>
        </section>
    );
};

export default ArticleCard;