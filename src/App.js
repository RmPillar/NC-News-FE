import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Loader from './components/Loader';
import * as api from './utils/api';

class App extends Component {
  state = {
    user: '',
    name: '',
    loggedIn: false,
    users: [],
    isLoaded: false,
    sortBy: 'created_at'
  };

  componentDidMount() {
    const userData = {
      user: localStorage.getItem('user') || '',
      name: localStorage.getItem('name') || '',
      loggedIn: localStorage.getItem('loggedIn') || false
    };
    api.getAllUsers().then(users => {
      this.setState({ ...userData, users, isLoaded: true });
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

  handleSelectChange = ({ target: { value } }) => {
    this.setState({ sortBy: value });
  };

  handleSelectSubmit = event => {
    event.preventDefault();
    const { value } = event.target[0];
    this.setState({ sortBy: value });
  };

  render() {
    if (!this.state.isLoaded) return <Loader />;
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
        <Navbar
          handleSubmit={this.handleSelectSubmit}
          handleChange={this.handleSelectChange}
        />
        <Router>
          <ArticleList
            path='/articles/*'
            user={this.state.user}
            sortBy={this.state.sortBy}
          />
          <ArticleList path='topic/:topicSlug/' sort_by={this.state.sortBy} />
          <ArticleList path='user/:username/' />
        </Router>
      </main>
    );
  }
}

export default App;
