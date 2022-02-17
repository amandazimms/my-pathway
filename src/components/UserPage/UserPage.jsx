import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { Box } from '@mui/material';
import ImageDisplay from '../ImageDisplay/ImageDisplay';



function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const store = useSelector((store) => store);
  const dispatch = useDispatch()

  useEffect( () => {
    // getProfilePicture()
  }, []);

  // const getProfilePicture = () =>{
  //   const url = store.user.profile_picture
  //   // console.log("----------->Image Path Being Used:", url );
  //   if (url != '/images/profile_default.png'){
  //     fetch(url)
  //     .then(response => response.body)
  //     .then(rb => {
  //       const reader = rb.getReader();
  
  //       return new ReadableStream({
  //         start(controller) {
  //           // The following function handles each data chunk
  //           function push() {
  //             // "done" is a Boolean and value a "Uint8Array"
  //             reader.read().then( ({done, value}) => {
  //               // If there is no more data to read
  //               if (done) {
  //                 // console.log('done', done);
  //                 controller.close();
  //                 return;
  //               }
  //               // Get the data and send it to the browser via the controller
  //               controller.enqueue(value);
  //               // Check chunks by logging to the console
  //               // console.log(done, value);
  //               push();
  //             })
  //           }
  
  //         push();
  //       }
  //     });
  //     })
  //     .then(stream => {
  //     // Respond with our stream
  //     return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
  //     })
  //     .then(result => {
  //     // Do things with result
  //     dispatch({
  //       type:'SET_PROFILE_PICTURE',
  //       payload: result
  //     })
  //       // setImageToDisplay(result)
  //     // console.log(result);
  //     });
  //   }
  // }


  return (
    <div className="flexParent">
      <Box className="flexParentVertical">
        <h2 className="heading">Welcome, {user.first_name}!</h2>
        <p>Username: {user.username}</p>
        {/* <img src={store.image.profilePicture} alt="" /> */}
        <ImageDisplay
          url={store.user.profile_picture}
          classToPass={"mediumImageDisplay roundImage blueBorderThicc"}
        />
        <br />
        <LogOutButton className="btn" />      
      </Box>
    </div>
  );
}

export default UserPage;
