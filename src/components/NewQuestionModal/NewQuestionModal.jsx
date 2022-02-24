import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Select, MenuItem, FormControl, InputLabel, makeStyles} from "@material-ui/core"; 
import { FormControlLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Switch from '@mui/material/Switch'; 
import { FormGroup } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from '@mui/material';

function NewQuestionModal(props) {
  /*
    Popup window for when proctor is adding a new question to a test
  */

const store = useSelector((store) => store);
const [heading, setHeading] = useState('Functional Component');
const dispatch = useDispatch();
const question = useSelector(store => store.question.all); 
const selectedQuestion = useSelector(store => store.question.selected)

const selectedTest = useSelector(store => store.test.selected)

useEffect(() => {
  findTestValue()
},[])

const handleChange = (event) => {
  setNewQuestion(...newQuestion, event.target.value)
}; 

const [questionValue, setQuestionValue] = useState(2)
const [questionType, setQuestionType] = useState('multiple choice')
const [questionTitle, setQuestionTitle] = useState('')
const [questionAnswer, setQuestionAnswer] = useState('')
const [optionTwo, setOptionTwo] = useState('')
const [optionThree, setOptionThree] = useState('')
const [optionFour, setOptionFour] = useState('')
const [testValue, setTestValue] = useState(0)

const findTestValue = () => {
  let result = 0
  for(let i=0; i<store.question.all.length; i++){
    result += store.question.all[i].point_value
  }
  setTestValue(result)
  return result
}

const addQuestion = (event) => {
  let question = {
    test_value: (testValue+questionValue),
    point_value: questionValue,
    type: questionType, 
    // required: requried, 
    question: questionTitle,
    option_one: questionAnswer,
    option_two: optionTwo,
    option_three: optionThree,
    option_four: optionFour,
    answer: questionAnswer,
    parent_test_id: selectedTest.id, 
    active: true,
    user_id: store.user.id,
    required: true
  }
  event.preventDefault(); 
  dispatch({ type: 'ADD_QUESTION', 
    payload: { question: question }
  }); 
  props.onClickClose()
}; //end addQuestion 

const cancelQuestion=()=>{
  props.onClickClose()
}

return (
  <Modal open={open}
  >
  <Box>
    <form className="formPanel">

      <h2 className="heading">QUESTION</h2>
      
      <FormControl fullWidth>
        <TextField  
            onChange={(event)=>setQuestionTitle(event.target.value)} 
            id="outlined-basic" 
            label="Question" 
            variant="outlined"
            value={questionTitle}
        /> 
      </FormControl>
      <br></br>
      <br></br>
      <FormControl fullWidth> 
        <InputLabel id="pointSelect">Point Value</InputLabel>
        <Select
          name="point_value"
          value={questionValue}
          label="Point Value"
          onChange={(event)=>setQuestionValue(event.target.value)} >
          <MenuItem value={1}>1 pt</MenuItem>
          <MenuItem value={2}>2 pt</MenuItem>
          <MenuItem value={3}>3 pt</MenuItem>
          <MenuItem value={4}>4 pt</MenuItem>
        </Select>
      </FormControl>
<br></br> 
<br></br>
      {/* Partially built alternate format option - no BE/FE exists for options other than Multiple Choice */}
      {/* <FormControl fullWidth> 
        <InputLabel id="questionFormat">Question Format</InputLabel>
        <Select
          name="Multiple Choice"
          //  value={type}
          label="Question Format"
          onChange={(event)=>setQuestionType(event.target.value)} >
          <MenuItem value={'multiple choice'}>Multiple Choice</MenuItem>
          <MenuItem value={'short answer'}>Short Answer</MenuItem>
          <MenuItem value={'fill in the blank'}>Fill in the Blank</MenuItem>
          <MenuItem value={'essay'}>Essay</MenuItem>
        </Select>
      </FormControl> */}
     
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <RadioButtonCheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
        <TextField  
          onChange={(event)=>setQuestionAnswer(event.target.value)} 
          id="input-with-sx" 
          label="Correct Answer" 
          variant="standard"
          fullWidth="true" 
          value={questionAnswer}
          sx={{ fontWeight: "bold" }}
        />
      </Box>
      <br></br>
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
        <TextField  
          onChange={(event)=>setOptionTwo(event.target.value)} 
          fullWidth="true"  
          label="Option 2" 
          variant="standard"
          value={optionTwo}
        />
      </Box>      
      <br></br>
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
        <TextField  
          onChange={(event)=>setOptionThree(event.target.value)} 
          fullWidth="true"  
          label="Option 3" 
          variant="standard"
          value={optionThree}
        />
      </Box>
      <br></br>
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
        <TextField  
          onChange={(event)=>setOptionFour(event.target.value)} 
          fullWidth="true"
          label="Option 4" 
          variant="standard"
          value={optionFour}
        />
      </Box>
      <br></br>
      {/* Partially built toggle for whether question appears on tests - needs BE */}
      {/* <FormControlLabel control={<Switch defaultChecked />} label="" />   */}
      <br></br>
      <Button onClick={cancelQuestion} variant="outlined">CANCEL</Button>
      <Button onClick={addQuestion} variant="contained" color="primary">SAVE</Button>

    </form>
  </Box> 
</Modal>
  );
}
export default NewQuestionModal;
