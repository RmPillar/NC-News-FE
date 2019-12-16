import React from 'react';
import {Link} from '@reach/router'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import moment from 'moment'


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
        border: 2px solid ${`#${color}`};
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

      const style = {
          color: `#${color}`,
          border: `2px solid #${color}`, 
          margin: '5px'
      }
    return (
        <Article>
            <section id='main'>
                <Link id='name' to={`/articles/${article_id}`}>
                    <H4>{title.length < 40 ? title : title.slice(0,40)+'...'}</H4>
                </Link>
                <P>{`Created By: ${author}`}</P>
                <P>{`Topic: ${topic}`}</P>
                <P>Posted At: {moment(created_at).format("LT on L")}</P>
                <P>{`Votes: ${votes}`}</P>
                <P>{`Comments: ${comment_count}`}</P>
            </section>
            <section id='buttons'>
                <Button variant='outlined' style={style}  startIcon={<ThumbUpAltIcon />} disableElevation>
                    Like
                </Button>
                <Button variant='outlined' style={style} startIcon={<ThumbDownAltIcon />}>
                    Dislike
                </Button>
                {/* <Button variant='outlined' style={style} startIcon={<ChatBubbleIcon/>}>
                    Comment
                </Button> */}
            </section>
        </Article>
    );
};

export default ArticleCard;