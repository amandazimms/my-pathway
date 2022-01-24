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
}

// worker Saga: will be fired on "FETCH_TEST" actions
function* fetchTest(action) {
  //ap.test_id is the test id to fetch
  const ap = action.payload;
 
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
