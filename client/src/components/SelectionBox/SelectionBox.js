import React, { Component } from 'react';
import classNames from 'classnames/bind';
import './SelectionBox.css';

class SelectionBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: null,
            items: this.props.items
        };
        this._renderItem = this.props.render;
        this._onSelect = this.props.onSelect;
    }
    _select = (item, index) => {
        this.setState({
            index: index
        });
        this._onSelect && this._onSelect(item, index);
    }
    render(){
        return (
            <div className="SelectionBox">
                {this.state.items.map((item, index) => (
                    <div key={index} onClick={this._select.bind(this._select, item, index)} className={classNames(['Selection', index === this.state.index && 'Active'])}>
                        {this._renderItem(item, index)}
                    </div>
                ))}
            </div>
        );
    }
}

export default SelectionBox;
