import React, { Component } from 'react';

class Estimate extends Component {
    constructor(props){
        super(props);
        this.state = {
            size: props.size || { height: 0, width: 0 },
            material: props.material || { name: '', costPerArea: 0 },
            preview: props.preview || ''
        }
    }
    componentDidMount(){
        if (this.props.fetch){
            this.setState(this.props.fetch());
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ 
            size: nextProps.size || { height: 0, width: 0 },
            material: nextProps.material || { name: '', costPerArea: 0 },
            preview: nextProps.preview || ''
        });  
    }
    getArea = () => {
        return this.state.size.height * this.state.size.width;
    }
    getEstimate = () => {
        return this.getArea() * this.state.material.costPerArea;
    }
    render() {
        return (
            <div className="Estimate">
                <div className="Container">
                    <img alt="Preview" src={this.state.preview} />
                    <div className="Information">
                        <b className="Name">{this.state.size.height}'x{this.state.size.width}' {this.state.material.name} print</b>
                        <span>{this.state.material.name} - ${this.state.material.costPerArea}/in<sup>2</sup></span>
                        <span>Area - {this.getArea().toLocaleString()}in<sup>2</sup></span>
                        <span>Total - ${this.getEstimate().toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Estimate;