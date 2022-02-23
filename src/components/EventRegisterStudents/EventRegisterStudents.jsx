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
  /*
    Component that handles searching for and registering students.
    Appears only when on the 'students' tab of an upcoming event
  */

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
    dispatch({ type:'UNSET_SEARCHED_STUDENTS'});
    dispatch({  type:'SEARCH_FOR_STUDENTS', 
                payload: {search_text: textToSearch, event_id: selectedEvent.id} });
  }

  const registerStudent = (student) => {
    dispatch({ type:'REGISTER_STUDENT_TO_EVENT', 
                payload: {student_id: student.user_id, proctor_id: user.id, event_id: selectedEvent.id, search_text: searchText} });
  }

  const clearResults = () => {
    dispatch({ type:'UNSET_SEARCHED_STUDENTS'});
    setSearchText("");
  }

  return (
    <div>
      <div className="fullWidthDiv">
        <input 
          className="fakeAutocompleteInput" 
          value={searchText} 
          type="text" 
          placeholder="Enter student to search for" 
          onChange={ (event) => handleSearchInputChange(event) }
        ></input>
        <Button className="buttonInsideInput" variant="contained" onClick={clearResults}>x</Button>
      </div>

      <ExamTable
        mode={"SEARCH"}
        rows={searchedStudents}
        onRegisterStudent={ (student)=>registerStudent(student) }
        customClassName="fakeAutocompleteResults"
        parentCustomClassName="fakeAutocompleteResultsDiv"
      />

      <div className="a100pxSpacer"></div>

    </div>
  );
}

export default EventRegisterStudents;
