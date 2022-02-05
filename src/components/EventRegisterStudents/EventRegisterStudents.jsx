import React, { useState } from 'react';
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

function EventRegisterStudents(props) {

  const user = useSelector(store => store.user);
  const searchedStudents = useSelector(store => store.allUsers.searchedStudents);
  const selectedEvent = useSelector(store => store.event.selected);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState();

  const handleSearchInputChange = async (event) => {
    await setSearchText(event.target.value);
    doSearch(event.target.value);
  }

  const doSearch = (textToSearch) => {
    dispatch({  type:'SEARCH_FOR_STUDENTS', 
                payload: {search_text: textToSearch, event_id: selectedEvent.id} });
  }

  const registerStudent = async (student) => {
    await dispatch({ type:'REGISTER_STUDENT_TO_EVENT', 
                payload: {student_id: student.user_id, proctor_id: user.id, event_id: selectedEvent.id} })
    await doSearch(searchText);
  }

  return (
    <div>
      <p>Register Student to Event:</p>
      <p>searched students: {JSON.stringify(searchedStudents)}</p>

      <input className="loginInput" type="text" placeholder="Enter student to search for" onChange={ (event) => handleSearchInputChange(event) }></input>
      
      <TableContainer sx={{ minWidth: 500, maxWidth: 800 }} component={Paper}>
      <Table sx={{ minWidth: 500, maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="center">Register</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* table part 1: first display a list of all unregistered students from this search */}
          {searchedStudents.map((student) => (
            <TableRow
              key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.username}
              </TableCell>
              <TableCell align="left">{student.first_name}</TableCell>
              <TableCell align="left">{student.last_name}</TableCell>
              <TableCell align="center">
                {
                  
                }
                <Button variant="outlined" onClick={ () => {registerStudent(student)} }>Register Student</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default EventRegisterStudents;
