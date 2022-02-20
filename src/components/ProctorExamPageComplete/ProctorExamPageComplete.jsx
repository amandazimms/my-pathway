import { Box, Button, easing, Modal, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Paper from '@mui/material/Paper';
import AreYouSureButton from '../AreYouSureButton/AreYouSureButton';
import { Link } from 'react-router-dom';
import Compare from '../Compare/Compare';


function ProctorExamPageComplete(props) {
  const exam = useSelector(store => store.exam.selected);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const dispatch = useDispatch();

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
    dispatch({ type:'APPROVE_EXAM', payload: {exam_id: exam.exam_id} })
  }

  const rejectExam = () => {
    dispatch({ type:'REJECT_EXAM', payload: {exam_id: exam.exam_id} })
  }

  const passExam = () => {
    dispatch({ type:'PASS_EXAM', payload: {exam_id: exam.exam_id} })
  }

  const failExam = () => {
    dispatch({ type:'FAIL_EXAM', payload: {exam_id: exam.exam_id} })
  }

  return (
    <>
      <Box 
        sx={{
          marginRight: "35px",
          marginLeft: "35px"
        }}
      >
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

      <h2 className='heading'>EXAM RESULTS</h2>
      <p>{exam.test_title} - {prettyEventDate} - {prettyEventTime}</p>
      <p>{exam.first_name} {exam.last_name} - {exam.username}</p>
      
      <br/>

      <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
        <Table  aria-label="simple table">

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

            {/* <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              <TableCell component="th" scope="row"># INCIDENTS</TableCell>
              <TableCell align="right">{exam.incident || 0}</TableCell>
            </TableRow>  */}

            <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              <TableCell component="th" scope="row">ID MATCH?</TableCell>
              {
                  exam.id_confirmed === "TRUE" 
                ? <TableCell align="right" style={{ color:"#308713" }}>YES</TableCell>
                :  exam.id_confirmed === "FALSE"
                ? <TableCell align="right" style={{ color:"#871313" }}>NO</TableCell>
                : <TableCell align="right">
                    <Button onClick={ ()=>setShowCompareModal(true) }>CLICK TO VERIFY ID</Button>
                  </TableCell>
              }
            </TableRow> 

            <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0} }}>
              <TableCell component="th" scope="row">PASS/FAIL</TableCell>
                {   exam.pass === "PASS" 
                  ? <TableCell align="right" style={{ color:"#308713" }}>PASS</TableCell>
                  : exam.pass === "FAIL"
                  ? <TableCell align="right" style={{ color:"#871313" }}>FAIL</TableCell>
                  : <TableCell align="right">
                        <AreYouSureButton
                          beginningText={"MARK AS FAIL"}
                          areYouSureText={"FAIL EXAM - ARE YOU SURE?"}
                          onButtonClick={failExam}
                          beginningVariant={"outlined"}
                          areYouSureVariant={"outlined"} 
                        />
                        <AreYouSureButton
                          beginningText={"MARK AS PASS"}
                          areYouSureText={"PASS EXAM - ARE YOU SURE?"}
                          onButtonClick={passExam}
                          beginningVariant={"contained"}
                          areYouSureVariant={"contained"} 
                        />
                    </TableCell>
                } 
            </TableRow> 

          </TableBody>

        </Table>
      </TableContainer>

      <div className="a50pxSpacer"></div>

      {   exam.exam_status === "APPROVED"
        ? <>
            <p>Exam Approved</p>
            <Button variant="outlined" onClick={rejectExam}>REJECT RESULTS</Button>
          </>
        : exam.exam_status === "REJECTED"
        ? <>
            <p>Exam Rejected</p>
            <Button variant="outlined" onClick={approveExam}>APPROVE RESULTS</Button>
          </>
        : <>
            <p>Awaiting Approval</p>
            <Button variant="outlined" onClick={rejectExam}>REJECT RESULTS</Button>
            <Button variant="contained" onClick={approveExam}>APPROVE RESULTS</Button>
          </>
      }          
    </Box>
    </>
  );
}

export default ProctorExamPageComplete;
