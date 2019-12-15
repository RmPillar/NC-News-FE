import React, { Component } from 'react';
import {Router} from '@reach/router'
import styled from 'styled-components'
import * as api from '../utils/api'
import ArticleCard from './ArticleCard';
import Loader from './Loader'
import SingleArticle from './SingleArticle';
import { Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

class ArticleList extends Component {
    state = {
        articles: [],
        isLoaded: false,
        page:1
    }

    Section = styled.section`
        display:flex;
        flex-direction:column;
        align-items:center
    `

    componentDidMount() {
        api.getAllArticles().then(articles => {
            this.setState({articles, isLoaded:true})
        })
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.topicSlug !== this.props.topicSlug) {
            api.getAllArticles({topic:this.props.topicSlug}).then(articles => {
                this.setState({articles, isLoaded:true})
            })
        } else if (prevState.page !== this.state.page) {
            api.getAllArticles({p:this.state.page}).then(articles=> {
                this.setState({articles, isLoaded:true})
            })
        }
    }

    clickHandler = event => {
        this.setState(currentState => {
          return { page: currentState.page + 1, isLoaded: false };
        });
      };
    

    render() {
        const {articles, isLoaded} = this.state
        const colors = ['26547C','EF476F','FFD166','06D6A0']
        if(!isLoaded) return <Loader/>
        return (
            <this.Section>
                <Router>
                    <SingleArticle path='articles/:article_id'/>
                </Router>
                {articles.map((article, index) => {
                    return <ArticleCard key={article.article_id} articleData={article} color={colors[index%4]}/>
                })}
                <Button
                    variant='outlined'
                    startIcon={<NavigateNextIcon />}
                    onClick={this.clickHandler}
                >
                    Next
                </Button>
            </this.Section>
        );
    }
}

export default ArticleList;