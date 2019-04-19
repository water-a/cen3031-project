import React, { Component } from 'react';

class Messages extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        };
    }
    componentDidMount(){
        fetch('/api/contact')
            .then(response => response.json())
            .then(json => {
                if (json.status === 'success'){
                    this.setState({
                        messages: json.response
                    });
                }
            });
    }
    render(){
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Messages</h2>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Order Id</th>
                                <th>Message</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.messages.length === 0 ? 
                            <tr><td>No messages available</td></tr> : 
                            this.state.messages.map(message => (
                                <tr>
                                    <td>{message.email}</td>
                                    <td>{message.orderId.length ? message.orderId : 'Not available'}</td>
                                    <td>{message.issue}</td>
                                    <td>{message.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Messages;