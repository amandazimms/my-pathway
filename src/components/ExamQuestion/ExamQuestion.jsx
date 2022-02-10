import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Paper from '@mui/material/Paper'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'; 
import FormControl from '@mui/material/FormControl'
import { FormLabel } from '@material-ui/core';
import {Button, FormControlLabel} from '@mui/material'; 
import RadioGroup from '@mui/material/RadioGroup'; 
import Radio from '@mui/material/Radio'; 
import Grid from '@mui/material/Grid'; 
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

function ExamQuestion(props) {

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  //loop through detail records, compare to total number
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');
 
  const test = useSelector(store => store.test.selected);
  const question = props.question;
  const questions = useSelector(store => store.question.selected);
  const dispatch = useDispatch();

//if selected answer === answer let correct = true 
//total points possible 
//question gets graded in the post to the db
//at the end of the exam, student gets graded as a whole 

 const handleChange = (event) => {
    props.setSelection(event.target.value)
    console.log('testing btn'); 
 } 

 return (
    <Grid container spacing={4}> 
     <Grid item xs={8}>
         <ThemeProvider>
             <Box 
             sx={{
                 p: 2,
                 bgcolor: 'background.default',
                 display: 'grid',
                 gridtemplateColumns: {md: '1fr 1fr'},
                 gap: 2,
             }}
             >
    <FormControl>
    <Typography className="questionTitle" sx={{fontSize: 25}} gutterBottom>
            {store.question.examSelected.question}
        </Typography> 

      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={() => {handleChange(event)}}>
    <FormControlLabel value={store.question.examSelected.option_one} control={<Radio/>} label={store.question.examSelected.option_one}/> 
    <FormControlLabel value={store.question.examSelected.option_two} control={<Radio/>} label={store.question.examSelected.option_two}/> 
    <FormControlLabel value={store.question.examSelected.option_three} control={<Radio/>} label={store.question.examSelected.option_three}/> 
    <FormControlLabel value={store.question.examSelected.option_four} control={<Radio/>} label={store.question.examSelected.option_four}/> 

  </RadioGroup>
  </FormControl>
            </Box>
         </ThemeProvider>
     </Grid>
 
 </Grid>
  );
}

export default ExamQuestion;