import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

function* imageSaga() {
  yield takeLatest('FETCH_IMAGE_URL', fetchImageUrl);
  yield takeLatest('COMPARE_IMAGES', compareImages);
  
}

export default imageSaga;
