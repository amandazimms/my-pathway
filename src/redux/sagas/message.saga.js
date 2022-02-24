import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* messageSaga() {
  yield takeLatest('CREATE_MESSAGE_SESSION', createMessageSession);
  yield takeLatest('GET_MESSAGE_SESSION', getMessageSession);
  yield takeLatest('GET_MESSAGE_DETAIL', getMessageDetail);  
  yield takeLatest('CREATE_MESSAGE_DETAIL', createMessageDetail);
  yield takeLatest('GET_AVAILALE_MESSAGE_SESSIONS', getAvailableMessageSessions);
}

function* createMessageSession(info) {
  try {
    const response = yield axios({
      method: 'POST',
      url: '/api/message/session',
      data: info.payload
    });

    yield put({ type: 'SET_ACTIVE_MESSAGE_SESSION', payload: response.data });
    info.payload.done();

  } catch (error) {
    console.log('message get request failed', error);
  }
}

function* getMessageSession(info) {
  try {
    const response = yield axios.get('/api/message/fetch-active',{params: info.payload});
    
    yield put({ type: 'SET_ACTIVE_MESSAGE_SESSION', payload: response.data });
    info.payload.done();

  } catch (error) {
    console.log('message get request failed', error);
  }
};

function* getMessageDetail(info) {
  try {
    const response = yield axios.get('/api/message/detail',{params: info.payload});
    
    yield put({ type: 'SET_ACTIVE_MESSAGE_DETAIL', payload: response.data });

  } catch (error) {
    console.log('message get request failed', error);
  }
};

function* createMessageDetail(info) {
  try {
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

function* getAvailableMessageSessions(info) {
  try {
    const response = yield axios.get('/api/message/sessions',{params: info.payload});
    
    yield put({ type: 'SET_AVAILABLE_MESSAGE_SESSIONS', payload: response.data });

  } catch (error) {
    console.log('message get request failed', error);
  }
}

export default messageSaga;
