import React, { Component } from 'react';
import {Router} from '@reach/router'
import { Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArticleCard from './ArticleCard';
import Loader from './Loader'
import SingleArticle from './SingleArticle';
import ErrorDisplay from './ErrorDisplay';
import * as api from '../utils/api'
import NewArticle from './NewArticle';
import {Section} from '../styledComponents/Section'

class ArticleList extends Component {
    state = {
        articles: [],
        isLoaded: false,
        page:1,
        err: '',
        totalCount:0
    }



    componentDidMount() {
        this.getArticles()
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.topicSlug !== this.props.topicSlug || prevProps.user !== this.props.user || prevProps.sortBy !== this.props.sortBy ) {
            window.scrollTo(0, 0)
            this.setState({page:1},()=>{ this.getArticles()})
        } else if(prevState.page !== this.state.page) {
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

    getArticles = () => {
        api.getAllArticles(this.props,this.state).then(({articles,totalCount}) => {
            this.setState({articles, totalCount, isLoaded:true})
        }).catch(({response:{data:{msg}}}) => {
            this.setState({err:msg,isLoaded:true})
        })
    }

    postArticle = (article) => {
        return api.postNewArticle(article,this.props.user).then(article => {
            this.setState(currentState => {
                return {
                    articles:[article,...currentState.articles]
                }
            })
        })
    }

    render() {
        const {articles, isLoaded, err,totalCount,page} = this.state
        const colors = ['#26547C','#EF476F','#E1BC29','#3BB273']
        if(!isLoaded) return <Loader/>
        if(err) return <ErrorDisplay/>
        return (
            <Section>
                <Router>
                    <SingleArticle path=':article_id' colors={colors} user={this.props.user}/>
                    <NewArticle path='/new-article' postArticle={this.postArticle}/>
                </Router>
                <article>
                    {articles.map((article, index) => {
                        return <ArticleCard key={article.article_id} articleData={article} color={colors[index%4]} isLoaded={this.isLoaded} user={this.props.user}/>
                    })}
                    {page > 1 &&
                        <Button
                            variant='outlined'
                            startIcon={<NavigateBeforeIcon />}
                            onClick={this.clickHandler}
                        >
                            Previous
                        </Button>}
                        {(totalCount-(page * 10)>0) && <Button
                            variant='outlined'
                            startIcon={<NavigateNextIcon />}
                            onClick={this.clickHandler}
                        >
                            Next
                        </Button>}
                </article>
            </Section>
        );
    }
}

export default ArticleList;