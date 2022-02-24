import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl'
import { FormLabel } from '@material-ui/core';
import { Button, FormControlLabel } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Theme, createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './ExamQuestion.css';

/*
  Displays a question to a student while taking the exam

  If you are looking for the randomization-of-answer-options part, it's in the question.reducer :D
*/

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

function ExamQuestion(props) {
  const store = useSelector((store) => store);
  const test = useSelector(store => store.test.selected);
  const question = useSelector(store => store.question.examSelected);
  const dispatch = useDispatch();

  const [randOpt, setRandOpt] = useState([]);

  const handleChange = (event) => {
    props.setSelection(event.target.value)
  }

  return (
    <div className="radio-buttons-group">
      <Box
        sx={{
          p: 2,
          bgcolor: 'background.default',
          display: 'grid',
          gridtemplateColumns: { md: '1fr 1fr' },
          gap: 2,
        }}
      >
        <FormControl>
          <Typography className="questionTitle" sx={{ fontSize: 25 }} gutterBottom>
            {question.question}
          </Typography>

          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={() => { handleChange(event) }}>

            <FormControlLabel className="radio-buttons-option" value={question.option_one} control={<Radio />} label={'A. ' + question.option_one} checked={question.option_one === props.selectedAnswer} />
            <FormControlLabel className="radio-buttons-option" value={question.option_two} control={<Radio />} label={'B. ' + question.option_two} checked={question.option_two === props.selectedAnswer} />
            <FormControlLabel className="radio-buttons-option" value={question.option_three} control={<Radio />} label={'C. ' + question.option_three} checked={question.option_three === props.selectedAnswer} />
            <FormControlLabel className="radio-buttons-option" value={question.option_four} control={<Radio />} label={'D. ' + question.option_four} checked={question.option_four === props.selectedAnswer} />

          </RadioGroup>
        </FormControl>
      </Box>
    </div>
  );
}

export default ExamQuestion;