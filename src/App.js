import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navbar />
      </div>
    );
  }
}

export default App;
