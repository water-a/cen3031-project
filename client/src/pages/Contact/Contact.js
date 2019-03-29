import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import swal from 'sweetalert';

class Contact extends Component {
  _submit = () => {
    swal('Success', 'Submitted your information!', 'success');
  }
  render() {
    return (
      <div className="Contact">
        <h1 style={{textAlign: 'center'}}>Contact Us</h1>
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
      </div>
    );
  }
}

export default Contact;
