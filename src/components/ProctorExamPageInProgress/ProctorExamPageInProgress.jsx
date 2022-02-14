import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Card, CardContent, Typography } from '@mui/material'; 
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import IncidentCounter from '../IncidentCounter/IncidentCounter';


function ProctorExamPageInProgress() {
  const exam = useSelector(store => store.exam.selected);
  const question = useSelector(store => store.exam.selectedQuestionProctor)

 return (
   <div className="flexParentVertical">
      <h2 className="heading">Student: {exam.first_name} {exam.last_name}</h2>
      {/* profile pic here ( {exam.profile_picture} ) */}

      <div className="flexParent">

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
              {question.answer}
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

        <Card className="chatPlaceholderDiv">
          <p>Chat placeholder</p>
        </Card>

      </div>

      <IncidentCounter exam={exam}/>
  </div>
  );
}

export default ProctorExamPageInProgress;