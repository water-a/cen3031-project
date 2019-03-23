import React, { Component } from 'react';
import './Selection.css';



class Choice extends Component{

    constructor(props){
        super(props);
        this.state ={}
    }

    onMouseOver(elem){
        this.props.onHover(this.props.index);
    };

    render()
    {
        //renders a choice object based on the property value & calls the
        //function when the mouse scropps over it
        return(
            <div 
                className="choice"
                onMouseOver={this.onMouseOver} >
                    {this.props.val}
            </div>
        )
    }
}

class Selection extends Component
{
    constructor(props){
        super(props);
        this.state = {
            selected: '', //one Choice component that is currently selected
            hover: ''
        };
    }

    getHoverState(index) 
    {
        if(this.state.hover - 1 === index || this.state.hover + 1 === index){
            return "sibling";
        } else if(this.state.hover === index) {
            return "current";
        }
        return "";
    }

    onHover(index){
        this.setState({

        })
    }


    render() {
        return (
            <div className="selection_pane">
                
            </div>
        )
    }


}

export default Selection;
