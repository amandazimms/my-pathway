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
  /*
    Anywhere you see a list of students associated to an event, you're probably looking at our friend ExamTable :)

    It is prassed props including the mode - "COMPLETE" / "IN PROGRESS" / "UPCOMING", for exams, 
      ... and also "SEARCH", because this table is also used when searching for students to register an exam.
  */

  const event = props.event;
  const mode = props.mode;
  const rows = props.rows; 
  //rows is "exams" in most cases, except if mode is "search".
  // either way think of rows as a group of students (which are sometimes students-taking-this-event = exams)

  const examsHelp = useSelector(store => store.event.examsHelp);
    // ^^^ a note about examsHelp - 
    //   we originally stored everything about a particular exam in the exams reducer
    //   to allow a proctor to see hands raising/lowering 'in the moment', we needed 
    //   to call another fetch on this reducer every few seconds.

    //   but every time we did so it would cause the entire table to rebuild, causing
    //   a jarring user experience

    //   so we came up with the unconventional solution of storing only the 'help'
    //     (help = does this student have their hand raised, t/f)
    //   value in a separate reducer, and fetching THAT every few seconds instead.

    //   it works fine in our testing, but it relies completely on the length of the fetched
    //   exams array being the same length as the fetched examsHelp array - 
    //     ...which SHOULD always be the case. 

    //   if you search this "examsHelp[rowIndex].help" you will see what I mean.

  const [showCompareModal, setShowCompareModal] = useState(false);
  const helpIconPath = "/icons/Assistance.png";
  const dispatch = useDispatch();
  const history = useHistory()

  const headers = 
      mode === "COMPLETE"  
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ID MATCH?', 'EXAM START', 'EXAM END', 'ACTION']
    : mode === "IN PROGRESS" 
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ID MATCH?', 'ASSISTANCE', 'EXAM START', 'EXAM END', 'GO IN']
    : mode === "UPCOMING"
    ?   ['', 'FIRST NAME', 'LAST NAME', 'EMAIL/USERNAME', 'ACTION']
    :   [];
  
  const fetchRepeating = () => {
    //runs every {3s} while this page is open
    //if proctor is viewing an event in progress, 
    //this will allow them to see hands getting raised/lowered in realtime
    fetchEventExamsHelp();
    const getMessageTimer = setInterval(() => {fetchEventExamsHelp()}, 3000);
    return () => clearInterval(getMessageTimer);
  } 

  useEffect(() => {    
    if (mode === "IN PROGRESS"){
      return fetchRepeating();
    } 
  }, []);

  const fetchEventExamsHelp = () => {
    dispatch({ type: "FETCH_EVENT_EXAMS_HELP", payload: {event_id: event.id} });
  }

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
  }

  return (
  <div>
      <Modal
        open={showCompareModal} 
        onClose={ ()=>setShowCompareModal(false) } 
        className="compareModal flexParentVertical"
        hideBackdrop={true}
      >
        <Compare 
          onClickClose={ ()=>setShowCompareModal(false) } 
        />
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
          {rows.map((row, rowIndex) => (
          <TableRow key={uuid.v4} sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              
          {/* ==== PROFILE PIC (ALL CASES) ===================== */}
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

          {/* ==== ID (only for complete/in progress)===================== */}
              { mode === 'COMPLETE' || mode === 'IN PROGRESS' 
              ? <TableCell>
                  {
                      row.id_confirmed === true
                    ? 'YES' 
                    : row.id_confirmed === false
                    ? 'NO'
                    : <Button onClick={ ()=>setExamAndShowModal(row) } variant="contained">VERIFY ID</Button>
                  }
                </TableCell>
              : <></> }

          {/* ==== HELP (only for in progress) ===================== */}
              { mode === 'IN PROGRESS' 
              ? <TableCell>
                  {  
                      examsHelp.length !== 0
                    ?  
                      <>
                          {
                              examsHelp[rowIndex].help
                            ? <Link to="/proctor-exam-in-progress">
                                <img 
                                  className="helpIcon" 
                                  src={helpIconPath}
                                  onClick={ ()=>setExamAndQuestion(row) }
                                />
                              </Link> 
                            : <></>
                          }
                      </>
                    : <></>  
                     
                  }
                </TableCell>
              : <></> }

          {/* ==== TIMES (only in progress/complete) ===================== */}
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

          {/* incident "stubbed out"
            -works with full CRUD but needs proctor to manually click to + an incident */}
          {/* ==== INCIDENT ===================== */}
              {/* { mode === 'IN PROGRESS' || mode === 'COMPLETE'
              ? <TableCell align="center">{ !row.incident ? 0 : row.incident }</TableCell>
              : <></>
              } */}

          {/* ==== ACTION BUTTON (different depending on mode) ===================== */}       
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
