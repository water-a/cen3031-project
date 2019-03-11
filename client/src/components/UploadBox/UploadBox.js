import React, { Component } from 'react';
import './UploadBox.css';

import { Text } from 'office-ui-fabric-react/lib/Text';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { PrimaryButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';


class UploadBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      start: true,
      title: 'Select your material',
      items: [
        {
          name: 'Matte',
          image: 'http://placehold.it/150x150'
        },
        {
          name: 'Gloss',
          image: 'http://placehold.it/150x150'
        },
        {
          name: 'ExMaterial1',
          image: 'http://placehold.it/150x150'
        },
        {
          name: 'ExMaterial2',
          image: 'http://placehold.it/150x150'
        }
      ],
      backVisible: false
    };
  }
  
  _onRenderCell = (item, index) => {
    // Split into component
    return (
      <div className="ListItem">
        <Image src={item.image} />
        <span className="ListName">{item.name}</span>
      </div>
    );
  }

  _uploadNowClicked = () => {
    this.setState({
      start: false
    });
  }

  _materialNextClicked = () => {
    this.setState({
      title: 'Select your size',
      items: [
        {
          name: '320x320',
          image: 'http://placehold.it/150x150'
        },
        {
          name: '150x150',
          image: 'http://placehold.it/150x150'
        },
        {
          name: '80x90',
          image: 'http://placehold.it/150x150'
        },
        {
          name: '10x10',
          image: 'http://placehold.it/150x150'
        },
      ],
      backVisible: true
    });
  }

  _sizeBackClicked = () => {
    this.setState({
      title: 'Select your material',
      items: [
        {
          name: 'Matte',
          image: 'http://placehold.it/150x150'
        },
        {
          name: 'Gloss',
          image: 'http://placehold.it/150x150'
        },
        {
          name: 'ExMaterial1',
          image: 'http://placehold.it/150x150'
        },
        {
          name: 'ExMaterial2',
          image: 'http://placehold.it/150x150'
        }
      ],
      backVisible: false
    });
  }

  render() {
    let content = (
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Text style={{textAlign: "center", display: "block"}} variant="xLarge">Print your thingy today!!!</Text>
        <CompoundButton
          primary={true}
          secondaryText="get your posters today"
          onClick={this._uploadNowClicked}
        >
          Upload now!
        </CompoundButton>
      </div>
    );
    if (!this.state.start){
      content = (
        <div>
          <Text variant="xLarge">{this.state.title}</Text>
          <List
            items={this.state.items}
            onRenderCell={this._onRenderCell}
          />
          <PrimaryButton
            style={{float: "right", marginTop: "20px"}}
            text="next"
            onClick={this._materialNextClicked}
          />
          {this.state.backVisible ? <PrimaryButton
            style={{float: "left", marginTop: "20px", marginLeft: "1%"}}
            text="back"
            onClick={this._sizeBackClicked}
          /> : false}
        </div>
      );
    }
    return (
      <div className="UploadBox">
        {content}
      </div>
    );
  }
}

export default UploadBox;
