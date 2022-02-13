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

  const [opt, setOpt] = useState({
    one: question.option_one,
    two: question.option_two,
    three: question.option_three,
    four: question.option_four,
  })
  // const [opt, setOpt] = useState([
  //   question.option_one,
  //   question.option_two,
  //   question.option_three,
  //   question.option_four,
  // ])

  const [randOpt, setRandOpt] = useState([]);

  // useEffect(() => {
  //   randomizeOrder();
  // }, []);


  // const randomizeOrder = () => {
  //   let originalOptionsCopy = opt;
  //   let newRandOptionsTemp = []

  //   while(originalOptionsCopy.length){
  //     let randomIndex = Math.floor(Math.random() * originalOptionsCopy.length);
  //     let randomItem = originalOptionsCopy[randomIndex];
  //     originalOptionsCopy.splice(randomIndex, 1);
  //     newRandOptionsTemp.push(randomItem);
  //   }
  //   console.log('originalOptionsCopy:', originalOptionsCopy);
  //   console.log('newRandOptionsTemp:', newRandOptionsTemp);
   
  //   setRandOpt(newRandOptionsTemp);
  // }

  //if selected answer === answer let correct = true 
  //total points possible 
  //question gets graded in the post to the db
  //at the end of the exam, student gets graded as a whole 

  const handleChange = (event) => {
    props.setSelection(event.target.value)
  }

  return (
    <Grid container spacing={4}>
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
              <FormControlLabel value={opt.one} control={<Radio />} label={opt.one} checked={opt.one === props.selectedAnswer} />
              <FormControlLabel value={opt.two} control={<Radio />} label={opt.two} checked={opt.two === props.selectedAnswer} />
              <FormControlLabel value={opt.three} control={<Radio />} label={opt.three} checked={opt.three === props.selectedAnswer} />
              <FormControlLabel value={opt.four} control={<Radio />} label={opt.four} checked={opt.four === props.selectedAnswer} />
              {/* <FormControlLabel value={randOpt[0]} control={<Radio />} label={randOpt[0]} checked={randOpt[0] === props.selectedAnswer} />
              <FormControlLabel value={randOpt[1]} control={<Radio />} label={randOpt[1]} checked={randOpt[1] === props.selectedAnswer} />
              <FormControlLabel value={randOpt[2]} control={<Radio />} label={randOpt[2]} checked={randOpt[2] === props.selectedAnswer} />
              <FormControlLabel value={randOpt[3]} control={<Radio />} label={randOpt[3]} checked={randOpt[3] === props.selectedAnswer} /> */}
           
            </RadioGroup>
          </FormControl>
        </Box>
        {/* </ThemeProvider> */}
      </Grid>

    </Grid>
  );
}

export default ExamQuestion;