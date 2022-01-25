import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* testSaga() {
  yield takeLatest('FETCH_TEST', fetchTest);

    //@jackie saga/dispatch - fetches all the info for a single test. 
    //to dispatch from component, use example:
    //dispatch({ type: 'FETCH_TEST', payload: {test_id: putSomethingHere} }); 
  
  yield takeLatest('FETCH_ALL_TESTS', fetchAllTests);
    //@jackie saga/dispatch - fetches ALL tests in DB. 
    //to dispatch from component, use example:
    //dispatch({ type: 'FETCH_ALL_TESTS' }); 

  yield takeLatest('ADD_TEST', addTest);
    //@jackie saga/dispatch - posts a new test to the db.
    //to dispatch from component, use example:
    //  first populate some object like newTest with all the needed data, then dispatch it
    //  newTest = { 
    //    title: someString, 
    //    points_possible: someInt, 
    //    test_time_limit: someInt, 
    //    question_shuffle: bool, 
    //    test_attempt_limit: someInt,
    //    created_by: user.id, //this is the proctor's id, should be already there in the store 
    //  } 
    //dispatch({ type: 'ADD_TEST', payload: { test: newTest } }); 
    
  yield takeLatest('DELETE_TEST', deleteTest);
    //@jackie saga/dispatch - deletes a test from the db.
    //to dispatch from component, use example:
    //dispatch({ type: 'DELETE_TEST', payload: { test_id: putSomethingHere } }); 

  yield takeLatest('UPDATE_TEST_SETTINGS', updateTestSettings);  
    //@jackie saga/dispatch - updates any/all of the columns in the test table in the db.
    //I chose to add 'settings' to this here because of their wireframe naming - 
    //  the test 'settings' are all the columns in the test table
    //  the test questions of course live in the questions table
    //
    //To dispatch from component, use example:
    //  First populate some object like updatedTest with all the needed data, then dispatch it.
    //  User can choose to edit, for example, only 1-2 fields, 
    //  and the rest we can use the existing values in the selectedTest store.
    //
    //  updatedTest = { 
    //    title: someString, 
    //    points_possible: someInt, 
    //    test_time_limit: someInt, 
    //    question_shuffle: bool, 
    //    test_attempt_limit: someInt,
    //    last_modified_by: user.id, //this is the proctor's id, should be already there in the store 
    //  } 
    //dispatch({ type: 'ADD_TEST', payload: { test: updatedTest } }); 
  }



// worker Saga: will be fired on "UPDATE_TEST_SETTINGS" actions
function* updateTestSettings(action){
  const ap = action.payload;
   //ap.test is the test object to update, 
  //  including title, points_possible, test_time_limit, question_shuffle,
  //  test_attempt_limit, and .last_modified_by

  try {
    yield axios.put(`/api/test${ap.test_id}`, ap.test);
    yield put({ type: 'UPDATE_SELECTED_TEST', payload: ap.test });
      //todo ^ AZ - definitely need to verify that this works correctly

  } catch (error) {
    console.log('update test settings failed', error);

  }
}

// worker Saga: will be fired on "DELETE_TEST" actions
function* deleteTest(action){
  const ap = action.payload;
  //ap.test_id 

  try {
    yield axios.delete(`/api/test${ap.test_id}`);

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

  //first declare test obj with all the test data from ap. 
  let test = ap.test;

  try {
    const postedTest = yield axios.post('/api/test', ap.test );

    //now add to that test object the id & dates that were created when it was posted to DB
    test = {...test, id: postedTest.id, create_date: postedTest.create_date, last_modified_date: postedTest.last_modified_date }

    //finally send the 'complete' test object to the reducer
    yield put({ type: 'SET_SELECTED_TEST', payload: test })
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
