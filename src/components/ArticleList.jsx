import React, { Component } from 'react';
import {Router} from '@reach/router'
import * as api from '../utils/api'
import ArticleCard from './ArticleCard';
import Loader from './Loader'
import SingleArticle from './SingleArticle';

class ArticleList extends Component {
    state = {
        articles: [],
        isLoaded: false
    }

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
        if(!isLoaded) return <Loader/>
        return (
            <section>
                <Router>
                    <SingleArticle path='articles/:article_id'/>
                </Router>
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} articleData={article}/>
                })}
            </section>
        );
    }
}

export default ArticleList;