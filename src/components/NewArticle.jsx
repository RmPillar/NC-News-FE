import React, { Component } from 'react';
import { navigate } from '@reach/router';
import * as api from '../utils/api'
import styled from 'styled-components'
import { TextField, MenuItem, Button} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Loader from './Loader'

class NewArticle extends Component {

    state= {
        title:'',
        topic: '',
        article: '',
        topics:[],
        isLoaded: false
    }

    Form = styled.form`
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content:space-between;
        padding: 20px 20px 20px 20px;
        margin: 0.5rem 1rem;
        height: auto;
        width: 20vw;
        min-height: 300px;
        min-width: 300px;
        font-family: 'Roboto', sans-serif;
        color: #3e3e3e;
        background: transparent;
        border: 2px solid #26547C;
        border-radius: 10px;
    `

    ButtonDiv = styled.div`
        display:flex;
        width: 200px;
        justify-content:space-between;
        margin-top:20px;
    `

    goBack = () => {
        navigate('/articles')
    }

    componentDidMount() {
        api.getAllTopics().then(topics => {
            this.setState(() => {
                return {topics, isLoaded:true}
            })
        })
    }

    handleChange = ({target:{name,value}}) => {
        this.setState({[name]:value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        return this.props.postArticle(this.state,this.props.user)
    }

    render() {
        if(!this.state.isLoaded) return <Loader/>
        return (
            <this.Form onSubmit={this.handleSubmit}>
                <TextField name='title' variant="outlined" size='small' placeholder='Title' required onChange={this.handleChange}></TextField>
                <TextField name='topic' select helperText="Please select the topic" value={this.state.topic} required onChange={this.handleChange}>
                    {this.state.topics.map(({slug}) => {
                        return<MenuItem key={slug} value={slug} >{slug}</MenuItem>
                    })}
                </TextField>
                <TextField name='article' variant="outlined" rows="10" placeholder='Article' multiline required onChange={this.handleChange}></TextField>
                <this.ButtonDiv>
                    <Button variant='outlined' startIcon={<NavigateBeforeIcon/>}onClick={this.goBack}>Back</Button>
                    <Button variant='outlined' type='submit' disabled={Boolean(!this.state.title && !this.state.topic && !this.state.article)}>Submit</Button>
                </this.ButtonDiv>
            </this.Form>
        );
    }
}

export default NewArticle;