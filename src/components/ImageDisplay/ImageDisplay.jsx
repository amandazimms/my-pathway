import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom"; 
import { Button } from '@mui/material';

function ImageDisplay(props) {
  /*
    This is how we are currently displaying most profile pics on the app
    Currently we are making a call to AWS every time a picture is displayed on a page

    A better way would be to store the resulting looooooong data string (look for setPhoto(result) )
    in a reducer and 
      - at least for the user's own profile picture for the duration they're logged in
      - and maybe for when a user enters chat with another user, store that other user's temporarily
          instead of fetching it every time they send a new chat
    
    Sorry we ran out of time to do it this way ^

    See also: Compare component should/could make use of this logic and be DRYer
  */
  const url = props.url;
  const classToPass = props.classToPass;
  const [photo, setPhoto] = useState(props.url || '/images/profile_default.png');

  //How to use this component
  // <ImageDisplay
  //   url={/bla/bloopity/bling}
  //   classToPass={"mySpecialCssClass"}
  // />

  //I also created some broad clasees in app.css, 
  //you can pass these and or of course ANY other(s) for the class:
  //   largeImageDisplay (500x500), mediumImageDisplay (300x300), 
  //   smallImageDisplay (150x150), tinyImageDisplay (50x50)
  //   roundImage, blueBorder etc.

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
    <>
      <img src={photo} className={classToPass}/>
    </>
  );
}

export default ImageDisplay;
