import React, { Component } from 'react';
import './App.css';
import logo from './img/logo.png';

import { UploadBox } from './components/UploadBox/index';

import { Image } from 'office-ui-fabric-react/lib/Image';

class App extends Component {
  render() {
    return (
      <div className="Upload">
        <Image
          src={logo}
          height="300px"
          width="300px"
          alt="Example implementation with no image fit property and no height or width is specified."
        />
        <UploadBox />
      </div>
    );
  }
}

export default App;
