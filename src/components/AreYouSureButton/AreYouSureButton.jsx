import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom"; 
import { Button } from '@mui/material';

function AreYouSureButton(props) {
  //This is a simple button component,
  // whose job it is to require the user to click twice before running its function,
  // also warning them with text

  //I wouldn't say it's wildly user friendly, but it was out of scope for us to add "back" buttons to 
  //  a lot of things, so this provides some user feedback that their choice is permanent.
  

  //Before it is clicked, this button will display props.beginningText, 
  //then when, it will change to display props.areYouSureText, 
  //AND and run the function passed via onButtonClick

  //there are is also the ability to (optionally) pass two different variants for the different stages
  //and (optionally) add a link path which the user will be taken to upon that 2nd click

  //EXAMPLE USE:
  // <AreYouSureButton
  //   beginningText={"Next"} //this is the text that is displayed at first
  //   areYouSureText={"Are you sure?"} //this text is displayed after clicking it once
  //   onButtonClick={doTheThingFunction} //this function is run after the second click
  //   beginningVariant={"outlined"} //variant of the button when first text is displayed
  //   areYouSureVariant={"contained"} //variant when second text is displayed
  //   linkPath={"/home"} //link (optional) to another page after 2nd click
  // />

  const [showWarning, setShowWarning] = useState(false);

  const launchWarning = () => {
    setShowWarning(true)
    setTimeout(()=>setShowWarning(false), 5000 )
  }

  const proceed = () => {
    props.onButtonClick()
    setShowWarning(false)
  }

  return (
  <>
    {
        showWarning && props.linkPath
      ? 
        // after the first click, show this if there was a link path passed via props
        <Link to={props.linkPath}>
          <Button 
            className={props.className}
            onClick={proceed} 
            variant={props.areYouSureVariant || "contained"}
          >
            {props.areYouSureText || "Are you sure?"}
          </Button>
        </Link>
      : 
        // after the first click, show this if there was NO link path passed via props
        showWarning && !props.linkPath
      ?  
        <Button 
            className={props.className}
            onClick={proceed} 
            variant={props.areYouSureVariant || "contained"}
          >
            {props.areYouSureText || "Are you sure?"}
        </Button>
      : 
        //before the first click, show this
        <Button
          className={props.className} 
          onClick={launchWarning} 
          variant={props.beginningVariant || "outlined"}
        >
          {props.beginningText || "Next"}
        </Button>
    } 
  </>  
  );
}

export default AreYouSureButton;
