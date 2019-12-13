import React from 'react';

const CommentCard = ({comment}) => {
    return (
        <section>
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <p>{comment.created_at}</p>
            <p>{comment.votes}</p>
        </section>
    );
};

export default CommentCard;