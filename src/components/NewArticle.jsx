import React, { Component } from 'react';
import { navigate } from '@reach/router';
import * as api from '../utils/api'

class NewArticle extends Component {

    state= {
        title:'',
        topic: '',
        article: ''
    }

    goBack = () => {
        navigate('/articles')
    }

    handleChange = ({target:{name,value}}) => {
        this.setState({[name]:value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        return this.props.postArticle(this.state,this.props.user)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title: <input name='title' onChange={this.handleChange}></input>
                </label>
                <label>
                    Topic: <input name='topic' onChange={this.handleChange}></input>
                </label>
                <label>
                    Article: <textarea name='article' rows='5' cols='50' onChange={this.handleChange}></textarea>
                </label>
                <button onClick={this.goBack}>Back</button>
                <button type='submit'>Submit</button>
            </form>
        );
    }
}

export default NewArticle;