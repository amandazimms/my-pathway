import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Card, CardContent, Typography } from '@mui/material'; 
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


function ProctorExamPageInProgress() {
  const exam = useSelector(store => store.exam.selected);

 return (
    <>
      <p>exam in progress for: {JSON.stringify(exam)}</p>

      <Card sx={{maxWidth: 745 }}
      className="questionCard"
      onClick={() => setSelectedQuestion(question)}
      >
          <CardContent>
            <Typography className="questionTitle" sx={{fontSize: 25}} gutterBottom>
              {props.question.question}
            </Typography> 
            <Typography sx={{fontSize: 15}} gutterBottom>
              {props.question.point_value} pts
            </Typography>
          </CardContent>
           

          <CardContent> 
            <Typography sx={{fontSize: 18}} >
            <RadioButtonCheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
            {props.question.answer}
            </Typography> 
            
            <Typography sx={{fontSize: 18}}>
            <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
            {props.question.option_two}
            </Typography> 

            <Typography sx={{fontSize: 18}}>
            <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
            {props.question.option_three}
            </Typography>

            <Typography sx={{fontSize: 18}}>
            <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
            {props.question.option_four}
            </Typography>
          </CardContent>

      </Card>
    </>
  );
}

export default ProctorExamPageInProgress;