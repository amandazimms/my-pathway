import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* messageSaga() {
  yield takeLatest('CREATE_MESSAGE_SESSION', createMessageSession);
  yield takeLatest('CREATE_MESSAGE_DETAIL', createMessageDetail);
}

// worker Saga: will be fired on "FETCH_QUIZ" actions
function* createMessageSession(info) {
 
  try {
    // console.log("createMessage Saga");
    const response = yield axios({
      method: 'POST',
      url: '/api/message/session',
      data: info.payload
    });
    
    yield put({ type: 'SET_ACTIVE_MESSAGE_SESSION', payload: response.data });

  } catch (error) {
    console.log('message get request failed', error);
  }
}

function* createMessageDetail(info) {
 
  try {
    console.log("createMessageDetail Saga", info);
    const response = yield axios({
      method: 'POST',
      url: '/api/message/detail',
      data: info.payload
    });
    
    yield put({ type: 'SET_ACTIVE_MESSAGE_DETAIL', payload: response.data });

  } catch (error) {
    console.log('message get request failed', error);
  }
}

export default messageSaga;
