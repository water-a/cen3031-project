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
            let canVisit = this._canVisit(index);
            return (
                <li 
                    style={{cursor: canVisit ? 'pointer' : 'index'}} 
                    onClick={canVisit ? this._set.bind(this, index) : undefined} 
                    key={step} 
                    className={classnames}
                >
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
    _canVisit = (index) => {
        if (index === 0){
            return true;
        }
        let current = this.props.slides[index - 1];
        return React.isValidElement(current) || (current.preNext && current.preNext());
    }
    _set = (index) => {
        this.setState({
            index: Math.min(Math.max(index, 0), this.props.slides.length - 1)
        });
    }
    _back = () => {
        this._set(this.state.index - 1);
    }
    _next = () => {
        this._set(this.state.index + 1);
    }
    render() {
        let current = this.state.slides[this.state.index];
        let slide = current;
        let enabled = true;
        let actions;
        if (!React.isValidElement(current)){
            slide = current.slide;
            actions = current.actions;
            if (current.preNext){
                enabled = current.preNext();
            }
        }
        return (
            <div className="Carousel">
                <ul className="Progress">
                    {this._renderProgressSteps()}
                </ul>
                {slide}
                <br />
                {this.state.index > 0 && <CompoundButton onClick={this._back} secondaryText="Return to the previous screen">Back</CompoundButton>}
                {this.state.index < this.props.slides.length - 1 && <CompoundButton style={{float: "right"}} disabled={!enabled} onClick={this._next} secondaryText="Continue to the next screen">Next</CompoundButton>}
                {actions}
            </div>
        );
    }
}

export default Carousel;
