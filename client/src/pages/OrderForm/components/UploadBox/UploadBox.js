import React, { Component } from 'react';
import './UploadBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withGlobalState } from 'react-globally'

class UploadBox extends Component {
    constructor(props){
        super(props);
        this.reader = new FileReader();
        this.reader.onload = (event) => {
            this.props.setGlobalState({
                preview: event.target.result
            });
        }
    }
    _onClick = () => {
        this.refs.upload.click();
    }
    _onChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];
        if (file){
            this.reader.readAsDataURL(file);
            this.props.setGlobalState(() => ({
                image: file
            }));
        }
    }
    render() {
        let content = (
            <>
                <FontAwesomeIcon icon="plus" size="6x" />
                Drop files here or click to upload
            </>
        );
        if (this.props.globalState.preview){
            content = (
                <div className="Preview">
                    <img alt={this.props.globalState.image.name} src={this.props.globalState.preview} />
                    <span>{this.props.globalState.image.name}</span>
                </div>
            );
        }
        return (
            <div className="UploadBox">
                <div className="Dropzone" onClick={this._onClick}>
                    <div className="Message">
                        <input type="file" ref="upload" onChange={this._onChange} />
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

export default withGlobalState(UploadBox);
