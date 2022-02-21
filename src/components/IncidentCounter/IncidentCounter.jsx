import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Card, CardContent, Typography } from '@mui/material'; 
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AreYouSureButton from '../AreYouSureButton/AreYouSureButton';


function IncidentCounter(props) {
  const question = useSelector(store => store.exam.selectedQuestionProctor);
  const exam = useSelector(store => store.exam.selected)

  const dispatch = useDispatch();

  const markIncident = () => {
    // console.log("mark incident button clicked");
    dispatch({ type:'ADD_INCIDENT', payload: {exam_detail_id: question.exam_detail_id, exam_id: exam.exam_id} });
  }

 return (
    <div className="flexParent">
    {/* <p>Exam: {JSON.stringify(exam)}</p> */}
    {/* <p>Question: {JSON.stringify(question)}</p> */}
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