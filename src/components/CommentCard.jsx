import React from 'react';
import styled from 'styled-components'

const CommentCard = ({comment}) => {

    const Section = styled.section`
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        border-radius: 10px;
        color: #3e3e3e;
        background: transparent;
        width: 35vw;
        min-width: 300px;
        height: 200px;
        border: 2px solid #26547C;
        font-family: 'Roboto', sans-serif;
    `



    return (
        <Section>
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <p>{comment.created_at}</p>
            <p>{comment.votes}</p>
        </Section>
    );
};

export default CommentCard;