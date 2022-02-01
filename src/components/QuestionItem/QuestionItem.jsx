import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

//Material-UI imports 
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function QuestionItem(props) {

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
      status: "i'm still not sure what to put here",
    }
    dispatch({ type: 'UPDATE_QUESTION', payload: {question: testUpdateQuestion} })
  }

  return (
    <div>
      <h2>I'm a question</h2>
      <p>stringified question:{JSON.stringify(question)}</p>

      <Link to="/test" onClick={() => setSelectedQuestion(question)}>
        {/* when the edit button is clicked, this will move user to the /test page, and set the selectedTest to this one */}
        <button>Edit this Question</button>
        <button onClick={updateQuestionToStegosaurus}>For Testing - Edit this Question to be about stegosauruses instead</button>
        <button onClick={deleteQuestion}>Delete this Question</button>
      </Link>
    </div>
    
  );
}

export default QuestionItem;