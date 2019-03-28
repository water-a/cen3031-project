import React, { Component } from 'react';
import './UploadBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UploadBox extends Component {
    render() {
        return (
            <div className="UploadBox">
                <div className="Dropzone">
                    <div className="Message">
                        <FontAwesomeIcon icon="plus" size="6x" />
                        Drop files here or click to upload
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadBox;
