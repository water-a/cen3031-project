import React, { Component } from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import profile from '../../img/profile.jpg';
import photo from '../../img/photo.jpg';
import './About.css';
class About extends Component {
  render() {
    return (
      <div className="AboutWrapper">
        <br/><h1><strong>About Me</strong></h1><br/><br/>
        <Image src={profile} height="250px" width="300px" />
        <h2>Hi, I am Danielle Petree, nice to meet you!</h2><br/>
        <p>I am a self-employed photographer currently living in Gainesville, Florida. I like to go 
           around and bring the best of the worlds into my camera. In 2018, I got my creative photography
           degree at University of Florida. I am passionate about recording beautiful moments and make
           them eternal. Unfortunately, I had seizures that impacted my life quite bit, but this will not
           hinder my path on photography. My intension is to capture as many beautiful moments as possible
           and let them stay for years and years. So it gave me an idea of founding this printing website.
        </p><br/><br/><br/><br/>
        <h1><strong>About this website</strong></h1><br/><br/>
        <Image src={photo} height="250px" width="250px" /><br/>
        <p>At this website, you can make any photo you like substantive and keep it as a memory for years
          and years. you will simply upload the photo you want to print, select the desired material and
          size, pay for the priting fee and you are done. we will ship your precious memory to your home
          in a short time. </p><br/><br/><br/>
      </div>
    );
  }
}

export default About;
