import React, { Component } from 'react';
import './SelectionBox.css';

class SelectionBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: this.props.items
        };
        this._renderItem = this.props.render
    }
    render() {
        return (
            <div className="SelectionBox">
                {this.state.items.map((item, index) => this._renderItem(item, index))}
            </div>
        );
    }
}

export default SelectionBox;
