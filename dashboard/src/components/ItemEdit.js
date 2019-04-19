import React, { Component } from 'react';

class ItemEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: this.props.items
        };
    }
    componentWillReceiveProps(props){
        this.setState({
            items: props.items
        });
    }
    render(){
        return (
            <div style={this.props.style} className="Items">
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h3 style={{margin: 0}}>{this.props.title}</h3>
                    <button 
                        style={{
                            width: '100px',
                            fontSize: '1rem',
                            margin: 'auto',
                            marginRight: '0'
                        }} 
                        className="btn btn-success btn-block"
                        onClick={this.props.add}
                    >Add</button>
                </div>
                <hr />
                <div style={{height: '200px', overflowY: 'auto'}}>
                    {this.state.items.length > 0 ?
                    this.state.items.map((value, index) => <li key={index} style={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
                        {this.props.render ? this.props.render(value, index) : <span style={{margin: 0}}>{value}</span>}
                        <button 
                            style={{
                                width: '100px',
                                fontSize: '1rem',
                                margin: 'auto',
                                marginRight: '0'
                            }}
                            className="btn btn-danger btn-block" 
                            onClick={this.props.delete.bind(this, value, index)}
                        >Delete</button>
                    </li>):
                    <span>No items available</span>}
                </div>
            </div>
        );
    }
}

export default ItemEdit;