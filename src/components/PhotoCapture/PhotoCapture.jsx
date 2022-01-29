import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './TempPhotoCapture.css'
import Button from '@mui/material/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Webcam from "react-webcam";


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function PhotoCapture(props) {
  //define dispatch
  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Photo Capture Component');
  
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const [showCamera, setShowCamera] = useState(true);
  
  const videoConstraints = {
    facingMode: "environment",
    // width: { min: 640, ideal: 1920, max: 1920 },
    // height: { min: 400, ideal: 1080 },
    aspectRatio: 1,
    frameRate: { max: 30 }
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setShowCamera(false);
    dispatch({type: 'SET_IMAGE_DATA', payload:{data:imageSrc}})
    dispatch({type:'FETCH_IMAGE_URL'})
  }, [webcamRef, setImgSrc]);

  return (
    <div className='cameraDiv'>
      {showCamera?
        <>
        <div className = 'screenShotDiv'>
            <Webcam
              audio={false}
              ref={webcamRef}
              className = 'screenShot'
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <Button color="secondary" variant="contained" className='photCaptureLaunchButton' endIcon={<PhotoCameraIcon className='photoCaptureIcon' />} onClick={capture}></Button>
        </>:
          <>
            <img
              className = 'screenShot'
              src={imgSrc}
            />
            <Button color="secondary" variant="contained" className='photoCaptureRetakeImageButton' onClick={() => {setShowCamera(true)}}>RETAKE PHOTO</Button>

          </>
      } 
    </div>
  );
}

export default PhotoCapture;
