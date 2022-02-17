import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom"; 
import { Button } from '@mui/material';
import ExamTable from '../ExamTable/ExamTable';
import EventRegisterStudents from '../EventRegisterStudents/EventRegisterStudents';

function EventStudentsTab(props) {
  const isNew = props.isNew;
  const event = props.event;

  const exams = useSelector(store => store.event.exams);
  const dispatch = useDispatch();

  const fetchRepeating = () => {
    //runs every {3s} while this page is open
    fetchEventExams();
    const getMessageTimer = setInterval(() => {fetchEventExams()}, 3000);
    return () => clearInterval(getMessageTimer)
  }

  useEffect(() => {
    if (!isNew){
      fetchRepeating();
    } 
  }, []);

  const fetchEventExams = () => {
    dispatch({ type: "FETCH_EVENT_EXAMS", payload:{event_id:event.id} });
  }
  const unregisterStudent = (student) => {
    dispatch({ type:'UNREGISTER_STUDENT_TO_EVENT', 
      payload: {exam_id: student.exam_id, event_id: event.id} });
  }
    
  const setSelectedExam = (exam) => {
    dispatch({ type: 'FETCH_SELECTED_EXAM', payload: {exam_id: exam.exam_id} }); 
  }

  //fetech every few seconds


  return (
    <>
      {   event.status === "UPCOMING"
        ? <EventRegisterStudents/> 
        : <></>
      }
    
      <h2 className="heading">REGISTERED STUDENTS</h2>
      <ExamTable 
        mode={event.status} 
        rows={exams} 
        onUnregisterStudent={ (student)=>unregisterStudent(student)}
        onSetSelectedExam={ (exam)=>setSelectedExam(exam) }
      />
    </>
  );
}

export default EventStudentsTab;
