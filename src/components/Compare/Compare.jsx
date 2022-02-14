import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Compare.css'
import { Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function compareFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch()
  const [photoToCompare, setPhotoToCompare] = useState('/images/profile_default.png')
  const [idToCompare, setIdToCompare] = useState('/images/profile_default.png')
  const [heading, setHeading] = useState('Compare Images');

  useEffect( () => {
    getPhotoToCompare()
    getIdToCompare()
}, []);

  const getPhotoToCompare = () =>{
    const url = store.exam.selected.face_image
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
        setPhotoToCompare(result)
      // console.log(result);
      });
  };

  const getIdToCompare = () =>{
    const url = store.exam.selected.id_image
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
        setIdToCompare(result)
      // console.log(result);
      });
  };

  const history = useHistory();
  
  const validateStudent = () =>{
    console.log('STUDENT APPROVED');
    dispatch({
      type: 'CONFIRM_STUDENT_ID',
      payload: {
        id_confirmed:"TRUE",
        exam_id:store.exam.selected.exam_id,
        user_id:store.user.id,
        done:()=>{
          // history.push('/events-all')
          history.goBack()
        }
      }
    })
  }

  const denyStudent = () =>{
    console.log('STUDENT DENIED');
    dispatch({
      type: 'CONFIRM_STUDENT_ID',
      payload: {
        id_confirmed:"FALSE",
        exam_id:store.exam.selected.exam_id,
        user_id:store.user.id,
        done:()=>{
          // history.push('/events-all')
          history.goBack()
        }
      }
    })
  }

  return (
    <>
      <h2 className='heading'>{heading}</h2>
      {/* <p>{JSON.stringify(store.exam.selected)}</p> */}
      <p>Please verify this student's ID</p>

      <div className="flexParent">
        <img src={photoToCompare} className='compareImage' />
        <img src={idToCompare} className='compareImage' />
      </div>

      <p>Do these appear to be the same person?</p>
      
      <div className="flexParent">
        <Button variant="outline" onClick={denyStudent}>Deny</Button>
        <Button variant="contained" onClick={validateStudent}>Approve</Button>
      </div>
    </>
  );
}

export default compareFunction;
