import React, { Component } from 'react';
import {Router} from '@reach/router'
import styled from 'styled-components'
import * as api from '../utils/api'
import ArticleCard from './ArticleCard';
import Loader from './Loader'
import SingleArticle from './SingleArticle';

class ArticleList extends Component {
    state = {
        articles: [],
        isLoaded: false
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

    componentDidUpdate(prevProps) {
        if(prevProps.topicSlug !== this.props.topicSlug) {
            api.getAllArticles(this.props.topicSlug).then(articles => {
                this.setState({articles, isLoaded:true})
            })
        }
    }



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
            </this.Section>
        );
    }
}

export default ArticleList;