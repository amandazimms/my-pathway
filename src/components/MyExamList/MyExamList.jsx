import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import EventItem from '../EventItem/EventItem';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; 
import '../EventList/EventList.css'; 


function EventList(props) {
  //this is a page that displays all events; it's wireframe "Proctor View - Events" from figma
  const events = useSelector(store => store.event.all);
  const store = useSelector(store => store);

  // const events = [
  //   {name: "fakeEvent1", status: "upcoming", date: '2487'},
  //   {name: "fakeEvent2", status: "inProgress", date: '2022'},
  //   {name: "fakeEvent3", status: "completed", date: '1999'},
  // ]
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ 
      type: 'FETCH_MY_EXAMS',
      payload:{
        student_id:store.user.id
      }
     }); 
  }, []);

  let history = useHistory()

  const setSelectedExam = (exam) => {
    dispatch({ type: 'SET_SELECTED_EXAM', payload: exam });
    dispatch({
      type: 'FETCH_ALL_EXAM_QUESTIONS',
      payload: {
          parent_test_id:exam.test_id, // need to replace with event.test_id
      }
  })
    history.push('/exam-room')
  }

  
  const viewCompletedExam = (exam) => {
    dispatch({ type: 'SET_SELECTED_EXAM', payload: exam });
    history.push('/student-exam-complete')
  }

  return (
    <div>
      <h2 className="heading">MY EXAMS</h2>
      
      <Box display="flex"
      justifyContent="center">
      <TableContainer sx={{ minWidth: 500, maxWidth: 1000 }} component={Paper} >
      <Table sx={{ minWidth: 500, maxWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>EVENT/TEST NAME</TableCell>
            <TableCell align="left">STATUS</TableCell>
            <TableCell align="left">DATE</TableCell>
            <TableCell align="left">START TIME</TableCell>
            <TableCell align="center">END TIME</TableCell>
            <TableCell align="center">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {store.exam.myExams.map((exam) => (
            <TableRow
              key={exam.exam_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {exam.event_name}/{exam.test_title}
              </TableCell>
              <TableCell align="left">{exam.exam_status}</TableCell>
              <TableCell align="left">{new Date(exam.event_date_start).toLocaleDateString([], {month: 'long', year: 'numeric', day: 'numeric'})}</TableCell>
              <TableCell align="left">{new Date(exam.event_date_start).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</TableCell>
              <TableCell align="left">{new Date(exam.event_date_end).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</TableCell>
              <TableCell align="center">
                {exam.exam_status === 'UPCOMING'?
                <Button variant="contained" disabled >Enter Event</Button>:
                <></>
                }
                {exam.exam_status === 'IN PROGRESS'?
                <Button variant="contained" onClick={() => setSelectedExam(exam)}>Enter Event</Button>:
                <></>
                }
                {exam.exam_status === 'COMPLETE'?
                <Button variant="contained" onClick={() => viewCompletedExam(exam)}>View Results</Button>:
                <></>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  
</div>
  );
}

export default EventList;
