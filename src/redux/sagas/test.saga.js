import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//this picks up component dispatches for tests. 
function* testSaga() {
  yield takeLatest('FETCH_TEST', fetchTest);//fetches all the info for a single test. 
  yield takeLatest('FETCH_ALL_TESTS', fetchAllTests);//fetches ALL tests in DB. 
  yield takeLatest('ADD_TEST', addTest);//posts a new test to the db.
  yield takeLatest('DELETE_TEST', deleteTest);//deletes a test from the db.
  yield takeLatest('UPDATE_TEST_SETTINGS', updateTestSettings);//updates any/all of the columns in the test table in the db. 
  yield takeLatest('FETCH_ALL_QUESTIONS', fetchAllQuestions);//fetches all questions for the selected test.
  yield takeLatest('FETCH_ALL_EXAM_QUESTIONS', fetchAllExamQuestions);//fetches all questions for the selected test.  yield takeLatest('ADD_QUESTION', addQuestion); //posts a new question to the db.
  yield takeLatest('UPDATE_QUESTION', updateQuestion); //updates an existing question in the db
  yield takeLatest('DELETE_QUESTION', deleteQuestion);//deletes a question from the db.
}

// worker Saga: will be fired on "DELETE_QUESTION" actions
function* deleteQuestion(action){
  const ap = action.payload;
  //ap.question_id
  //ap.parent_test_id
  try {
    yield axios.delete(`/api/question/${ap.question_id}`, {params:ap});
    yield put({ type: 'UNSET_SELECTED_QUESTION' });
    yield put({ type: 'FETCH_ALL_QUESTIONS', payload: {parent_test_id: ap.parent_test_id}})
    yield put({ type: 'FETCH_TEST', payload: {test_id:ap.parent_test_id} })

  } catch (error) {
    console.log('DELETE question failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_QUESTIONS" actions
function* fetchAllQuestions(action) {
  //fetch all questions for this test
  const ap = action.payload;
  //ap.parent_test_id 
  try {
    const response = yield axios.get('/api/question/all', { params: {parent_test_id: ap.parent_test_id} } );
    yield put({ type: 'SET_ALL_QUESTIONS', payload: response.data });
  } catch (error) {
    console.log('get questions request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_EXAM_QUESTIONS" actions
function* fetchAllExamQuestions(action) {
  //fetches all questions on this exam
  const ap = action.payload;
  try {
    const response = yield axios.get('/api/question/all', { params: {parent_test_id: ap.parent_test_id} } );
    yield put({ type: 'SET_ALL_EXAM_QUESTIONS', payload: response.data });
    yield put({ type: 'SET_SELECTED_EXAM_QUESTIONS', payload: response.data[0] });
  } catch (error) {
    console.log('get questions request failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_QUESTION" actions
function* updateQuestion(action){
  //when a question on a test is edited by a proctor (not a student changing answer
  //  - that would be an exam_detial affected, not a test's question)
  const ap = action.payload;
  //ap.question is the question object to update:
  //id, point_value, type, required, question, option_one (thru six), answer, status, 
  //parent_test_id, created_by
  try {
    yield axios.put(`/api/question/${ap.question.id}`, ap.question);
    yield put({ type: 'SET-UPDATE_SELECTED_QUESTION', payload: ap.question });
  } catch (error) {
    console.log('update question failed', error);
  }
}

// worker Saga: will be fired on "ADD_QUESTION" actions
function* addQuestion(action){
  //proctor add's a question to a test
  const ap = action.payload;
  //ap.question is the question object to add:
  //point_value, type, required, question, option_one (thru six), answer, status, 
  //parent_test_id, created_by
  let question = ap.question;
  try {
    const postedQuestion = yield axios.post('/api/question', ap.question );
    yield put({ type: 'FETCH_ALL_QUESTIONS', payload: {parent_test_id: question.parent_test_id} });
    yield put({ type: 'SET_SELECTED_QUESTION', payload: postedQuestion.data })
    yield put({ type: 'FETCH_TEST', payload: {test_id:question.parent_test_id} })
  } catch (error) {
    console.log('POST question failed', error);
  }
}


// worker Saga: will be fired on "UPDATE_TEST_SETTINGS" actions
function* updateTestSettings(action){
  //proctor changes test's settings, such as its pass/fail threshold or title
  const ap = action.payload;
   //ap.test is the test object to update, 
  //  including id, title, points_possible, test_time_limit, question_shuffle,
  //  test_attempt_limit, and .last_modified_by
  try {
    yield axios.put(`/api/test/${ap.test.id}`, ap.test);
    yield put({ type: 'SET-UPDATE_SELECTED_TEST', payload: ap.test });
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
