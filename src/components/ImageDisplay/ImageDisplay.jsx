import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom"; 
import { Button } from '@mui/material';

function ImageDisplay(props) {
  const url = props.url;
  const classToPass = props.classToPass;
  const [photo, setPhoto] = useState('/images/profile_default.png');

  //How to use this component
  // <ImageDisplay
  //   url={/bla/bloopity/bling}
  //   class={"mySpecialCssClass"}
  // />

  //I also created some broad clasees in app.css, 
  //you can pass these and or ANY other for the class:
  //   largeImageDisplay (500x500), mediumImageDisplay (300x300), 
  //   smallImageDisplay (150x150), tinyImageDisplay (50x50)

  useEffect( () => {
    if (url === "/images/profile_default.png" || url === null || !url){ 
      //if no pic was taken, use default
      setPhoto("/images/profile_default.png");
    }
    else { 
      getPhotoToCompare();
    }
  }, []);

  const getPhotoToCompare = () =>{
      fetch(url)
      .then(response => response.body)
      .then(rb => {
        const reader = rb.getReader();
  
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then( ({done, value}) => {
                // If there is no more data to read
                if (done) {
                  // console.log('done', done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                // console.log(done, value);
                push();
              })
            }
  
          push();
        }
      });
      })
      .then(stream => {
      // Respond with our stream
      return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
      // Do things with result
        setPhoto(result)
      // console.log(result);
      });
  };

  return (
    <img src={photo} className={classToPass}/>
  );
}

export default ImageDisplay;
