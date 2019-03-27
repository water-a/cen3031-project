import React, { Component } from 'react';
import './Carousel.css';

class Carousel extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            slides: props.slides
        };
    }
    render() {
        return (
            <div className="Carousel">
                
            </div>
        );
    }
}

export default Carousel;
