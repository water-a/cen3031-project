import React, { Component } from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import './Carousel.css';

class Carousel extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            slides: this.props.slides
        };
    }
    _renderProgressSteps = () => {
        let getClassName = (classname, step) => {
            let classes = [classname];
            let index = step - 1;
            if (index <= this.state.index){
                classes.push('Completed');
            }
            if (index === this.state.index){
                classes.push('Active');
            }
            return classNames(classes);
        }
        let getContent = (step) => {
            let index = step - 1;
            let slide = this.state.slides[index];
            let classnames = getClassName('Step', step);
            let content = step;
            if (!React.isValidElement(slide)){
                content = (<>
                    <span className="Name">{slide.name}</span>
                    <FontAwesomeIcon icon={slide.icon} />
                </>)
            }
            return (
                <li key={step} className={classnames}>
                    {content}
                </li>
            );
        }
        let steps = [getContent(1)];
        for (let step = 2; step <= this.state.slides.length; step++){
            steps.push(<li key={step + 'l'} className={getClassName('Stepline', step)} />);
            steps.push(getContent(step));
        }
        return steps;
    }
    _back = () => {
        this.setState({
            index: Math.max(this.state.index - 1, 0)
        });
    }
    _next = () => {
        this.setState({
            index: Math.min(this.state.index + 1, this.props.slides.length - 1)
        });
    }
    render() {
        let currentSlide = this.state.slides[this.state.index];
        return (
            <div className="Carousel">
                <ul className="Progress">
                    {this._renderProgressSteps()}
                </ul>
                {React.isValidElement(currentSlide) ? currentSlide : currentSlide.slide}
                <br />
                {this.state.index > 0 && <CompoundButton onClick={this._back} secondaryText="Return to the previous screen">Back</CompoundButton>}
                {this.state.index < this.props.slides.length - 1 && <CompoundButton style={{float: "right"}} onClick={this._next} secondaryText="Continue to the next screen">Next</CompoundButton>}
                {this.state.index == this.props.slides.length - 1 && <CompoundButton style={{float: "right"}} primary={true} secondaryText="Buy your print via PayPal">Purchase</CompoundButton>}
            </div>
        );
    }
}

export default Carousel;
