import React, { Component } from 'react';

class FAQ extends Component {
  render() {
    return (
      <div className="FAQ">
        <h1 style={{textAlign: 'center'}}>FAQ</h1>
        <h3>What materials do you offer?</h3>
        <span>We offer the following list of materials: Matte, Gloss, etc.</span>
        <h3>How large can my order be?</h3>
        <span>At the moment the largest possible size is: 100ft by 100ft</span>
        <h3>Can I pay with something other than PayPal?</h3>
        <span>No, as of now we only accept payments through PayPal.</span>
        <h3>How long will my order take?</h3>
        <span> Smaller sized orders are estimated to take 24-48 hours. Bigger sized orders are estimated to take 3-5 business days.</span>
      </div>
    );
  }
}

export default FAQ;
