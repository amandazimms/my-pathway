import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import '../QuestionItem/QuestionItem.css'
//Material-UI imports 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Switch from '@mui/material/Switch';
import { ButtonGroup } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {Select, MenuItem, FormControl, InputLabel, makeStyles} from "@material-ui/core"; 
import Box from '@mui/material/Box';

var cardStyle = {
  display: 'block',
  width: '60vw',
  transitionDuration: '0.3s',
  height: '40vw', 
}

function QuestionItem(props) {
  //@Amanda todo - when a question is edited, be sure the new data displays on DOM as well as DB.

  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);
  
  const question = props.question;
  
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Functional Component');
  
  const selectedQuestion = useSelector(store => store.question.selected);

  const setSelectedQuestion = (_question) => {
    console.log('clicked edit question');
    dispatch({ type: 'SET_SELECTED_QUESTION', payload: _question });
  }

  const deleteQuestion = () => {
    dispatch({ type: 'DELETE_QUESTION', payload: { question_id: question.id, parent_test_id: test.id } }); 
  }

  const updateQuestionToStegosaurus = () => {
    let testUpdateQuestion = {
      parent_test_id: test.id, //<--keep this the same :)
      created_by: user.id,  //<--keep this the same :)
      id: question.id,
      point_value: 8675309,
      type: "singular choice", 
      required: false, 
      question: "why are stegosauruses called that?",
      option_one: "it's powerful",
      option_two: "they're very steggy",
      option_three: "brontosaurus was taken",
      option_four: "it means 'spikey one'.",
      answer: "it means 'spikey one'.",
      active: false
    }
    dispatch({ type: 'UPDATE_QUESTION', payload: {question: testUpdateQuestion} })
  }


  return (
    <div>
      {/* <h2>I'm a question</h2>
      <p>stringified question:{JSON.stringify(question)}</p> */}
  
      <Card 
      className="questionCard"
      onClick={() => setSelectedQuestion(question)}
      style={cardStyle}>

        <CardContent>

          <Typography className="questionTitle" sx={{fontSize: 25}} gutterBottom>
            {props.question.question}
          </Typography> 

            <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > :not(style)': {m: 1}, }}
              > 
          <FormControl style={{ m: 1, minWidth: 120}} variant="outlined">
          <InputLabel id="dropDwn">{props.question.point_value} pts</InputLabel>
          <Select sx={{fontSize: 20}} autoWidth className="dropDwn">
            <MenuItem value={1}>{props.question.point_value} pts</MenuItem>
          </Select> 
          </FormControl> 
          <FormControl style={{ m: 1, minWidth: 160}} variant="outlined">
          <InputLabel id="dropDwn">{props.question.type}</InputLabel>
          <Select sx={{fontSize: 20}} autoWidth className="dropDwn">
            <MenuItem value={1}>{props.question.type} pts</MenuItem>
          </Select> 
          </FormControl> 
          </Box> 
            <br></br>
          <Typography sx={{fontSize: 20}} gutterBottom>
          <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
          {props.question.answer}
          </Typography> 
          <Typography sx={{fontSize: 20}} gutterBottom>
          <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
           {props.question.option_one}
          </Typography> 
          <Typography sx={{fontSize: 20}} gutterBottom>
          <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
          {props.question.option_two}
          </Typography> 
          <Typography sx={{fontSize: 20}} gutterBottom>
          <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
           {props.question.option_three}
          </Typography>
        </CardContent>
      {/* <Link to="/test" onClick={() => setSelectedQuestion(question)}> */}
        {/* when the edit button is clicked, this will move user to the /test page, and set the selectedTest to this one */}
        
        <CardActions disableSpacing> 
      
        <DeleteIcon onClick={deleteQuestion} /> 


        <IconButton aria-label="edit" color="primary">
           <MoreHorizIcon /> 
         </IconButton>
        </CardActions>
  
        
         {/* <button>Edit this Question</button>

        <button onClick={updateQuestionToStegosaurus}>For Testing - Edit this Question to be about stegosauruses instead</button> */}
        {/* <button onClick={deleteQuestion}>Delete this Question</button> */}
      {/* </Link> */}
     
      </Card>
    </div>
    
  );
}

export default QuestionItem;