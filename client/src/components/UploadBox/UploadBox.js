import React, { Component } from 'react';
import './UploadBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UploadBox extends Component {
    _onClick = () => {
        this.refs.upload.click();
    }
    _onChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];
        
    }
    render() {
        return (
            <div className="UploadBox">
                <div className="Dropzone" onClick={this._onClick}>
                    <div className="Message">
                        <input type="file" ref="upload" onChange={this._onChange} />
                        <FontAwesomeIcon icon="plus" size="6x" />
                        Drop files here or click to upload
                    </div>

                </div>
            </div>
        );
    }
}

export default UploadBox;
