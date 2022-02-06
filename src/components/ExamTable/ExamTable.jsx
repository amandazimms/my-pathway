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

function ExamTable(props) {
  const mode = props.mode
  const rows = props.rows;
  const headerText = props.headerText;

  const headers = 
      mode === "COMPLETE"  
    ?   ['FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ID VERIFIED', 'EXAM START', 'EXAM END', '# INCIDENTS', 'ACTION']
    : mode === "IN PROGRESS" 
    ?   ['FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ID VERIFIED', 'ASSISTANCE', 'EXAM START', 'EXAM END', '# INCIDENTS', 'ACTION']
    : mode === "UPCOMING"
    ?   ['FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ACTION']
    : mode === "SEARCH"
    ?   ['FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'REGISTER']
    :   [];
  
  const registerStudent = (student) => {
    console.log('compoent register student:', student);
    props.onRegisterStudent(student);
  }

  return (
  <>
    <h3>{headerText}</h3>
    <TableContainer sx={{ minWidth: 500, maxWidth: 1200 }} component={Paper}>
      <Table sx={{ minWidth: 500, maxWidth: 1200 }} aria-label="simple table">
       
    {/* ==== HEAD ===================== */}
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableCell key={i}>{header}</TableCell>
            ))}
          </TableRow> 
        </TableHead>
    
    {/* ==== BODY ===================== */}
        <TableBody>
          {rows.map((row) => (
          <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              
          {/* ==== NAMES (ALL CASES) ===================== */}
              <TableCell component="th" scope="row">{row.first_name}</TableCell>
              <TableCell component="th" scope="row">{row.last_name}</TableCell>
              <TableCell align="left">{row.username}</TableCell>

          {/* ==== ID ===================== */}
              { mode === 'COMPLETE' || mode === 'IN PROGRESS' 
              ? <TableCell>{!row.id_confirmed ? 'FALSE' : 'TRUE'}</TableCell>
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
                  ? <Button variant="contained" onClick={() => {alert('need to build this')}} >REMOVE STUDENT</Button> 
                  : <></>
                }
                { mode === 'IN PROGRESS' 
                  ? <Button variant="contained" onClick={() => {alert('need to build this')}}>ENTER EXAM</Button> 
                  : <></>
                }
                { mode === 'COMPLETE' 
                  ? <Button variant="contained" onClick={() => {alert('need to build this')}}>VIEW RESULTS</Button> 
                  : <></>
                }
                { mode === 'SEARCH' 
                  ? <>
                      { row.registered
                        ? <Button variant="outlined" onClick={() => {alert('need to build this')}} >REMOVE STUDENT</Button> 
                        : <Button variant="contained" onClick={ () => {registerStudent(row)} }>REGISTER STUDENT</Button>
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
  </>  
  );
}

export default ExamTable;
