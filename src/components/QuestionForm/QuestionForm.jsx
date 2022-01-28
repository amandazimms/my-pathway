import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {Select, MenuItem, FormControl, InputLabel, makeStyles} from "@material-ui/core"; 
import { FormControlLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Switch from '@mui/material/Switch'; 
import { FormGroup } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function QuestionForm(props) {

const store = useSelector((store) => store);
const [heading, setHeading] = useState('Functional Component');
const question = useSelector(store => store.question.all); 
const selectedQuestion = useSelector(store => store.question.selected)


const handleChange = (event) => {
  setNewQuestion(event.target.value)
}; 

const [newQuestion, setNewQuestion] = useState ({
  point_value: question.point_value,
  type: question.type,
  required: question.required,
  question: question.question, 
  option_one: question.option_one,
  option_two: question.option_two,
  option_three: question.option_three,
  option_four: question.option_four,
  answer: question.answer, 
}); 

const addQuestion = (event) => {
console.log('in add question');
event.preventDefault(); 
dispatch({ type: 'ADD_QUESTION', 
 payload: { 
  pointValue: pointValue,
  type: type, 
  required: requried, 
  question: question,
  optionOne: optionOne,
  optionTwo: optionTwo,
  optionThree: optionThree,
  optionFour: optionFour,
  answer: answer,
  status: status,
 },
}); 
}; //end addQuestion 

return (
  <Box>
<form className="formPanel">

<h2>Question</h2>
<FormControl fullWidth>
<TextField id="outlined-basic" label="Question" variant="outlined"/> 
</FormControl>

<FormControl fullWidth> 
<InputLabel id="pointSelect">Point Value</InputLabel>
<Select
     name="point_value"
    //  value={pointValue}
     label="Point Value"
     onChange={handleChange} >
     <MenuItem value={1}>1 pt</MenuItem>
     <MenuItem value={2}>2 pt</MenuItem>
     <MenuItem value={3}>3 pt</MenuItem>
     <MenuItem value={4}>4 pt</MenuItem>
    </Select>
</FormControl>

<FormControl fullWidth> 
<InputLabel id="questionFormat">Question Format</InputLabel>
<Select
     name="Multiple Choice"
    //  value={type}
     label="Question Format"
     onChange={handleChange} >
     <MenuItem value={'multiple choice'}>Multiple Choice</MenuItem>
     <MenuItem value={'short answer'}>Short Answer</MenuItem>
     <MenuItem value={'fill in the blank'}>Fill in the Blank</MenuItem>
     <MenuItem value={'essay'}>Essay</MenuItem>
    </Select>
</FormControl>
     
<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
<RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
<TextField id="input-with-sx" label="Answer 1" variant="standard"/>
</Box>

<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
<RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
<TextField id="input-with-sx" label="Answer 2" variant="standard"/>
</Box>

<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
<RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
<TextField id="input-with-sx" label="Answer 3" variant="standard"/>
</Box>

<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
<RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
<TextField id="input-with-sx" label="Answer 4" variant="standard"/>
</Box>

<FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label="" />
</FormGroup>


</form>
</Box> 
  );
}
export default QuestionForm;
