import React, { Component } from 'react';
import * as api from '../utils/util'
import ArticleCard from './ArticleCard';
import Loader from './Loader'

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
        if(prevProps['*'] !== this.props['*']) {
            api.getAllArticles(this.props['*']).then(articles => {
                this.setState({articles, isLoaded:true})
            })
        }
    }

    render() {
        const {articles, isLoaded} = this.state
        if(!isLoaded) return <Loader/>
        return (
            <section>
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} articleData={article}/>
                })}
            </section>
        );
    }
}

export default ArticleList;