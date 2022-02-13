import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Card, CardContent, Typography } from '@mui/material'; 
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AreYouSureButton from '../AreYouSureButton/AreYouSureButton';


function IncidentCounter(props) {
  const exam_detail = useSelector(store => store.exam.selectedDetail || 88);
  const exam = props.exam;

  const dispatch = useDispatch();

  const markIncident = () => {
    dispatch({ type:'ADD_INCIDENT', payload: {exam_detail: exam_detail} });
  }

 return (
    <>
      <p><b>Incidents:</b>{exam.incident}</p>
      <AreYouSureButton
        beginningText={"Mark Incident"}
        areYouSureText={"Are you sure?"}
        onButtonClick={markIncident}
        beginningVariant={"outlined"}
        areYouSureVariant={"contained"}
      />
    </>
  );
}

export default IncidentCounter;