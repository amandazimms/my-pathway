import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom"; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import ExamTable from '../ExamTable/ExamTable';

function EventRegisterStudents(props) {

  const user = useSelector(store => store.user);
  const searchedStudents = useSelector(store => store.allUsers.searchedStudents);
  const selectedEvent = useSelector(store => store.event.selected);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState();

  useEffect(() => {
   dispatch({ type:'UNSET_SEARCHED_STUDENTS'});
  }, []);
  

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    doSearch(event.target.value);
  }

  const doSearch = (textToSearch) => {
    dispatch({  type:'SEARCH_FOR_STUDENTS', 
                payload: {search_text: textToSearch, event_id: selectedEvent.id} });
  }

  const registerStudent = (student) => {
    console.log('registering student:', student);
    dispatch({ type:'REGISTER_STUDENT_TO_EVENT', 
                payload: {student_id: student.user_id, proctor_id: user.id, event_id: selectedEvent.id, search_text: searchText} });
  }

  return (
    <div>
      <input className="loginInput" type="text" placeholder="Enter student to search for" onChange={ (event) => handleSearchInputChange(event) }></input>
      
      <ExamTable
        mode={"SEARCH"}
        rows={searchedStudents}
        headerText={"SEARCH RESULTS:"}
        onRegisterStudent={ (student)=>registerStudent(student) }
      />

    </div>
  );
}

export default EventRegisterStudents;
