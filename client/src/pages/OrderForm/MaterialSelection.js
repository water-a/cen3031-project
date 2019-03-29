import React, { Component } from 'react';
import { SelectionBox } from '../../components/SelectionBox';
import { withGlobalState } from 'react-globally';
import swal from 'sweetalert';

class MaterialSelectionBox extends Component {
    constructor(props){
        super(props);
        let materials = this.props.materials.slice(0);
        materials.push('Custom');
        this.state = {
            materials: materials
        }; 
    }
    _renderMaterialSelection = (item, index) => {
        if (index == this.state.materials.length - 1){
            return (
                <>
                    <b>{item}</b>
                    {this.props.globalState.material.custom && (<>{this.props.globalState.material.custom}</>)}
                </>
            );
        }
        return (
            <b>{item}</b>
        );
    }
    _onSelectMaterial = (item, index) => {
        if (index == this.state.materials.length - 1){
            swal({
                text: 'What material would you like to use?',
                content: "input"
            }).then(material => {
                this.props.setGlobalState(() => ({
                    material: {
                        index: index,
                        item: material,
                        custom: material
                    }
                }));
            });
        } else {
            this.props.setGlobalState(() => ({
                material: {
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
                key="Material" 
                items={this.state.materials} 
                render={this._renderMaterialSelection} 
                index={this.props.globalState.material.index}
                onSelect={this._onSelectMaterial}
            />
        );
    }
}

let MaterialSelection = withGlobalState(MaterialSelectionBox);

export { MaterialSelection };