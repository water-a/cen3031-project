import React, { Component } from 'react';
import { withGlobalState } from 'react-globally';
import remark from 'remark';
import remark2react from 'remark-react';
const breaks = require('remark-breaks');

class FAQ extends Component {
  render() {
    return (
      <div className="FAQ">
        <h1 style={{textAlign: 'center'}}>FAQ</h1>
        {
          this.props.globalState.options.content &&
          remark()
            .use(breaks)
            .use(remark2react)
            .processSync(this.props.globalState.options.content.faq).contents
        }
      </div>
    );
  }
}

export default withGlobalState(FAQ);
