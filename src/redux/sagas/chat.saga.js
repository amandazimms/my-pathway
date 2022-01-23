import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* chatSaga() {
  yield takeLatest('CREATE_MESSAGE_SESSION', createChat);
}

// worker Saga: will be fired on "FETCH_QUIZ" actions
function* createChat(info) {
 
  try {
    // console.log("createChat Saga");
    const response = yield axios({
      method: 'POST',
      url: '/api/chat',
      data: info.payload
    });
    
    yield put({ type: 'SET_ACTIVE_MESSAGE_SESSION', payload: response.data });

  } catch (error) {
    console.log('quiz get request failed', error);
  }
}

export default chatSaga;
