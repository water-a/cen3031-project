import React, { Component } from 'react';


class ImageUpload extends React.Component
{

    constructor(props){
        super(props)
        //has states of the actual image file and also the image url, 
        //so itll store both of those
        this.state = {file: '', image_url: ''}
    }


    _handleSubmit(e) 
    //will be able to mess with the middleware to send the actual file to the backend! :)
    {
        e.preventDefault();
        // TODO: do something with the file!!! -> this.state.file
        console.log('handle uploading-', this.state.file);
      }


    _handleImageChange(e){
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


    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} alt = "this was uploaded"/>);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
    
        return (
          <div className="previewComponent">
            <form onSubmit={(e)=>this._handleSubmit(e)}>
              <input name="photo_uploaded" className="fileInput" 
              //you will then be able to access the photo via the express request object using the name photo_uploaded
              // req.photo_uploaded
              //onChange even happens when the value or state of the thing has changed
              //so onChange, call the handle image change function, passes the ...?
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} /> 

              <button className="submitButton" 
                type="submit" 
                onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
            </form>
            <div className="imgPreview">
              {$imagePreview}
            </div>
          </div>
        )
    }
    
    //ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));

}

