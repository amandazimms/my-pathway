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

  //use it in another component like so:
  // <AreYouSureButton
  //   beginningText={"Next"}
  //   areYouSureText={"Are you sure?"}
  //   onButtonClick={doTheThingFunction}
  //   beginningVariant={"outlined"}
  //   areYouSureVariant={"contained"}
  // />

  const [showWarning, setShowWarning] = useState(false);

  return (
  <>
    {
        showWarning 
      ? <Button onClick={()=>props.onButtonClick()} variant={props.areYouSureVariant || "contained"}>{props.areYouSureText || "Are you sure?"}</Button>
      : <Button onClick={()=>setShowWarning(true)} variant={props.beginningVariant || "outlined"}>{props.beginningText || "Next"}</Button>
    }

   
  </>  
  );
}

export default AreYouSureButton;
