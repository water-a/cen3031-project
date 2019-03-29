import React, { Component } from 'react';
import './OrderForm.css';
import { UploadBox } from '../../components/UploadBox';
import { MaterialSelection } from './MaterialSelection';
import { SizeSelection } from './SizeSelection';
import { Carousel } from '../../components/Carousel';
import { Estimate } from './Estimate';
import { PaypalButton } from './PaypalButton';
import { Provider, withGlobalState } from 'react-globally';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

// Initial state
const initialState = {
  image: null,
  material: {
    index: null,
    item: null,
    custom: null
  },
  size: {
    index: null,
    item: null,
    custom: null
  },
}

class CarouselWrapperObject extends Component {
  constructor(props){
    super(props);
    this.state = {
      materials: null,
      sizes: null
    }
    fetch('/api/options')
    .then(response => response.json())
    .then(json => {
      this.setState({
        materials: json.response.materials,
        sizes: json.response.sizes
      });
    });
  }
  render(){
    if (this.state.materials === null || this.state.sizes == null){
      return (
        <Spinner 
          size={SpinnerSize.large} 
          label="Loading..." ariaLive="assertive"
        />
      );
    }
    return (
      <Carousel 
        slides={[
          {
            slide: <UploadBox />,
            name: 'Upload',
            icon: 'file-upload',
            preNext: () => this.props.globalState.image !== null
          },
          {
            slide: <MaterialSelection materials={this.state.materials} />,
            name: 'Material',
            icon: 'sticky-note',
            preNext: () => this.props.globalState.material.index !== null
          },
          {
            slide: <SizeSelection sizes={this.state.sizes} />,
            name: 'Size',
            icon: 'ruler-combined',
            preNext: () => this.props.globalState.size.index !== null
          },
          {
            slide: <Estimate />,
            name: 'Estimate',
            icon: 'dollar-sign',
            actions: <PaypalButton />
          }
        ]}
      />
    );
  }
}

let CarouselWrapper = withGlobalState(CarouselWrapperObject);

class OrderForm extends Component {
  render() {
    return (
      <Provider globalState={initialState}>
        <CarouselWrapper />
      </Provider>
    );
  }
}

export default OrderForm;
