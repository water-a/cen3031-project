import React, { Component } from 'react';
import Estimate from '../../components/Estimate';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

class Success extends Component {
    constructor(props){
        super(props);
        this.state = {
            size: null,
            material: null,
            preview: null,
            shippingAddress: null,
            contact: null
        }
    }
    load = (json) => {
        this.setState({
            size: json.size,
            material: json.material,
            preview: json.preview,
            shippingAddress: json.shippingAddress,
            contact: json.contact
        });
    } 
    componentDidMount(){
        let url = new URL(window.location.href);
        let paymentId = url.searchParams.get('paymentId');
        let payerId = url.searchParams.get('PayerID');

        fetch('/api/orders/capture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                paymentId,
                payerId
            })
        })
            .then(response => response.json())
            .then(this.load);
    }
    render() {
        return (
            <div className="Success">
                {
                    this.state.size && 
                    this.state.material && 
                    this.state.preview &&
                    this.state.contact &&
                    this.state.shippingAddress ?
                    <>
                        <h1>Your order has been successful!</h1>
                        <div>
                            <b>Contact</b><br />
                            <span>{this.state.contact.firstName} {this.state.contact.lastName}</span><br />
                            <span>{this.state.contact.email}</span><br /><br />
                            <b>Shipping Address</b><br />
                            <span>{this.state.shippingAddress.line1}</span><br />
                            {this.state.shippingAddress.line2 && <><span>{this.state.shippingAddress.line2}</span><br /></>}
                            <span>{this.state.shippingAddress.city}, {this.state.shippingAddress.country} {this.state.shippingAddress.postal}</span><br />
                            <span style={{fontSize: "small"}}>(if there is an issue with this, please contact us to correct it!)</span>
                        </div>
                        <br />
                        <Estimate
                            size={this.state.size}
                            material={this.state.material}
                            preview={this.state.preview}
                        />
                    </> :
                    <Spinner />
                }
            </div>
        );
    }
}

export default Success;
