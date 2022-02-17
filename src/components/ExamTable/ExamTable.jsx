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
import { Button, Modal } from '@mui/material';
import Compare from '../Compare/Compare';
import { v4 as uuid } from 'uuid';
import ImageDisplay from '../ImageDisplay/ImageDisplay';

function ExamTable(props) {
  const mode = props.mode
  const rows = props.rows;
  const [showCompareModal, setShowCompareModal] = useState(false);
  const helpIconPath = "/icons/Assistance.png";
  const dispatch = useDispatch();
  const history = useHistory()



  const headers = 
      mode === "COMPLETE"  
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ID MATCH?', 'EXAM START', 'EXAM END', '# INCIDENTS', 'ACTION']
    : mode === "IN PROGRESS" 
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ID MATCH?', 'ASSISTANCE', 'EXAM START', 'EXAM END', '# INCIDENTS', 'GO IN']
    : mode === "UPCOMING"
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ACTION']
    :   [];
  
  const registerStudent = (student) => {
    props.onRegisterStudent(student);
  }
  
  const unregisterStudent = (student) => {
    props.onUnregisterStudent(student);
  }

  const setSelectedExam = async (exam) => {
    await props.onSetSelectedExam(exam);
  }

  const setExamAndQuestion = (exam) => {
    setSelectedExam(exam);
    dispatch({ type:'FETCH_EXAM_QUESTION_PROCTOR', payload: {exam_id: exam.exam_id} });
    dispatch({
      type: 'GET_MESSAGE_SESSION',
      payload: {
        exam_id: exam.exam_id,
        done: () => {
          history.push('/proctor-exam-in-progress')
        }
      }
    })
  }

  const setExamAndShowModal = (row) => {
    dispatch({
      type:'COMPARE_IMAGES',
      payload:{
        exam: row,
        done:()=> {
          setShowCompareModal(true)
        }
      }
    })
    // setShowCompareModal(true);
    // setSelectedExam(row);
  }

  return (
  <div>
      <Modal
        open={showCompareModal} 
        onClose={ ()=>setShowCompareModal(false) } 
        className="compareModal flexParentVertical"
        hideBackdrop={true}
      >
        <Compare />
      </Modal>

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
            <TableCell component="th" scope="row">
              <ImageDisplay
                url={row.profile_picture}
                classToPass={"roundImage blueBorderThin tableImageDisplay"}
              />
            </TableCell>

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
                    : <Button onClick={ ()=>setExamAndShowModal(row) } variant="contained">VERIFY ID</Button>
                  }
                </TableCell>
              : <></> }

          {/* ==== HELP ===================== */}
              { mode === 'IN PROGRESS' 
              ? <TableCell>
                  {   row.help 
                    ? <Link to="/proctor-exam-in-progress">
                        <img 
                          className="helpIcon" 
                          src={helpIconPath}
                          onClick={ ()=>setExamAndQuestion(row) }
                        />
                      </Link> 
                    : <></>
                  }
                </TableCell>
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
                  ?
                    row.present === true
                    ? <Button variant="contained" onClick={ ()=>setExamAndQuestion(row) }>ENTER EXAM</Button> 
                    : <p>NOT PRESENT</p>
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
