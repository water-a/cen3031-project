import React, { Component } from 'react';

import './OrderForm.css';
import { SelectionBox } from '../../components/SelectionBox';
import { UploadBox } from '../../components/UploadBox';
import { Carousel } from '../../components/Carousel';
import { OrderFormContext } from '../../components/OrderFormContext';

class OrderForm extends Component {
  render() {
    return (
      <OrderFormContext.Provider className="Order">
        <Carousel 
          slides={[
            {
              slide: <UploadBox />,
              name: 'Upload',
              icon: 'file-upload',
            },
            {
              slide: <SelectionBox
                key="Material" 
                items={['Gloss', 'Matte', 'Custom']} 
                render={(item, index) => <div key={index} className="Selection"><b>{item}</b></div>} 
              />,
              name: 'Material',
              icon: 'sticky-note',
            },
            {
              slide: 
                <SelectionBox 
                  key="Size"
                  items={[
                    {
                      name: 'Large',
                      size: {
                        height: 100,
                        width: 100
                      } 
                    },
                    {
                      name: 'Medium',
                      size: {
                        height: 50,
                        width: 50
                      } 
                    },
                    {
                      name: 'Small',
                      size: {
                        height: 10,
                        width: 10
                      } 
                    },
                    {
                      name: 'Custom'
                    }
                  ]} 
                  render={(item, index) => <div key={index} className="Selection"><b>{item.name}</b>{item.size && <><br />{item.size.height + 'x' + item.size.width}</>}</div>} 
                />,
              name: 'Size',
              icon: 'ruler-combined',
            },
            {
              slide: <div><h1 style={{textAlign: "center"}}>Your estimate is</h1><span style={{fontSize: "5rem", color: "#00F4AC", textAlign: "center", display: "block"}}>$100</span></div>,
              name: 'Estimate',
              icon: 'dollar-sign',
            }
          ]}
        />
      </OrderFormContext.Provider>
    );
  }
}

export default OrderForm;
