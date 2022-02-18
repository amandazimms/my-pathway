import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom"; 
import { Button } from '@mui/material';

function AreYouSureButton(props) {
  //before it is clicked, this button will display props.beginningText, 
  //then when, it will change to display props.areYouSureText, 
  //AND and run the function passed via onButtonClick

  //there are is also the ability to (optionally) pass two different variants for the different stages
  //and (optionally) add a link path which the user will be taken to upon that 2nd click

  //use it in another component like so:
  // <AreYouSureButton
  //   beginningText={"Next"}
  //   areYouSureText={"Are you sure?"}
  //   onButtonClick={doTheThingFunction}
  //   beginningVariant={"outlined"}
  //   areYouSureVariant={"contained"}
  //   linkPath={"/home"} 
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
