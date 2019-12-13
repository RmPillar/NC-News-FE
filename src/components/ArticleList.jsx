import React, { Component } from 'react';
import * as api from '../utils/util'
import ArticleCard from './ArticleCard';

class ArticleList extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        api.getAllArticles().then(articles => {
            this.setState({articles})
        })
    }

    render() {
        const {articles} = this.state
        return (
            <main>
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} articleData={article}/>
                })}
            </main>
        );
    }
}

export default ArticleList;