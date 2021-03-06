import React, { Component } from 'react';
import Loader from './Loader'
import * as api from '../utils/api'

import styled from 'styled-components'
import { TextField, MenuItem, Button } from '@material-ui/core';

const Div = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width: 100vw;
    height: 100vh;
`

const H1 = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 450%
`
const H2 = styled.h2`
    font-family: 'Roboto', sans-serif;
    margin:5px
`
const H3 = styled.h3`
    font-family: 'Roboto', sans-serif;
    margin:5px
`

const Main = styled.main`
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin: 5vw;
    border-radius: 10px;
    background: #26547C;
    width: 20vw;
    height: 50vh;
    min-width: 300px;
    min-height: 300px;
    max-height: 500px;
    font-family: 'Roboto', sans-serif;
`

const Form = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    height: 200px;
`

const style = {
    color: '#F7FFF7',
    background: '#26547C',
    border: '2px solid #F7FFF7', 
    margin: '0px 20px 0px 20px'
}

const selectStyle = {
    width: '200px',
    height:'50px',
    background: '#F7FFF7',
}


const inputStyle = {
    width: '200px',
    margin: '10px',
    background: '#F7FFF7',
}

class Login extends Component {

    state= {
        users: [],
        isLoaded:false,
        new:false
    }

    componentDidMount() {
        api.getAllUsers().then(users => {
            this.setState(() => {
                return {users,isLoaded:true}
            })
        })
    }

    handleClick = () => {
        this.setState((currentState) => {
           return {new:!currentState.new}
        })
    }

    render() {
        const {users,isLoaded} = this.state
        if(!isLoaded) return <Loader/>
        return (
        <Div>
            <H1>NC NEWS</H1>
            <H2>Welcome!!</H2>
            <H3>To enter, please select a user from the drop down menu and click Log In</H3>
            <H3>Or to create your own user click New User, create your own custom username and click Log In</H3>
            <H3>Enjoy!</H3>
            <Main>
                
                {this.state.new && <Form onSubmit={this.props.handleSubmit}>
                        <TextField style={inputStyle} name='user' placeholder='Username' onChange={this.props.handleChange}></TextField>
                        <TextField style={inputStyle} name='name' placeholder='Name' onChange={this.props.handleChange}></TextField>
                    <div>
                        <Button variant='outlined' style={style} onClick={this.handleClick}>Existing User</Button>
                        <Button variant='outlined' style={style} type='submit'>Log In</Button>
                    </div>
                </Form>}
                {!this.state.new && <Form onSubmit={this.props.handleSubmit}>
                        <TextField style={selectStyle} select name='user' value={localStorage.getItem('user')} variant='filled' helperText='Username' onChange={this.props.handleChange}>
                        {users.map(({username}) => {
                            return<MenuItem key={username} value={username}>{username}</MenuItem>
                        })}
                        </TextField>
                    <div>
                        <Button variant='outlined' style={style} onClick={this.handleClick}>New User</Button>
                        <Button type='submit' variant='outlined' style={style}>Log In</Button>
                    </div>
                </Form>}
            </Main>

        </Div>
        );
    }
}

export default Login;
