import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import * as api from './utils/api';

class App extends Component {
  state = {
    user: 'jessjelly',
    name: '',
    loggedIn: true
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    api.createUser(this.state.user, this.state.name);
    this.setState({ loggedIn: true });
  };

  render() {
    if (!this.state.loggedIn)
      return (
        <Login
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    return (
      <main className='App'>
        <Header user={this.state.user} />
        <Navbar />
        <Router>
          <ArticleList path='/articles/*' user={this.state.user} />
          <ArticleList path='topic/:topicSlug/' />
          <ArticleList path='user/:username/' />
        </Router>
      </main>
    );
  }
}

export default App;
