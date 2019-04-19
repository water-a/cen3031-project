import React, { Component } from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import swal from 'sweetalert';
import { withGlobalState } from 'react-globally';

class PaypalButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            process: false
        }
    }
    _submitOrder = () => {
        if (!this.state.process){
            this.setState({
                process: true
            });
            let orderData = new FormData();
            orderData.append('material', this.props.globalState.material.item.name);
            orderData.append('height', this.props.globalState.size.item.height);
            orderData.append('width', this.props.globalState.size.item.width);
            orderData.append('image', this.props.globalState.image);
            fetch('/api/orders', {
                method: 'POST',
                body: orderData
            })
            .then(response => response.json())
            .then(json => {
                if (json.status === 'success'){
                    window.location.href = json.response.redirectUrl;
                } else {
                    swal('Oops...something happened', json.message, 'error');
                    this.setState({
                        process: false
                    });
                }
            }).catch(() => {
                swal('Oops...something happened', 'Could not reach server', 'error');
                this.setState({
                    process: false
                });
            });
        }
    }
    render(){
        return (
            <CompoundButton 
                onClick={this._submitOrder} 
                style={{float: "right", width: "175px"}} 
                primary={true} 
                secondaryText={this.state.process ? '' : "Buy your print via PayPal"}
            >
                {this.state.process ? <Spinner size={SpinnerSize.large} /> : 'Purchase'}
            </CompoundButton>
        );
    }
}

export default withGlobalState(PaypalButton);