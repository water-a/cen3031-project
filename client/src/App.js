import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { PromiseProvider } from 'mongoose';

class Slider extends Component {

  renderContentSlider(cnt){
    return(
      <button className = 'content-slider'> 
        {cnt}
      </button>

    )
   
  }
  render() {
    return (
      <div>
        {this.renderContentSlider("madison")}
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default Slider;
