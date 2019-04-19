import React, { Component } from 'react';
import SelectionBox from '../../../components/SelectionBox';
import { withGlobalState } from 'react-globally';
import swal from 'sweetalert';

class SizeSelection extends Component {
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
        if (index === this.state.sizes.length - 1 && this.props.globalState.size.custom){
            item.height = this.props.globalState.size.custom.height;
            item.width = this.props.globalState.size.custom.width;
        }
        return (
            <>
                <b>{item.height && item.width ? item.height + '\'x' + item.width + '\'' : item.name}</b>
                {item.height && item.width && '$' + (item.height * item.width * this.props.globalState.material.item.costPerArea).toLocaleString()}
            </>
        );
    }
    _onSelectSize = (item, index) => {
        return new Promise((resolve, reject) => {
            if (index === this.state.sizes.length - 1){
                swal({
                    text: 'What height would you like to use?',
                    content: {
                        element: "input",
                        attributes: {
                            type: "number"
                        }
                    }
                }).then(height => {
                    if (height){
                        swal({
                            text: 'What width would you like to use?',
                            content: {
                                element: "input",
                                attributes: {
                                    type: "number"
                                }
                            }
                        }).then(width => {
                            if (width){
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
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    } else {
                        resolve(false);
                    }
                });
            } else {
                this.props.setGlobalState(() => ({
                    size: {
                        index: index,
                        item: item,
                        custom: null
                    }
                }));
                resolve(true);
            }
        });
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

export default withGlobalState(SizeSelection);