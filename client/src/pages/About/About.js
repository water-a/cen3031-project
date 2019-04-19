import React, { Component } from 'react';
import profile from '../../img/profile.jpg';
import './About.css';
import { withGlobalState } from 'react-globally';
import remark from 'remark';
import remark2react from 'remark-react';

const breaks = require('remark-breaks');

class About extends Component {
  render() {
    return (
      <div className="About">
        <img alt="Danielle Petree" src={profile} height="150px" width="150px" />
        {
          this.props.globalState.options.content &&
          remark()
            .use(breaks)
            .use(remark2react)
            .processSync(this.props.globalState.options.content.about).contents
        }
      </div>
    );
  }
}

export default withGlobalState(About);
