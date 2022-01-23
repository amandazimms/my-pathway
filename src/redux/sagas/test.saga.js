import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* testSaga() {
  yield takeLatest('FETCH_TEST', fetchQuiz);
}

// worker Saga: will be fired on "FETCH_QUIZ" actions
function* fetchQuiz() {
 
  try {
    console.log("fetchTest Saga");
    const response = yield axios.get('/api/test');
    
    yield put({ type: 'SET_TEST', payload: response.data });

  } catch (error) {
    console.log('test get request failed', error);
  }
}

export default testSaga;
