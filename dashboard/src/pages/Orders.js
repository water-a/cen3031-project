import React, { Component } from 'react';

class Orders extends Component {
    constructor(props){
    super(props);
    this.state = {
    orders: []
}
    fetch('/api/orders')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        this.setState({
        orders: json
        });
    });
}
    _getStatusText = (status) => {
    if (status === 0){
        return "Pending payment";
    } else if (status === 1){
        return "Paid";
    }
}
    render(){
        return (
            <div className="card">
                <div className="card-header">
                <h4 className="card-title">Orders List</h4>
                </div>
                <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Material</th>
                            <th>Size</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.length === 0 ? 
                        <tr><td>No orders available</td></tr> : 
                        this.state.orders.map(order => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{this._getStatusText(order.status)}</td>
                            <td>{order.material}</td>
                            <td>{`${order.size.height}x${order.size.width}`}</td>
                            <td>[Work in progress]</td>
                            <td><a href={`/api/orders/${order._id}/download`}>Download</a></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

export default Orders;