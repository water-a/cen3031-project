import React, { Component } from 'react';

class Orders extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: []
        }
    }
    componentDidMount(){
        this._fetchOrders();
    }
    _fetchOrders(){
        fetch('/api/orders')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    orders: json
                });
            });
    }
    _getStatusText = status => {
        switch (status){
            case 2:
                return "Order completed";
            case 1:
                return "Paid";
            default:
                return "Pending payment";
        }
    }
    _toggleOrderStatus = (order, event) => {
        event.preventDefault();
        fetch(`/api/orders/${order.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                status: order.status === 1 ? 2 : 1
            })
        })
            .then(this._fetchOrders.bind(this));
    }
    render(){
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Orders List</h2>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Preview</th>
                                <th>Status</th>
                                <th>Material</th>
                                <th>Size</th>
                                <th>Contact</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.length === 0 ? 
                            <tr><td>No orders available</td></tr> : 
                            this.state.orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td><img style={{maxHeight: "60px"}} alt="Preview" src={`/api/orders/${order.id}/preview`} /></td>
                                    <td>{this._getStatusText(order.status)}</td>
                                    <td>{order.material.name}</td>
                                    <td>{`${order.size.height}x${order.size.width}`}</td>
                                    <td>
                                        {order.contact ?
                                            <>
                                                {order.contact.firstName + ' ' + order.contact.lastName}<br />
                                                {order.contact.email}
                                            </> :
                                            'Not available'
                                        }
                                    </td>
                                    <td>
                                        {order.shippingAddress ?
                                            <>
                                                {order.shippingAddress.line1}<br />
                                                {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
                                                {order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.postal}
                                            </> :
                                            'Not available'
                                        }
                                    </td>
                                    <td>
                                        <a href={`/api/orders/${order.id}/preview?download`}>Download</a>
                                        {order.status > 0 && 
                                            <>
                                                <br />
                                                <a href="#toggle" onClick={this._toggleOrderStatus.bind(this, order)}>
                                                    Mark {(order.status === 1 ? '' : 'not ') + 'completed'}
                                                </a>
                                            </>
                                        }
                                    </td>
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