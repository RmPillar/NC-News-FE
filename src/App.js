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
    user: '',
    name: '',
    loggedIn: false,
    users: []
  };

  componentDidMount() {
    const userData = {
      user: localStorage.getItem('user') || '',
      name: localStorage.getItem('name') || '',
      loggedIn: localStorage.getItem('loggedIn') || false
    };
    api.getAllUsers().then(users => {
      this.setState({ ...userData, users });
    });
  }

  handleChange = ({ target }) => {
    localStorage.setItem(target.name, target.value);
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('loggedIn', true);
    if (!this.state.users.find(user => user.username === this.state.user)) {
      api.createUser(this.state.user, this.state.name);
    }
    this.setState({ loggedIn: true });
  };

  handleClick = () => {
    localStorage.clear();
    this.setState(() => {
      return {
        user: '',
        name: '',
        loggedIn: false
      };
    });
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
        <Header user={this.state.user} handleClick={this.handleClick} />
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
