import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Card, CardContent, Typography } from '@mui/material'; 
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AreYouSureButton from '../AreYouSureButton/AreYouSureButton';


function IncidentCounter(props) {
  /*
    Not currently in use - includes button and logic so that when a proctor clicks, an incident is added

    It gets added (see router) to both this exam_detail and this exam, so you know which question 
    was up while the incident was recorded
  */
  const question = useSelector(store => store.exam.selectedQuestionProctor);
  const exam = useSelector(store => store.exam.selected)

  const dispatch = useDispatch();

  const markIncident = () => {
    dispatch({ type:'ADD_INCIDENT', payload: {exam_detail_id: question.exam_detail_id, exam_id: exam.exam_id} });
  }

 return (
    <div className="flexParent">
      <p style={{paddingRight: "20px"}}><b>Incidents: </b>{exam.incident}</p>

      <AreYouSureButton
        beginningText={"Mark Incident"}
        areYouSureText={"Are you sure?"}
        onButtonClick={markIncident}
        beginningVariant={"outlined"}
        areYouSureVariant={"contained"}
      />
    </div>
  );
}

export default IncidentCounter;