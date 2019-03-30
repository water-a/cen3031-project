import React, { Component } from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { withGlobalState } from 'react-globally';
import swal from 'sweetalert';

class Estimate extends Component {
    constructor(props){
        super(props);
        this.state = {
            estimate: null
        }; 
        fetch('/api/orders/estimate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                height: this.props.globalState.size.item.height,
                width: this.props.globalState.size.item.width,
                material: this.props.globalState.material.item
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.status === 'success'){
                this.setState({
                    estimate: json.response
                });
            } else {
                swal("Oops something happened!", json.message, "error");
            }
        });
    }
    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Your estimate is</h1>
                <span style={{fontSize: "5rem", color: "#FBC7C4", textAlign: "center", display: "block"}}>${this.state.estimate ? this.state.estimate : <Spinner size={SpinnerSize.large} />}</span>
            </div>
        );
    }
}

export default withGlobalState(Estimate);