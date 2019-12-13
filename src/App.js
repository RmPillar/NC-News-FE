import React, { Component } from 'react';
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
        <ArticleList />
      </main>
    );
  }
}

export default App;
