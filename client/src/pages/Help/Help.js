import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './Help.css';


class Help extends Component {
  render() {
    return (
      <div>
        {/*
        <div className="left">
        left
        </div>
        <div className="right">
        right
        </div>
        */}
        <ul class = "container">
          <div class = "left">
            <a href="#something">FAQ</a>
            <a href="#something">Whatever</a>
          </div>
          <div class = "right">
            Content
          </div>
        </ul>
      </div>
    );
  }
}

export default Help;
