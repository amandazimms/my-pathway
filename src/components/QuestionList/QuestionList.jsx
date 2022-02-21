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
  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);
  const questions = useSelector(store => store.question.all);
  // const questions = ["fakeTest1", "fakeTest2"]
  const dispatch = useDispatch();

  // const [heading, setHeading] = useState('Functional Component');

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

  const addQuestionAboutButterflies = () => {
    let testerQuestion = {
      parent_test_id: test.id, //<--keep this the same :)
      created_by: user.id,  //<--keep this the same :)
      point_value: 42,
      type: "multiple choice", 
      required: true, 
      question: "why are butterflies called that?",
      option_one: "it's cute",
      option_two: "butter is tasty",
      option_three: "they fly",
      option_four: "flutterbys was already taken",
      answer: "flutterbys was already taken",
      active: true
    }
    dispatch({ type: 'ADD_QUESTION', payload: {question: testerQuestion} })
  } 

  return (
    <div>

      {/* <h2>Here's all the questions</h2> */}
      {/* <p>all questions stringified: {JSON.stringify(questions)}</p> */}

      {/* <Button onClick={addQuestionAboutButterflies}>For testing only ! add question about butterflies</Button> */}
    
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
