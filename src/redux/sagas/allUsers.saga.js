import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

/*
  This picks up component dispatches for "other users", not the user that is logged in
  e.g. get all the users; get all the proctors; or make another user into a proctor
*/

function* allUsers() {
  yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
  yield takeLatest('UPDATE_USER_ROLE', updateUserRole);
  yield takeLatest('FETCH_ALL_PROCTORS', fetchAllProctors);
}

function* fetchAllUsers() {
  try {
    const response = yield axios.get('/api/allusers');
    
    yield put({ type: 'SET_ALL_USERS', payload: response.data });

  } catch (error) {
    console.log('fetchAllUsers request failed', error);
  }
};

function* fetchAllProctors() {
  try {
    const response = yield axios.get('/api/allusers/proctors');
    
    yield put({ type: 'SET_ALL_PROCTORS', payload: response.data });

  } catch (error) {
    console.log('fetchAllProctors request failed', error);
  }
};

function* updateUserRole(info) {
  //used for changing a user from student to proctor
 
  try {
    const response = yield axios.put('/api/allusers/role', info.payload);
    
    yield put({ type: 'SET_ALL_USERS', payload: response.data });

  } catch (error) {
    console.log('fetchAllUsers request failed', error);
  }
};



export default allUsers;
