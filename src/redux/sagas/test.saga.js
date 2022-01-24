import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* testSaga() {
  yield takeLatest('FETCH_TEST', fetchTest);
}

// worker Saga: will be fired on "TEST_QUIZ" actions
function* fetchTest() {
 
  try {
    console.log("fetchTest Saga");
    const response = yield axios.get('/api/test');
    
    yield put({ type: 'SET_TEST', payload: response.data });

  } catch (error) {
    console.log('test get request failed', error);
  }
}

export default testSaga;
