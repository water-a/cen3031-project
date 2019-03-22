import React, { Component } from 'react';
import './ImageUpload.css';


class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {file: '', img_name: 'upload image'};
    }
    
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        this.setState({
            file: '',
            img_name: 'upload image'
        })
        console.log('handle uploading-', this.state.file);
    }
    
    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0]; //most recently uploaded file
    
        reader.onloadend = () => { // when the upload ends
        this.setState({
            file: file,
            img_name: file.name
        });
        console.log(reader.result);
        }
    
        reader.readAsDataURL(file)
    }
    
    render() {
        return (
            <div className="wrapper">

            <form className="image_upload_wrapper" onSubmit={(e)=>this._handleSubmit(e)}>

             
                <button 
                    className="image_upload_btn"
                    onChange={(e)=>this._handleImageChange(e)} 
                >
                    {this.state.img_name} <input type="file"/>
                </button> 
            </form>

            
            <button className="submit_btn" 
                type="submit" 
                onClick={(e)=>this._handleSubmit(e)}>submit</button>

          </div>
        )
    }
    
}

export default ImageUpload;
