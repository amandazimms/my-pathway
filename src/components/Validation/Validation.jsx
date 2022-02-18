import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PhotoCapture from '../PhotoCapture/PhotoCapture';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './Validation.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function validateFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Validation');
  const [photoComplete, setPhotoComplete] = useState(false)
  const [idComplete, setIdComplete] = useState(false)


  let dispatch = useDispatch()

  const postImageData = async () => {
      const url = store.image.url;
      console.log('url = ', url);
      return await fetch(url,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'jpeg'
        },
        body: store.image.data
      });
    }

  const setExamPhoto = async () => {
    console.log('in setExamPhoto');
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
    console.log('in setExamPhoto');
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
      {photoComplete ?
        <></> :
        <>
          <h2 className="heading">Please Capture A Headshot for ID Confirmation:</h2>
          <div className="flexParent photoDiv">
            <PhotoCapture />
          </div>
          <div className="flexParent">

          <div className="a100pxSpacer"></div>

          {store.image.url === "/images/profile_default.png" ?
            <></> :
            <Button className='photoDiv' variant="contained" onClick={setExamPhoto}>Use This Headshot</Button>
          }
          </div>
        </>
      }
      {photoComplete === true && idComplete === false?
        <>
          <h2>Please Capture A Photo of Your State ID or Passport:</h2>
          <div className="flexParent photoDiv">
            <PhotoCapture />
          </div>
          <div className="flexParent">

          <div className="a100pxSpacer"></div>

          {store.image.url === "/images/profile_default.png" ?
            <></> :
            <Button className='photoDiv' variant="contained" onClick={setIdPhoto}>Use This ID Image</Button>
          }
          </div>
        </>:
        <></>
      }
    </div>
  );
}

export default validateFunction;
