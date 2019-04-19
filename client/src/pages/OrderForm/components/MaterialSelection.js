import React, { Component } from 'react';
import SelectionBox from '../../../components/SelectionBox';
import { withGlobalState } from 'react-globally';
// import swal from 'sweetalert';

class MaterialSelection extends Component {
    constructor(props){
        super(props);
        let materials = this.props.materials.slice(0);
        // materials.push({
        //     name: 'Custom'
        // });
        this.state = {
            materials: materials
        }; 
    }
    _renderMaterialSelection = (item, index) => {
        // if (index === this.state.materials.length - 1){
        //     return (
        //         <>
        //             <b>{item.name}</b>
        //             {this.props.globalState.material.custom && (<>{this.props.globalState.material.custom}</>)}
        //         </>
        //     );
        // }
        return (
            <>
                <b>{item.name}</b>
                <span>${item.costPerArea}/in<sup>2</sup></span>
            </>
        );
    }
    _onSelectMaterial = async (item, index) => {
        return new Promise((resolve, reject) => {
            // if (index === this.state.materials.length - 1){
            //     swal({
            //         text: 'What material would you like to use?',
            //         content: "input"
            //     }).then(material => {
            //         if (material){
            //             this.props.setGlobalState(() => ({
            //                 material: {
            //                     index: index,
            //                     item: material,
            //                     custom: material
            //                 }
            //             }));
            //             resolve(true);
            //         } else {
            //             resolve(false);
            //         }
            //     })
            // } else {
                this.props.setGlobalState(() => ({
                    material: {
                        index: index,
                        item: item,
                        custom: null
                    }
                }));
                resolve(true);
            // }
        });
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

export default withGlobalState(MaterialSelection);