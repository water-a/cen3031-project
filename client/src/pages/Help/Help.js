import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';

import './Help.css';
import { Stylesheet } from '@uifabric/styling';


class Help extends Component {

  constructor(){
    super();

    //Initial state (Just title)
    this.state = {contact: false};
    this.state = {question: false};
  }

  toggle_contact() {
    this.setState({contact: !this.state.contact});
  }
  toggle_question() {
    this.setState({question: !this.state.question});
  }

  render() {
    return (
      <div className="Help">
        <section>
          <Button 
          className = "button" 
          onClick={this.toggle_contact.bind(this)}
          Contact Us
          text = "Contact Us"
          />

          <div id="ContactExtend" className = {"collapse" + (this.state.contact ? 'in ' : '')}>
          <div>
          <TextField label="E-mail" />
          <i><TextField label= "Order ID (optional)*" /></i>
          <TextField label="What was the issue?" multiline autoAdjustHeight />
          
          <br />
          <Button
            className="button"
            buttonType={ ButtonType.primary} 
            allowDisabledFocus={true}
            text="Submit"
          />
          <hr />
          </div>
          </div>
        </section>
        
        <section>
          
          <Button 
          className = "button" 
          onClick={this.toggle_question.bind(this)}
          Contact Us
          text = "Fequently Asked Questions"
          />
          <div className = {"collapse" + (this.state.question ? 'in ' : '')}>
          <h3>What materials do you offer?</h3>
          <span>We offer the following list of materials: Matte, Gloss, etc.</span>
          <h3>How large can my order be?</h3>
          <span>At the moment the largest possible size is: Xx by Xx</span>
          <h3>Can I pay with something other than PayPal?</h3>
          <span>No, as of now we only accept payments through PayPal.</span>
          <h3>How long will my order take?</h3>
          <span> Smaller sized orders are estimated to take 24-48 hours. Bigger sized orders are estimated to take 3-5 business days.</span>
          </div>
        </section>
      </div>
    );
  }
}

export default Help;
