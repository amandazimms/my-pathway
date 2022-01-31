import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* testSaga() {
  yield takeLatest('FETCH_TEST', fetchTest);//fetches all the info for a single test. 
    //dispatch({ type: 'FETCH_TEST', payload: {test_id: putSomethingHere} }); 
  yield takeLatest('FETCH_ALL_TESTS', fetchAllTests);//fetches ALL tests in DB. 
    //dispatch({ type: 'FETCH_ALL_TESTS' }); 
  yield takeLatest('ADD_TEST', addTest);//posts a new test to the db.
    //dispatch({ type: 'ADD_TEST', payload: { test: newTest } }); 
  yield takeLatest('DELETE_TEST', deleteTest);//deletes a test from the db.
    //dispatch({ type: 'DELETE_TEST', payload: { test_id: putSomethingHere } }); 
  yield takeLatest('UPDATE_TEST_SETTINGS', updateTestSettings);//updates any/all of the columns in the test table in the db.
    //dispatch({ type: 'UPDATE_TEST_SETTINGS', payload: { test: updatedTest } }); 
 
  yield takeLatest('FETCH_ALL_QUESTIONS', fetchAllQuestions);//fetches all questions for the selected test.
    // dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: {parent_test_id: test.id} });
  yield takeLatest('ADD_QUESTION', addQuestion); //posts a new question to the db.
    //dispatch({ type: '', payload: { question: newQuestion} }
  yield takeLatest('UPDATE_QUESTION', updateQuestion); //updates an existing question in the db
    // dispatch({ type: 'UPDATE_QUESTION', payload: {question: updatedQuestion} })
  yield takeLatest('DELETE_QUESTION', deleteQuestion);//deletes a question from the db.
    // dispatch({ type: 'DELETE_QUESTION', payload: { question_id: putSomethingHere, test_id: test.id } }); 
}


// worker Saga: will be fired on "DELETE_QUESTION" actions
function* deleteQuestion(action){
  const ap = action.payload;
  //ap.question_id
  //ap.test_id
  try {
    yield axios.delete(`/api/question/${ap.question_id}`);
    yield put({ type: 'UNSET_SELECTED_QUESTION' });
    yield put({ type: 'FETCH_ALL_QUESTIONS', payload: {parent_test_id: ap.parent_test_id}})

  } catch (error) {
    console.log('DELETE question failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_QUESTIONS" actions
function* fetchAllQuestions(action) {
  const ap = action.payload;
  console.log('fetch all, ap:', ap)
  //ap.parent_test_id 
  try {
    const response = yield axios.get('/api/question/all', { params: {parent_test_id: ap.parent_test_id} } );
    yield put({ type: 'SET_ALL_QUESTIONS', payload: response.data });
  } catch (error) {
    console.log('get questions request failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_QUESTION" actions
function* updateQuestion(action){
  const ap = action.payload;
  //ap.question is the question object to add:
  //id, point_value, type, required, question, option_one (thru six), answer, status, 
  //parent_test_id, created_by
  try {
    yield axios.put(`/api/question/${ap.question.id}`, ap.question);
    yield put({ type: 'SET-UPDATE_SELECTED_QUESTION', payload: ap.question });
      //todo ^ @Amanda - definitely need to verify that this works correctly
  } catch (error) {
    console.log('update question failed', error);
  }
}

// worker Saga: will be fired on "ADD_QUESTION" actions
function* addQuestion(action){
  const ap = action.payload;
  //ap.question is the question object to add:
  //point_value, type, required, question, option_one (thru six), answer, status, 
  //parent_test_id, created_by
  let question = ap.question;
  try {
    const postedQuestion = yield axios.post('/api/question', ap.question );
    question = {...question, id: postedQuestion.data.id, create_date: postedQuestion.data.create_date, last_modified_date: postedQuestion.data.last_modified_date }
    yield put({ type: 'FETCH_ALL_QUESTIONS', payload: {parent_test_id: question.parent_test_id} });
    yield put({ type: 'SET_SELECTED_QUESTION', payload: {question} })
  } catch (error) {
    console.log('POST question failed', error);
  }
}


// worker Saga: will be fired on "UPDATE_TEST_SETTINGS" actions
function* updateTestSettings(action){
  const ap = action.payload;
   //ap.test is the test object to update, 
  //  including id, title, points_possible, test_time_limit, question_shuffle,
  //  test_attempt_limit, and .last_modified_by
  try {
    yield axios.put(`/api/test/${ap.test.id}`, ap.test);
    yield put({ type: 'SET-UPDATE_SELECTED_TEST', payload: ap.test });
      //todo ^ @Amanda - definitely need to verify that this works correctly
  } catch (error) {
    console.log('update test settings failed', error);
  }
}

// worker Saga: will be fired on "DELETE_TEST" actions
function* deleteTest(action){
  const ap = action.payload;
  //ap.test_id 
  try {
    yield axios.delete(`/api/test/${ap.test_id}`);
    yield put({ type: 'UNSET_SELECTED_TEST' });
    //note - unsure if we need to fetch_all_tests here... I suppose deleting a test would bring
    //the proctor back to the "all tests" type view, but that should be doing its own 
    //fetch_all_tests already. if needed we can add one here!
  } catch (error) {
    console.log('DELETE test failed', error);
  }
}

// worker Saga: will be fired on "ADD_TEST" actions
function* addTest(action){
  const ap = action.payload;
  //ap.test is the test object to add, 
  //  including title, points_possible, test_time_limit, question_shuffle,
  //  test_attempt_limit, and .created_by
  let test = ap.test;  //first declare test obj with all the test data from ap. 
  try {
    const postedTest = yield axios.post('/api/test', ap.test );  //now add to that test object the id & dates that were created when it was posted to DB
    test = {...test, id: postedTest.data.id, create_date: postedTest.data.create_date, last_modified_date: postedTest.data.last_modified_date }
    yield put({ type: 'SET_SELECTED_TEST', payload: test }); //finally send the 'complete' test object to the reducer
    //note - I did not put a fetch_all_tests here since when a proctor creates a test, they are
    // necessarily now selecting that test. if they navigate back to the 'all tests' type view,
    // there a fetch_all_tests will be triggered anwyay. If needed we can add one of those here too.

  } catch (error) {
    console.log('POST test failed', error);
  }
}

// worker Saga: will be fired on "FETCH_TEST" actions
function* fetchTest(action) {
  const ap = action.payload;
  //ap.test_id is the test id to fetch
  try {
    const response = yield axios.get('/api/test/selected', { params: {test_id: ap.test_id} });
    yield put({ type: 'SET_SELECTED_TEST', payload: response.data });
  } catch (error) {
    console.log('get test request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_TESTS" actions
function* fetchAllTests() {
  try {
    const response = yield axios.get('/api/test/all');
    yield put({ type: 'SET_ALL_TESTS', payload: response.data });
  } catch (error) {
    console.log('get all tests request failed', error);
  }
}

export default testSaga;
