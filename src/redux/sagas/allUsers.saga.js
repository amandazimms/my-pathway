import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* messageSaga() {
  yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
 
}


function* fetchAllUsers() {
 
  try {
    console.log("fetchAllUsers Saga");
    const response = yield axios.get('/api/allusers');
    
    yield put({ type: 'SET_ALL_USERS', payload: response.data });

  } catch (error) {
    console.log('fetchAllUsers request failed', error);
  }
};

export default messageSaga;
