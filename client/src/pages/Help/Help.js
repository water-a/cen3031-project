import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import './Help.css';


class Help extends Component {
  render() {
    return (
      <div className="Help">
        <section>
          <h2>Have a problem with an order?</h2>
          <TextField label="Order ID" />
          <TextField label="What was the issue?" multiline autoAdjustHeight />
          <br />
          <PrimaryButton
            className="Submit"
            allowDisabledFocus={true}
            text="Submit"
          />
        </section>
        <hr />
        <section>
          <h2>Frequently asked questions</h2>
          <h3>What materials do you offer?</h3>
          <span>We offer the following list of materials: Matte, Gloss, etc.</span>
        </section>
      </div>
    );
  }
}

export default Help;
