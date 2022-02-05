import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PhotoCapture from '../PhotoCapture/PhotoCapture';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

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
        exam_id: 1 //replace with line below when exams are working
        // exam: store.exam.selected.id
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
        exam_id: store.exam.selected.id,
        done: () => {
          history.push('/compare')
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
          <h2>Capture Photo</h2>
          <PhotoCapture />
          {store.image.url === "/images/profile_default.png" ?
            <></> :
            <Button variant="outlined" onClick={setExamPhoto}>Use Photo</Button>
          }
        </>
      }
      {photoComplete === true && idComplete === false?
        <>
          <h2>Capture ID</h2>
          <PhotoCapture />
          {store.image.url === "/images/profile_default.png" ?
            <></> :
            <Button variant="outlined" onClick={setIdPhoto}>Use ID Image</Button>
          }
        </>:
        <></>
      }
    </div>
  );
}

export default validateFunction;
