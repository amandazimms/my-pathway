import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Card, CardContent, Typography } from '@mui/material'; 
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import IncidentCounter from '../IncidentCounter/IncidentCounter';
import { useHistory } from 'react-router-dom';
import MessageSession from '../Chat/MessageSession'
import ImageDisplay from '../ImageDisplay/ImageDisplay';

function ProctorExamPageInProgress() {
  /*
    When a proctor clicks into an in progress event, and clicks one of those exams, they land here
  */

  const exam = useSelector(store => store.exam.selected);
  const question = useSelector(store => store.exam.selectedQuestionProctor)
  const dispatch = useDispatch();
  const history = useHistory();


  const doneHelping = () => {
    dispatch({ type:'CHANGE_HELP_STATUS', payload: {help: false, exam_id: exam.exam_id} });
    history.goBack();
  }


 return (
   <div className="flexParentVertical">
      <div className="flexParent">
        <h2 className="heading">Now Assisting: {exam.first_name} {exam.last_name}</h2>
        <ImageDisplay
          url={exam.profile_picture}
          classToPass={"roundImage blueBorder tinyImageDisplay"}
        />
      </div>

      <div className="flexParentChatAndQuestion">

        <Card sx={{maxWidth: 745 }} className="questionCard" >
            
            <CardContent>
              <Typography className="questionTitle" sx={{fontSize: 25}} gutterBottom>
                {question.question}
              </Typography> 
              <Typography sx={{fontSize: 15}} gutterBottom>
                {question.point_value} pts
              </Typography>
              <Typography>Note: Choices appear in a randomized order to the student</Typography>
            </CardContent>
            
            <CardContent> 
              <Typography sx={{fontSize: 18}} >
              <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
              {question.option_one}
              </Typography> 
              
              <Typography sx={{fontSize: 18}}>
              <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
              {question.option_two}
              </Typography> 

              <Typography sx={{fontSize: 18}}>
              <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
              {question.option_three}
              </Typography>

              <Typography sx={{fontSize: 18}}>
              <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
              {question.option_four}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography sx={{fontSize: 18}}>
              Answer: {question.answer}
              </Typography>
            </CardContent>

        </Card>

        <MessageSession />

      </div>

      {/* incidents - not used */}
      {/* <IncidentCounter exam={exam}/> */}

      <br/>
      <Button variant="contained" onClick={doneHelping}>DONE ASSISTING</Button>
  </div>
  );
}

export default ProctorExamPageInProgress;