import React, { Component } from 'react';
import './UploadBox.css';
import { ImageUpload } from '../ImageUpload/index.js';

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
      backVisible: false,
      reciept: false
    };
  }
  
  _onRenderCell = (item, index) => {
    // Split into component
    return (
      <div className="ListItem">
        <Image width="100%" src={item.image} />
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
    if (this.state.backVisible){
      this.setState({
        reciept: true
      });
    } else {
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
        <Text style={{ textAlign: "center", display: "block", fontWeight: "bold"}} variant="xxLarge">Welcome to Petree's Prints</Text>
        <br />
        <Text variant="mediumPlus">Get your extraordinarily large prints printed today with Petree's Prints!<br /><br />We are a local Gainesville print shop that specializes in large prints!</Text>
        <br />

          <ImageUpload next={this._uploadNowClicked} />
        </div>
    );
    if (this.state.reciept){
      content = (
        <div>
          <div style={{padding: "10px"}}>
            <Text variant="xLarge">Your receipt:</Text>
            <br />
            <Image src="http://placehold.it/150x150" />
            <Text variant="medium">320x320 - $40</Text>
            
          </div>
          <br />
          <PrimaryButton
            style={{display: "block", margin: "20px auto"}}
            text="Continue to PayPal"
          />
        </div>
      );
    } else if (!this.state.start){
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
