import React, { Component } from 'react';
import {Router,Navigate} from '@reach/router'
import styled from 'styled-components'
import * as api from '../utils/api'
import ArticleCard from './ArticleCard';
import Loader from './Loader'
import Select from './Select'
import SingleArticle from './SingleArticle';
import { Button} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ErrorDisplay from './ErrorDisplay';

class ArticleList extends Component {
    state = {
        articles: [],
        isLoaded: false,
        page:1,
        err: '',
        sortBy:'created_at'
    }

    Section = styled.section`
        display:flex;
        flex-direction:row;
        flex-direction:row-reverse;
        align-items:flex-start;
        justify-content:center;
        flex-wrap:wrap;
    `

    componentDidMount() {
        this.getArticles()
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.topicSlug !== this.props.topicSlug || prevState.page !== this.state.page) {
            window.scrollTo(0, 0)
            this.getArticles()
        }
    }

    clickHandler = event => {
        const direction = event.target.innerText === 'NEXT' ? 1 : event.target.innerText === 'PREVIOUS' ? -1 : 0
        this.setState(currentState => {
          return { page: currentState.page + direction, isLoaded: false };
        });
      };
    
    handleSelectChange = (event) => {
        this.setState({sortBy:event.target.value})
    }

    handleSelectSubmit = (event) => {
        event.preventDefault()
        this.setState({isLoaded:false})
        this.getArticles()
        
    }

    getArticles = () => {
        api.getAllArticles(this.props,this.state).then(articles => {
            this.setState({articles, isLoaded:true,sortBy:'created_at'})
        }).catch(({response:{data:{msg}}}) => {
            this.setState({err:msg,isLoaded:true})
        })
    }

    render() {
        const {articles, isLoaded, err} = this.state
        const colors = ['26547C','EF476F','FFD166','06D6A0']
        if(!isLoaded) return <Loader/>
        if(err) return <ErrorDisplay/>
        return (
            <this.Section>
                <Router>
                    <SingleArticle path=':article_id' colors={colors} user={this.props.user}/>
                </Router>
                <article>
                <Select handleSubmit={this.handleSelectSubmit} handleChange={this.handleSelectChange}/>
                    {articles.map((article, index) => {
                        return <ArticleCard key={article.article_id} articleData={article} color={colors[index%4]}/>
                    })}
                    {this.state.page > 1 &&
                        <Button
                            variant='outlined'
                            startIcon={<NavigateNextIcon />}
                            onClick={this.clickHandler}
                        >
                            Previous
                        </Button>}
                        <Button
                            variant='outlined'
                            startIcon={<NavigateNextIcon />}
                            onClick={this.clickHandler}
                        >
                            Next
                        </Button>
                </article>
            </this.Section>
        );
    }
}

export default ArticleList;