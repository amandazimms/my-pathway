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
  const searchedRegedStudents = useSelector(store => store.allUsers.searchedRegdStudents);
  const searchedUnregedStudents = useSelector(store => store.allUsers.searchedUnregdStudents);
  const selectedEvent = useSelector(store => store.event.selected);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState(props.text || '');

  const doSearch = (event) => {
    dispatch({  type:'SEARCH_FOR_STUDENTS', 
                payload: {search_text: event.target.value, event_id: selectedEvent.id} });
  }

  const registerStudent = (student) => {
    dispatch({ type:'REGISTER_STUDENT_TO_EVENT', 
                payload: {student_id: student.user_id, proctor_id: user.id, event_id: selectedEvent.id} })
  }

  return (
    <div>
      <p>Register Student to Event:</p>
      <p>searched registered results: {JSON.stringify(searchedRegedStudents)}</p>
      <p>searched unregistered results: {JSON.stringify(searchedUnregedStudents)}</p>

      <input className="loginInput" type="text" placeholder="Enter student to search for" onChange={ (event) => doSearch(event) }></input>
      
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
          {searchedUnregedStudents.map((student) => (
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
                <Button variant="outlined" onClick={ () => {registerStudent(student)} }>Register Student</Button>
              </TableCell>
            </TableRow>
          ))}
          {searchedRegedStudents.map((student) => (
            <TableRow
              key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.username}
              </TableCell>
              <TableCell align="left">{student.first_name}</TableCell>
              <TableCell align="left">{student.last_name}</TableCell>
              <TableCell align="center">Already Registered!</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default EventRegisterStudents;
