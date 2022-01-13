import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* goalSaga() {
  yield takeLatest('FETCH_QUIZ', fetchQuiz);
}

// worker Saga: will be fired on "FETCH_QUIZ" actions
function* fetchQuiz() {

  try {
    const response = yield axios.get('/api/quiz');
    
    yield put({ type: 'SET_QUIZ', payload: response.data });

  } catch (error) {
    console.log('quiz get request failed', error);
  }
}

export default userSaga;
