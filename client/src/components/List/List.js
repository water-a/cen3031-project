import React, { Component } from 'react';
import './List.css';

class List extends Component {
  render() {
    return (
      <div className="List">
        {this.props.items.foreach((item) => this.props._onRenderItem(item))}
      </div>
    );
  }
}

export default List;
