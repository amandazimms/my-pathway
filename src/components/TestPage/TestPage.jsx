import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function TestPage(props) {
  //This is the page a proctor is brought to upon clicking "add test" or "edit test";
  //if we arrive here by clicking "add" a new test, props.new will be true (see app.jsx, routes).
  //if we arrive by clicking "edit" an existing test, props.new will be false.
  //use isNew to conditionally render things! 
  const isNew = props.new; 

  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);
  const dispatch = useDispatch();

  //proctor inputs
  const [title, setTitle] = useState('');
  const [pointsPossible, setPointsPossible] = useState('');
  const [timeLimit, setTimeLimit] = useState(''); 
  const [questionShuffle, setQuestionShuffle] = useState(true); 
  const [testAttempt, setTestAttempt] = useState(''); 

  useEffect(() => {

  }, []);
  
  const addTest = () => {
    console.log('in add test');
   
    let newTest = { 
      //@Jackie or @Amanda todo: fill in this commented block with actual input values from DOM. 
      //  title: someString, 
      //  points_possible: someInt, 
      //  test_time_limit: someInt, 
      //  question_shuffle: bool, 
      //  test_attempt_limit: someInt,

      //then delete placeholder values below (except created_by).
       test_id: 1,
       title: "testy mctesterson", 
       points_possible: 999, 
       test_time_limit: 999, 
       question_shuffle: true, 
       test_attempt_limit: 66,

       created_by: user.id, //this is the proctor's id, should be already there in the store 
     } 
    dispatch({ type: 'ADD_TEST', 
    payload: {
      title: title, 
      pointsPossible: pointsPossible,
      timeLimit: timeLimit, 
      questionShuffle: questionShuffle,
      testAttempt: testAttempt
     } }); 
  }; 

  const updateTest = () => {
    console.log('in update test');

    let updatedTest = { 
      //@Amanda todo: fill in this commented block with actual input values from DOM. 
      //for update we could have the form auto populate each field with the existing choice
      //then it would work the same as add?
      //  title: someString, 
      //  points_possible: someInt, 
      //  test_time_limit: someInt, 
      //  question_shuffle: bool, 
      //  test_attempt_limit: someInt,

      //then delete placeholder values below (except created_by).
      title: "testeroonie", 
      points_possible: 222, 
      test_time_limit: 222, 
      question_shuffle: false, 
      test_attempt_limit: 123,

      created_by: user.id, //this is the proctor's id, should be already there in the store 
    } 
    dispatch({ type: 'UPDATE_TEST_SETTINGS', payload: { test: updatedTest } }); 
  }

  const deleteTest = () => {
    //@Jackie or @Amanda todo: as user first - "are you sure?"
    dispatch({ type: 'DELETE_TEST', payload: { test_id: test.id } }); 
  }

  return (
    <div>
<form className="formPanel" onSubmit={addTest}>
      <h2>Add a New Test</h2>
      <div>
        <label htmlFor="title">
          Exam Title:
          <input
            type="text"
            name="title"
            value={title}
            required
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="points_possible">
          Number of Points
          <input
            type="text"
            name="points_possible"
            value={pointsPossible}
            required
            onChange={(event) => setPointsPossible(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="Time">
          Time to complete exam: 
          <input
            type="text"
            name="test_time_limit"
            value={timeLimit}
            required
            onChange={(event) => setTimeLimit(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="boolean">
          Order of questions:
          <input
            type="text"
            name="question_shuffle"
            value={questionShuffle}
            required
            onChange={(event) => setQuestionShuffle(event.target.value)}
          />
        </label>
        </div>
        <div>
        <label htmlFor="attempts">
          Number of attempts allowed
          <input
            type="text"
            name="test_attempt_limit"
            value={testAttempt}
            required
            onChange={(event) => setTestAttempt(event.target.value)}
          />
        </label>
      </div>
    <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>

      { isNew
          // if we arrived at this page via "add test..."
        ? <button onClick={addTest}>Create Test</button>
        
          // else (if we arrived at this page via "edit (existing) test")
        : <>
            <button onClick={updateTest}>Save Test</button>

            {/* @Jackie or @Amanda todo - delete button may not make the most sense here */}
            <button onClick={deleteTest}>Delete Test</button>
          </>
      }

    </div>
  );
}

export default TestPage;
