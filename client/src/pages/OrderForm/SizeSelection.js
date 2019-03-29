import React, { Component } from 'react';
import { SelectionBox } from '../../components/SelectionBox';
import { withGlobalState } from 'react-globally';
import swal from 'sweetalert';

class SizeSelectionBox extends Component {
    constructor(props){
        super(props);
        let sizes = this.props.sizes.slice(0);
        sizes.push({
            name: 'Custom'
        });
        this.state = {
            sizes: sizes
        }; 
    }
    _renderSizeSelection = (item, index) => {
        if (index == this.state.sizes.length - 1){
            return (
                <>
                    <b>{item.name}</b>
                    {this.props.globalState.size.custom  && <>{this.props.globalState.size.custom.height + 'x' + this.props.globalState.size.custom.width}</>}
                </>
            );
        }
        return (
            <>
                <b>{item.name}</b>
                {(item.height && item.width) && item.height + 'x' + item.width}
            </>
        );
    }
    _onSelectSize = (item, index) => {
        if (index == this.state.sizes.length - 1){
            swal({
                text: 'What height would you like to use?',
                content: "input",
                attributes: {
                    type: "number"
                }
            }).then(height => {
                swal({
                    text: 'What width would you like to use?',
                    content: "input",
                    attributes: {
                        type: "number"
                    }
                }).then(width => {
                    let size = {
                        height: height,
                        width: width
                    };
                    this.props.setGlobalState(prevGlobalState => ({
                        size: {
                            index: index,
                            item: size,
                            custom: size
                        }
                    }));
                });
            });
        } else {
            this.props.setGlobalState(() => ({
                size: {
                    index: index,
                    item: item,
                    custom: null
                }
            }));
        }
    }
    render() {
        return (
            <SelectionBox 
                key="Size"
                items={this.state.sizes} 
                render={this._renderSizeSelection} 
                index={this.props.globalState.size.index}
                onSelect={this._onSelectSize}
            />
        );
    }
}

let SizeSelection = withGlobalState(SizeSelectionBox);

export { SizeSelection };