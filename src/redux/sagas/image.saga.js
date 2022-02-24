import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//for aws s3 image stuff

function* imageSaga() {
  yield takeLatest('FETCH_IMAGE_URL', fetchImageUrl);
  yield takeLatest('COMPARE_IMAGES', compareImages);
  
}

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchImageUrl() {
  // console.log('In fetchImageUrl');

  try {
        const url = yield axios.get('/api/image');
        yield put(
          { type: 'SET_IMAGE_URL', payload: url.data  }
          );
      } 
      catch (err) {
      console.log('fetchImageUrl error', err);
      } 

};
function* compareImages(action) {
  let ap = action.payload
  // console.log('In fetchImageUrl');

  try {
        yield put(
          { type: 'SET_SELECTED_EXAM', payload: ap.exam  }
          );
        ap.done() 
      } 
      catch (err) {
      console.log('fetchImageUrl error', err);
      } 

};


export default imageSaga;
