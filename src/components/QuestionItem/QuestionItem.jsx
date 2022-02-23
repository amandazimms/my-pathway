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
import Avatar from '@mui/material/Avatar';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CardHeader from '@mui/material/CardHeader';
import { styled } from '@mui/material/styles';


const label = { inputProps: { 'aria-label': 'Switch demo' } };


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function QuestionItem(props) {
  /*
    Children of QuestionList
  */
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

const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
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
          
          {/* </Box>  */}

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
      
        <IconButton aria-label="edit" color="primary" onClick={deleteQuestion}>
          <DeleteIcon className="questionIcon" /> 
        </IconButton>

        {/* <IconButton aria-label="edit" color="primary">
          <Switch {...label} defaultChecked className="questionIcon"/> 
        </IconButton> */}

        {/* <IconButton aria-label="edit" color="primary">
          <MoreHorizIcon className="questionIcon"/> 
        </IconButton> */}

          {/* No CRUD for this - out of scope */}
          {/* <button>Edit this Question</button> */}
     
      </Card>
    </div>
    
  );
}

export default QuestionItem;