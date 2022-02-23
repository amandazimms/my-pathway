import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PhotoCapture from '../PhotoCapture/PhotoCapture';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './Validation.css'

function validateFunction(props) {
  /*
    Component for student taking a pic of their face, then their ID, before an exam
  */
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Validation');
  const [photoComplete, setPhotoComplete] = useState(false)
  const [idComplete, setIdComplete] = useState(false)


  let dispatch = useDispatch()

  const postImageData = async () => {
      const url = store.image.url;
      // console.log('url = ', url);
      return await fetch(url,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'jpeg'
        },
        body: store.image.data
      });
    }

  const setExamPhoto = async () => {
    // console.log('in setExamPhoto');
    await postImageData()
    dispatch({
      type: 'SET_EXAM_PHOTO',
      payload: {
        url: store.image.url.split('?')[0],
        user_id: store.user.id,
        exam_id: store.exam.selected.exam_id
      }
    })
    dispatch({
      type: 'UNSET_IMAGE_DATA'
    })
    dispatch({
      type: 'UNSET_IMAGE_URL'
    })
    setPhotoComplete(true)
  }
  
  const history = useHistory()

  const setIdPhoto = async () => {
    await postImageData()
    dispatch({
      type: 'SET_ID_PHOTO',
      payload: {
        url: store.image.url.split('?')[0],
        user_id: store.user.id,
        exam_id: store.exam.selected.exam_id,
        done: () => {
          history.push('/exam-room')
        }
      }
    })
    dispatch({
      type: 'UNSET_IMAGE_DATA'
    })
    dispatch({
      type: 'UNSET_IMAGE_URL'
    })
    setIdComplete(true)
  }

  return (
    <div>
      {photoComplete 
        ?
        //if the photo is already taken, display nothing
        <></> 
        :
        //otherwise, show instructions and ability to capture a pic
        <>
          <h2 className="heading">Please Capture A Headshot for ID Confirmation:</h2>
          <div className="flexParent photoDiv">
            <PhotoCapture />
          </div>
          <div className="flexParent">

          <div className="a100pxSpacer"></div>

          {store.image.url === "/images/profile_default.png" 
            ?
            //if the default image is still the one stored, display nothing
            <></> 
            :
            //otherwise (since a 'real image' must be stored), display a button asking user to use this image
            <Button className='photoDiv' variant="contained" onClick={setExamPhoto}>Use This Headshot</Button>
          }
          </div>
        </>
      }
      {
        photoComplete === true && idComplete === false
        ?
        <>
          <h2>Please Capture A Photo of Your State ID or Passport:</h2>
          <div className="flexParent photoDiv">
            <PhotoCapture />
          </div>
          <div className="flexParent">

          <div className="a100pxSpacer"></div>

          {   store.image.url === "/images/profile_default.png" 
            ?
              //if the default image is still the one stored, display nothing
              <></> 
            :
              //otherwise (since a 'real image' must be stored), display a button asking user to use this image
            <Button className='photoDiv' variant="contained" onClick={setIdPhoto}>Use This ID Image</Button>
          }
          </div>
        </>
        :
        <></>
      }
    </div>
  );
}

export default validateFunction;
