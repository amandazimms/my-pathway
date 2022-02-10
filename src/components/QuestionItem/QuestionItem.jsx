import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import '../QuestionItem/QuestionItem.css'
//Material-UI imports 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Switch from '@mui/material/Switch';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {Select, MenuItem, FormControl, InputLabel, makeStyles} from "@material-ui/core"; 
import Box from '@mui/material/Box';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

var cardStyle = {
  display: 'block',
  width: '60vw',
  transitionDuration: '0.3s',
  height: '53vw', 
}

function QuestionItem(props) {
  //@Amanda todo - when a question is edited, be sure the new data displays on DOM as well as DB.

  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);
  
  const question = props.question;
  
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Functional Component');
  const [testValue, setTestValue] = useState(0)

  useEffect(() => {
    findTestValue()
  },[])

  const findTestValue = () => {
    let result = 0
    for(let i=0; i<store.question.all.length; i++){
      result += store.question.all[i].point_value
    }
    setTestValue(result)
    return result
  }
  
  const selectedQuestion = useSelector(store => store.question.selected);

  const setSelectedQuestion = (_question) => {
    console.log('clicked edit question');
    dispatch({ type: 'SET_SELECTED_QUESTION', payload: _question });
  }

  const deleteQuestion = () => {
    dispatch({ 
      type: 'DELETE_QUESTION', 
    payload: { 
      test_value: (testValue-question.point_value),
      question_id: question.id, 
      parent_test_id: test.id,
      user_id:store.user.id
       } }); 
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
              '& > :not(style)': {m: 1}, 
            }}
          > 

            <Typography sx={{fontSize: 20}} gutterBottom>
              {props.question.point_value} pts
            </Typography>
          
            {/* <FormControl style={{ m: 1, minWidth: 120}} variant="outlined">
              <p></p>
              <InputLabel id="dropDwn">{props.question.point_value} pts</InputLabel>
              <Select sx={{fontSize: 20}} autoWidth className="dropDwn">
                <MenuItem value={1}>{props.question.point_value} pts</MenuItem>
              </Select> 
            </FormControl>  */}
          
            {/* partially built - ability to display question type (multiple choice, ___) */}
            {/* <FormControl style={{ m: 1, minWidth: 160}} variant="outlined">
              <InputLabel id="dropDwn">{props.question.type}</InputLabel>
              <Select sx={{fontSize: 20}} autoWidth className="dropDwn">
                <MenuItem value={1}>{props.question.type} pts</MenuItem>
              </Select> 
            </FormControl>  */}
          
          </Box> 

          <br></br>

          <Typography sx={{fontSize: 20}} gutterBottom>
          <RadioButtonCheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
          {props.question.answer}
          </Typography> 
          
          <Typography sx={{fontSize: 20}} gutterBottom>
          <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
          {props.question.option_two}
          </Typography> 

          <Typography sx={{fontSize: 20}} gutterBottom>
          <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
           {props.question.option_three}
          </Typography>

          <Typography sx={{fontSize: 20}} gutterBottom>
          <RadioButtonUncheckedIcon sx={{color: 'action.active', mr: 1, my: .05}}/>
           {props.question.option_four}
          </Typography>

        </CardContent>
      {/* <Link to="/test" onClick={() => setSelectedQuestion(question)}> */}
        {/* when the edit button is clicked, this will move user to the /test page, and set the selectedTest to this one */}
        
        <CardActions disableSpacing> 
      
        <IconButton aria-label="edit" color="primary" onClick={deleteQuestion}>
          <DeleteIcon className="questionIcon" /> 
        </IconButton>

        {/* <IconButton aria-label="edit" color="primary">
          <Switch {...label} defaultChecked className="questionIcon"/> 
        </IconButton> */}

        {/* <IconButton aria-label="edit" color="primary">
          <MoreHorizIcon className="questionIcon"/> 
        </IconButton> */}

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