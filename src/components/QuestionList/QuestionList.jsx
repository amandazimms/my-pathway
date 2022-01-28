import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import TestItem from '../TestItem/TestItem';
import QuestionItem from '../QuestionItem/QuestionItem';
import { Button } from '@material-ui/core';
import NewQuestionModal from '../NewQuestionModal/NewQuestionModal';


function QuestionList(props) {

  const questions = useSelector(store => store.question.all);
  // const questions = ["fakeTest1", "fakeTest2"]
  const dispatch = useDispatch();

  // const [heading, setHeading] = useState('Functional Component');

  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_QUESTIONS' }); 
  }, []);
  
  const addQuestion=()=> {
    setShowModal(!showModal)
    console.log(showModal); 
  }

  const closeModal=()=>{
    setShowModal(false); 
    console.log('closeModal running', showModal); 
  }

  return (
    <div>
      <h2>Here's all the questions</h2>
      <p>all questions stringified: {JSON.stringify(questions)}</p>

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
