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
  // const question = props.question;
  const question = useSelector(store => store.question.examSelected);
  // const questions = useSelector(store => store.question.selected);
  const dispatch = useDispatch();

  const [randOpt, setRandOpt] = useState([]);

  //if selected answer === answer let correct = true 
  //total points possible 
  //question gets graded in the post to the db
  //at the end of the exam, student gets graded as a whole 

  const handleChange = (event) => {
    props.setSelection(event.target.value)
  }

  return (
    <Grid  className="radio-buttons-group" container spacing={4}>
      <Grid item xs={8}>
        {/* <ThemeProvider> */}
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
              
              <FormControlLabel className="radio-buttons-option" value={question.option_one} control={<Radio />} label={'A. '+ question.option_one} checked={question.option_one === props.selectedAnswer} />
              <FormControlLabel className="radio-buttons-option" value={question.option_two} control={<Radio />} label={'B. '+ question.option_two} checked={question.option_two === props.selectedAnswer} />
              <FormControlLabel className="radio-buttons-option" value={question.option_three} control={<Radio />} label={'C. '+ question.option_three} checked={question.option_three === props.selectedAnswer} />
              <FormControlLabel className="radio-buttons-option" value={question.option_four} control={<Radio />} label={'D. '+ question.option_four} checked={question.option_four === props.selectedAnswer} />
             
            </RadioGroup>
          </FormControl>
        </Box>
        {/* </ThemeProvider> */}
      </Grid>

    </Grid>
  );
}

export default ExamQuestion;