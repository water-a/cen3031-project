import React, { Component } from 'react';
import { UploadBox, MaterialSelection, SizeSelection, Carousel, PaypalButton } from './components';
import Estimate from '../../components/Estimate';
import { withGlobalState } from 'react-globally';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

class CarouselWrapper extends Component {
  render(){
    if (this.props.globalState.options.materials === null || this.props.globalState.options.sizes == null){
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
            slide: <MaterialSelection materials={this.props.globalState.options.materials} />,
            name: 'Material',
            icon: 'sticky-note',
            preNext: () => this.props.globalState.material.index !== null
          },
          {
            slide: <SizeSelection sizes={this.props.globalState.options.sizes} />,
            name: 'Size',
            icon: 'ruler-combined',
            preNext: () => this.props.globalState.size.index !== null
          },
          {
            slide: <>
              <h1 style={{textAlign: "center"}}>Your Order</h1>
              <Estimate
                fetch={() => { 
                  return { 
                    material: this.props.globalState.material.item,
                    size: this.props.globalState.size.item,
                    preview: this.props.globalState.preview
                  }
                }}
              />
            </>,
            name: 'Estimate',
            icon: 'dollar-sign',
            actions: <PaypalButton />
          }
        ]}
      />
    );
  }
}

export default withGlobalState(CarouselWrapper);
