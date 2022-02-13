import { Button, easing, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Paper from '@mui/material/Paper';


function studentExamPageComplete(props) {
  const exam = useSelector(store => store.exam.selected);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour:'numeric', minute:'numeric'}
    return new Date(dateString).toLocaleString(undefined, options)
  }

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US');
  }

  const prettyEventDate = formatDate(exam.event_date_start);
  const prettyEventTime = formatTime(exam.event_date_end);


  return (
    <div>
      <h2>EXAM RESULTS</h2>
      <h3>{exam.test_title} - {prettyEventDate} - {prettyEventTime}</h3>
      <h3>{exam.first_name} {exam.last_name} - {exam.username}</h3>
      
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">

          <TableBody>

            <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              <TableCell component="th" scope="row"># TOTAL POINTS</TableCell>
              <TableCell align="right">{exam.points_possible || "ERROR"}</TableCell>
            </TableRow> 

            <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              <TableCell component="th" scope="row"># INCORRECT</TableCell>
              <TableCell align="right">{exam.points_possible - exam.score || 0}</TableCell>
            </TableRow> 

            <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              <TableCell component="th" scope="row"># CORRECT</TableCell>
              <TableCell align="right">{exam.score || 0}</TableCell>
            </TableRow> 

            <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              <TableCell component="th" scope="row"># INCIDENTS</TableCell>
              <TableCell align="right">{exam.incident || 0}</TableCell>
            </TableRow> 

            <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              <TableCell component="th" scope="row">PASS/FAIL</TableCell>
                {   exam.pass === true 
                  ? <TableCell align="right" style={{ color:"#308713" }}>PASS</TableCell>
                  : exam.pass === false
                  ? <TableCell align="right" style={{ color:"#871313" }}>FAIL</TableCell>
                  : <TableCell align="right" style={{ color:"#871313" }}>RESULT PENDING</TableCell>
                } 
            </TableRow> 

          </TableBody>

        </Table>
      </TableContainer>        
     
    </div>
  );
}

export default studentExamPageComplete;
