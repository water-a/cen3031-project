import React, { Component } from 'react';
import './UploadBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UploadBox extends Component {
    _onClick = () => {
        this.refs.upload.click();
    }
    render() {
        return (
            <div className="UploadBox">
                <div className="Dropzone" onClick={this._onClick}>
                    <div className="Message">
                        <input type="file" ref="upload"/>
                        <FontAwesomeIcon icon="plus" size="6x" />
                        Drop files here or click to upload
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadBox;
