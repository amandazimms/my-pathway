import { Button, easing, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Paper from '@mui/material/Paper';


function ProctorExamPageComplete(props) {
  const exam = useSelector(store => store.exam.selected);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US');
  }

  const prettyEventDate = formatDate(exam.event_date);
  const prettyEventTime = formatTime(exam.event_date);

  const approveExam = () => {
    
  }

  const rejectExam = () => {
    
  }

  return (
    <div>
      <h2>EXAM RESULTS</h2>
      <h3>{exam.test_title} - {prettyEventDate} - {prettyEventTime}</h3>
      <h3>{exam.first_name} {exam.last_name} - {exam.username}</h3>

      <p>{JSON.stringify(exam)}</p>
      
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
                {   exam.pass === "TRUE" 
                  ? <TableCell align="right" style={{ color:"#308713" }}>PASS</TableCell>
                  : exam.pass === "FALSE"
                  ? <TableCell align="right" style={{ color:"#871313" }}>FAIL</TableCell>
                  : <TableCell align="right" style={{ color:"#871313" }}>ERROR</TableCell>
                } 
            </TableRow> 

          </TableBody>

        </Table>
      </TableContainer>

      {   exam.exam_status === "APPROVED"
        ? <>
            <h3>Exam Approved</h3>
            <Button variant="outlined" onClick={rejectExam}>REJECT RESULTS</Button>
          </>
        : exam.exam_status === "REJECTED"
        ? <>
            <h3>Exam Rejected</h3>
            <Button variant="outlined" onClick={approveExam}>APPROVE RESULTS</Button>
          </>
        : <>
            <h3>Awaiting Approval</h3>
            <Button variant="outlined" onClick={rejectExam}>REJECT RESULTS</Button>
            <Button variant="contained" onClick={approveExam}>APPROVE RESULTS</Button>
          </>
      }          
     
    </div>
  );
}

export default ProctorExamPageComplete;
