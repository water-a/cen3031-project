import React, { Component } from 'react';
import './OrderForm.css';
import { UploadBox } from '../../components/UploadBox';

class App extends Component {
  render() {
    return (
      <div className="Order">
        <UploadBox />
      </div>
    );
  }
}

export default App;
