import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';

class App extends Component {
  render() {
    return (
      <main className='App'>
        <Header />
        <Navbar />
        <Router>
          <ArticleList path='/' />
        </Router>
      </main>
    );
  }
}

export default App;
