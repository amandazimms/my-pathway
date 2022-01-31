import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestItem from '../TestItem/TestItem';
import QuestionItem from '../QuestionItem/QuestionItem';
import { Button } from '@material-ui/core';
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';


function QuestionList(props) {

  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);
  const questions = useSelector(store => store.question.all);
  // const questions = ["fakeTest1", "fakeTest2"]
  const dispatch = useDispatch();

  // const [heading, setHeading] = useState('Functional Component');

  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: {test_id: test.id} }); 
  }, []);
  
  const addQuestion=()=> {
    setShowModal(!showModal)
    console.log(showModal); 
  }

  const closeModal=()=>{
    setShowModal(false); 
    console.log('closeModal running', showModal); 
  }

  const addQuestionAboutButterflies = () => {
    let testerQuestion = {
      parent_test_id: test.id, //<--keep this the same :)
      created_by: user.id,  //<--keep this the same :)
      pointValue: 42,
      type: "multiple choice", 
      required: true, 
      question: "why are butterflies called that?",
      optionOne: "it's cute",
      optionTwo: "butter is tasty",
      optionThree: "they fly",
      optionFour: "flutterbys was already taken",
      answer: "flutterbys was already taken",
      status: "i'm not sure what to put here",
    }
    dispatch({ type: 'ADD_QUESTION', payload: {question: testerQuestion} })
  } 

  return (
    <div>
      <h2>Here's all the questions</h2>
      <p>all questions stringified: {JSON.stringify(questions)}</p>

      <Button onClick={addQuestionAboutButterflies}>For testing only ! add question about butterflies</Button>
      <Button onClick={addQuestion}>Add Question</Button>

      {questions.map(question => (
        // <TestItem test={test} key={test.id}/>
        <QuestionItem /> 
      ))}

        { showModal?
          <NewQuestionModal onClickClose={()=>closeModal()}/> 
          :<></>
        }

    </div>
  );
}

export default QuestionList;
