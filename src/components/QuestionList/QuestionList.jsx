import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestCard from '../TestCard/TestCard'
import QuestionItem from '../QuestionItem/QuestionItem';
import { Button } from '@material-ui/core';
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Container from "@mui/material/Container"; 
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';


function QuestionList(props) {
  /*
    Displays many QuestionItems as its children

    Lives in the TestPage component as the content of the Questions "Tab"
  */
  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);
  const questions = useSelector(store => store.question.all);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false); 
  const [testValue, setTestValue] = useState(0)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: {parent_test_id: test.id} }); 
  }, []);
  
  const addQuestion=()=> {
    setShowModal(!showModal)
  }

  const closeModal=()=>{
    setShowModal(false); 
  }

  return (
    <div>
      <Container className="testPageContainer">

      <Box component="span" sx={{ display: 'block' }}>TOTAL TEST POINTS: {store.test.selected.points_possible}pts</Box>
      <br />
      <IconButton helvetica-label="addQuestion" color="primary" size="medium" onClick={addQuestion} className="addQuestion">
        <AddCircleOutlineIcon fontSize="large"></AddCircleOutlineIcon>
        &nbsp; ADD QUESTION
      </IconButton>
      <br></br> 
        <section className="questions">

      {questions.map(question => (
        <QuestionItem question={question} key={question.id}/> 
      ))}

      </section>
      </Container>

        { showModal?
          <NewQuestionModal onClickClose={()=>closeModal()}/> 
          :<></>
        }

    </div>
  );
}

export default QuestionList;
