import React, { Component } from 'react';
import './OrderForm.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends Component {
  render() {
    return (
      <div className="Order">
        {/* Move into seperate component! */}
        {/* Make it look prettier? */}
        <h2>Start ordering your print now</h2>
        <br />
        <div className="Dropzone">
          <div className="Message">
            <FontAwesomeIcon icon="plus" size="6x" />
            Drop files here or click to upload
          </div>
        </div>
      </div>
    );
  }
}

export default App;
