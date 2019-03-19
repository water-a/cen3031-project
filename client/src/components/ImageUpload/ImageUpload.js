import React, { Component } from 'react';
import './ImageUpload.css';


class ImageUpload extends React.Component
{

    constructor(props){
        super(props)
        //has states of the actual image file and also the image url, 
        //so itll store both of those
        this.state = {file: '', image_url: ''}
    }

    _handleImageChange(e)
    {
        let reader = new FileReader(); // allows for us to read a file
        let file = e.target.files[0];  // ??? holds the actual file 

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }


    _handleSubmit(e) 
    //will be able to mess with the middleware to send the actual file to the backend! :)
    {
        e.preventDefault();
        // TODO: do something with the file!!! -> this.state.file
        //ALSO make it so that it goes to the next page, upload box function has it 

        this.setState({
          file: '',
          imagePreviewUrl: ''
        });
        console.log('handle uploading-', this.state.file);
        this.props.next();
      }


    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} alt = "this was uploaded"/>);
        }
    
       

        //you will then be able to access the photo via the express request object using the name photo_uploaded
        // req.photo_uploaded
        //onChange even happens when the value or state of the thing has changed
        //so onChange, call the handle image change function, passes the ...?

        return (
          <div className="upload-wrapper">

<label for="file-upload" class="photo-choice-btn">
    Upload photo
</label>


              <input
                //className="photo-choice-btn"
                id ="file-upload"
                type="file" 
                //name="photo_uploaded"
                //onChange={(e)=>this._handleImageChange(e)} 
              /> 

              <button className="upload-button" 
                type="submit" 
                onClick={(e)=>this._handleSubmit(e)}>Submit
              </button>



            <div className="imgPreview">
              {$imagePreview}
            </div>
          </div>
        )
    }
    
    //ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));
}   
export default ImageUpload;

