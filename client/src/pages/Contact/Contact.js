import React, { Component } from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import swal from 'sweetalert';

class Contact extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      orderId: '',
      issue: ''
    }
  }
  _submit = event => {
    event.preventDefault();
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(json => {
        if (json.status === 'success'){
          swal('Success', 'Submitted your information!', 'success');
          this._clearInputs();
        } else {
          swal('Error', json.message, 'error');
        }
      });
  }
  _clearInputs = () => {
    this.setState({
      email: '',
      orderId: '',
      issue: ''
    });
  }
  _handleInput = event => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(prevState => {
      return { 
        ...prevState,
        [name]: value
      }
    });
  }
  render() {
    return (
      <form method="POST" onSubmit={this._submit} className="Contact">
        <h1 style={{textAlign: 'center'}}>Contact Us</h1>
        <TextField 
          name="email" 
          type="email"  
          label="E-mail" 
          value={this.state.email}
          onChange={this._handleInput}
          required 
        />
        <i>
          <TextField 
            name="orderId" 
            label= "Order ID (optional)" 
            value={this.state.orderId}
            onChange={this._handleInput}
          />
        </i>
        <TextField 
          name="issue" 
          label="What was the issue?" 
          value={this.state.issue}
          onChange={this._handleInput}
          multiline 
          autoAdjustHeight 
          required
        />
        <br />
        <Button
          type="submit"
          className="button"
          buttonType={ButtonType.primary} 
          allowDisabledFocus={true}
          text="Submit"
        />
      </form>
    );
  }
}

export default Contact;
