import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function TestPage(props) {
  //This is the page a proctor is brought to upon clicking "add test" or "edit test";
  //if we arrive here by clicking "add" a new test, props.new will be true (see app.jsx, routes).
  //if we arrive by clicking "edit" an existing test, props.new will be false.
  //use isNew to conditionally render things! 

  //are we pushing to master?
  const isNew = props.new; 

  const store = useSelector(store => store);
  const user = useSelector(store => store.user);
  const test = useSelector(store => store.test.selected);

  const questions = useSelector(store => store.question.all); 
  const selectedQuestion = useSelector(store => store.question.selected)//todo @Amanda not sure what component(s) will need this

  const dispatch = useDispatch();

  //proctor inputs
  const [title, setTitle] = useState('');
  const [pointsPossible, setPointsPossible] = useState('');
  const [timeLimit, setTimeLimit] = useState(''); 
  const [questionShuffle, setQuestionShuffle] = useState(true); 
  const [testAttempt, setTestAttempt] = useState(''); 

  useEffect(() => {
    dispatch({ type: 'FETCH_QUESTIONS', payload: {test_id: test.id} });
  }, []);
  
  const addTest = () => {
    //this function should run when user(proctor) has FINISHED entering all of the settings for a test, 
    //and then clicks "Create test"
    console.log('in add test');
   
    let newTest = { 
      //@Jackie or @Amanda todo: fill in this commented block with actual input values from DOM. 
      //  title: someString, 
      //  points_possible: someInt, 
      //  test_time_limit: someInt, 
      //  question_shuffle: bool, 
      //  test_attempt_limit: someInt,

      //then delete placeholder values below (except created_by).
       title: "testy mctesterson", 
       points_possible: 999, 
       test_time_limit: 999, 
       question_shuffle: true, 
       test_attempt_limit: 66,

       created_by: user.id, //this is the proctor's id, should be already there in the store 
     } 
    //  @J-A Pair Todo - rework this to look like payload: { test: newTest }
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

      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      id: test.id, //this is also in store already
    } 
    dispatch({ type: 'UPDATE_TEST_SETTINGS', payload: { test: updatedTest } }); 
  }

  const deleteTest = () => {
    //@Jackie or @Amanda todo: as user first - "are you sure?"
    dispatch({ type: 'DELETE_TEST', payload: { test_id: test.id } }); 
  }

  const addQuestion = () => {
    //this function should run when user(proctor) has FINISHED entering all of the info for a question, 
    //and then clicks "Create question"

    //@Jackie or @Amanda todo: I didn't build out anything in the DOM yet for adding a question, 
    //so this function is not called from anywhere yet (unlike addTest which I had stubbed out in the return below)
    //I skipped this one because Jackie it looked like you were all up in them guts 
    //and I didn't want to make more merge conflicts for you :P
    
    console.log('in add question');
    let newQuestion = {
      //@Jackie or @Amanda todo: fill in these values with user inputs from DOM (except parent and created)
      point_value: someInt,
      type: someString,
      required: bool,
      question: someString,
      option_one: someString,
      option_two: someString,
      option_three: someString,
      option_four: someString,
      option_five: someString,
      option_six: someString,
      answer: someString,
      status: someString,

      parent_test_id: test.id, //this is the test this question s on, should be already there in the store
      created_by:  user.id //this is the proctor's id, should be already there in the store 
    }
    dispatch({ type: 'ADD_QUESTION', payload: { question: newQuestion} })
  }

  const updateQuestion = () => {
    //this function should run when user(proctor) clicks to edit an existing question,
    //makes the edit(s), then FINISHES entering all of the info, then clicks "Save"

    //@Jackie or @Amanda todo: I didn't build out anything in the DOM yet for updating a question, 
    //so this function is not called from anywhere yet (unlike updateTest which I had stubbed out in the return below)
    //I skipped this one because Jackie it looked like you were all up in them guts 
    //and I didn't want to make more merge conflicts for you :P
    
    console.log('in update question');
    let updatedQuestion = {
      //@Jackie or @Amanda todo: fill in these values with user inputs from DOM (except parent and created)
      //for update we could have the form auto populate each field with the existing choice
      //then it would work the same as add?
      point_value: someInt,
      type: someString,
      required: bool,
      question: someString,
      option_one: someString,
      option_two: someString,
      option_three: someString,
      option_four: someString,
      option_five: someString,
      option_six: someString,
      answer: someString,
      status: someString,

      parent_test_id: test.id, //this is the test this question s on, should be already there in the store
      last_modified_by:  user.id //this is the proctor's id, should be already there in the store 
    }
    dispatch({ type: 'UPDATE_QUESTION', payload: {question: updatedQuestion} })
  }

  const deleteQuestion = () => {
    //@Jackie or @Amanda todo: as user first - "are you sure?"
    //@Jackie or @Amanda todo: add the actual question id in payload
    dispatch({ type: 'DELETE_QUESTION', payload: { question_id: putSomethingHere, test_id: test.id } }); 
  }

  const tacoTitleTest = () => {
    console.log('in update test');

    let updatedTest = {
      title: "TACO", 
      points_possible: test.points_possible,
      test_time_limit: test.test_time_limit,
      question_shuffle: test.question_shuffle,
      test_attempt_limit: test.test_attempt_limit,
      last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
      id: test.id, //this is also in store already
    } 
    dispatch({ type: 'UPDATE_TEST_SETTINGS', payload: { test: updatedTest } }); 
  }

  const marigoldTestTest = () => {
    let newTest = { 
       title: "marigold", 
       points_possible: 999, 
       test_time_limit: 999, 
       question_shuffle: true, 
       test_attempt_limit: 66,
       created_by: user.id, //this is the proctor's id, should be already there in the store 
    }
    dispatch({ type: 'ADD_TEST', payload: { test: newTest } }); 
  }

  return (
    <div>
      {/* <button onClick={tacoTitleTest}>For Testing only :) Click to change existing test's title to taco</button> */}
      {/* <button onClick={marigoldTestTest}>4 Testing only :P Click to add a new test with title marigold</button> */}

      <form className="formPanel" onSubmit={addTest}>
     
      {/* @J-A Pair Todo - add a conditional render here for "new test" vs "edit existing" */}
      <h2>Add a New Test</h2>
      
      <p>{JSON.stringify(test)}</p>
      <div>

        {/* @J-A Pair Todo - IF isNew = false, populate these form input fields with existing data */}
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
