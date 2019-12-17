import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import Navbar from './components/Navbar';

class App extends Component {
  state = {
    user: 'jessjelly'
  };
  render() {
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
