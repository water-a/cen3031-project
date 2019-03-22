import React, { Component } from 'react';
import './ImageUpload.css';


class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl: ''};
    }
    
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }
    
    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0]; //most recently uploaded file
    
        reader.onloadend = () => { // when the upload ends
        this.setState({
            file: file,
            imagePreviewUrl: reader.result // the whole url, not just the name of the photo
        });
        console.log(reader.result);
        }
    
        reader.readAsDataURL(file)
    }
    
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt="yours, uploaded" />);
        } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
    
        return (
        <div className="image_upload_wrapper">
            
            <form onSubmit={(e)=>this._handleSubmit(e)}>

            <input className="fileInput" 
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} />

            <button className="submitButton" 
                type="submit" 
                onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>

            </form>
            {/* <div className="imgPreview">
            {$imagePreview}
            </div> */}
        </div>
        )
    }
    }
    
    //ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));

export default ImageUpload;
