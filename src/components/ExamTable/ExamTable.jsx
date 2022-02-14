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
import { v4 as uuid } from 'uuid';

function ExamTable(props) {
  const mode = props.mode
  const rows = props.rows;

  const dispatch = useDispatch();


  const headers = 
      mode === "COMPLETE"  
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ID MATCH?', 'EXAM START', 'EXAM END', '# INCIDENTS', 'ACTION']
    : mode === "IN PROGRESS" 
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ID MATCH?', 'ASSISTANCE', 'EXAM START', 'EXAM END', '# INCIDENTS', 'ACTION']
    : mode === "UPCOMING"
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ACTION']
    :   [];
  
  const registerStudent = (student) => {
    props.onRegisterStudent(student);
  }
  
  const unregisterStudent = (student) => {
    props.onUnregisterStudent(student);
  }

  const setSelectedExam = (exam) => {
    props.onSetSelectedExam(exam);
  }

  const setExamAndQuestion = (exam) => {
    setSelectedExam(exam);
    dispatch({ type:'FETCH_EXAM_QUESTION_PROCTOR', payload: {exam_id: exam.exam_id} });
  }

  return (
  <div>
    <TableContainer sx={{ minWidth: 500, maxWidth: 1200}} component={Paper}>
      <Table sx={{ minWidth: 500, maxWidth: 1200 }} aria-label="simple table">
       
    {/* ==== HEADER (don't display for search)===================== */}
        {   mode !== 'SEARCH' 
          ? <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={uuid.v4}>{header}</TableCell>
                ))}
              </TableRow> 
            </TableHead>
          : <></>
        }
        
    
    {/* ==== BODY ===================== */}
        <TableBody>
          {rows.map((row) => (
          <TableRow key={uuid.v4} sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              
          {/* ==== PIC (ALL CASES) ===================== */}
            <TableCell component="th" scope="row">{row.profile_picture}</TableCell>

          {/* ==== NAMES (ALL CASES) ===================== */}
              <TableCell component="th" scope="row">{row.first_name}</TableCell>
              <TableCell component="th" scope="row">{row.last_name}</TableCell>
              <TableCell align="left">{row.username}</TableCell>

          {/* ==== ID ===================== */}
              { mode === 'COMPLETE' || mode === 'IN PROGRESS' 
              ? <TableCell>
                  {
                      row.id_confirmed === "TRUE" 
                    ? 'YES' 
                    : row.id_confirmed === "FALSE" 
                    ? 'NO'
                    : <Link to="/compare">
                        <Button variant="contained" onClick={ ()=>setSelectedExam(row) }>CLICK TO VERIFY</Button>
                      </Link>
                  }
                </TableCell>
              : <></> }

          {/* ==== HELP ===================== */}
              { mode === 'IN PROGRESS' 
              ? <TableCell>{!row.help ? 'FALSE' : 'TRUE'}</TableCell>
              : <></> }

          {/* ==== TIMES ===================== */}
            { mode === 'IN PROGRESS' || mode === 'COMPLETE'
            ? <>
                <TableCell>
                  { !row.exam_time_start 
                  ? 'NOT STARTED' 
                  : new Date(row.exam_time_start).toLocaleString('en-US', {
                      year: 'numeric', month: 'numeric', day: 'numeric',
                      hour: '2-digit',minute: '2-digit'})
                  }
                </TableCell>
                <TableCell>
                  { !row.exam_time_end 
                  ? 'NOT STARTED' 
                  : new Date(row.exam_time_end).toLocaleString('en-US', {
                      year: 'numeric', month: 'numeric', day: 'numeric',
                      hour: '2-digit',minute: '2-digit'})
                  }
                </TableCell>
              </>
            : <></>
            }

          {/* ==== INCIDENT ===================== */}
              { mode === 'IN PROGRESS' || mode === 'COMPLETE'
              ? <TableCell align="center">{ !row.incident ? 0 : row.incident }</TableCell>
              : <></>
              }

          {/* ==== ACTION BUTTON ===================== */}       
              <TableCell>
                { mode === 'UPCOMING' 
                  ? <Button variant="contained" onClick={ ()=>unregisterStudent(row) }>UNREGISTER STUDENT</Button> 
                  : <></>
                }
                { mode === 'IN PROGRESS' 
                  ? <Link to="/proctor-exam-in-progress">
                      <Button variant="contained" onClick={ ()=>setExamAndQuestion(row) }>ENTER EXAM</Button> 
                    </Link> 
                  : <></>
                }
                { mode === 'COMPLETE' 
                  ? <Link to="/proctor-exam-complete">
                      <Button variant="contained" onClick={ ()=>setSelectedExam(row) }>VIEW RESULTS</Button> 
                    </Link>
                  : <></>
                }
                { mode === 'SEARCH' 
                  ? <>
                      { row.registered
                        ? <p>ALREADY REGISTERED</p> 
                        : <Button variant="contained" 
                              onClick={ () => {registerStudent(row)} }>REGISTER STUDENT</Button>
                      } 
                    </>
                  : <></>                 
                }
              </TableCell>

          </TableRow>
          ))}

        </TableBody>

      </Table>

    </TableContainer>
  </div>  
  );
}

export default ExamTable;
