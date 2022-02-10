import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
  yield takeLatest('SET_EXAM_PHOTO', setExamPhoto);//inputs the student photo url into exam table
  yield takeLatest('SET_ID_PHOTO', setIdPhoto);//inputs the id card image url into exam table. 
  yield takeLatest('CONFIRM_STUDENT_ID', confirmId);//updates the value of confirm_id in exam table. 
  
  yield takeLatest('FETCH_SELECTED_EXAM', fetchSelectedExam);//fetches all the info for a single Exam. 
    //dispatch({ type: 'FETCH_SELECTED_EXAM', payload: {exam_id: putSomethingHere} }); 
  yield takeLatest('APPROVE_EXAM', approveExam);
    //dispatch({ type:'APPROVE_EXAM', payload: {exam_id: exam.exam_id} })
  yield takeLatest('REJECT_EXAM', rejectExam);
    //dispatch({ type:'REJECT_EXAM', payload: {exam_id: exam.exam_id} })
  yield takeLatest('PASS_EXAM', passExam);
    //dispatch({ type:'PASS_EXAM', payload: {exam_id: exam.exam_id} })
  yield takeLatest('FAIL_EXAM', failExam);
    //dispatch({ type:'FAIL_EXAM', payload: {exam_id: exam.exam_id} })

 }


// worker Saga: will be fired on "PASS_EXAM" actions
function* passExam(action){
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/passFail/${ap.exam_id}`, {pass: "PASS"} );
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: {pass: "PASS"}  });
  } catch (error) {
    console.log('update pass exam failed', error);
  }
}

 // worker Saga: will be fired on "FAIL_EXAM" actions
function* failExam(action){
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/passFail/${ap.exam_id}`, {pass: "FAIL"} );
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: {pass: "FAIL"}  });
  } catch (error) {
    console.log('update fail exam failed', error);
  }
}


 // worker Saga: will be fired on "APPROVE_EXAM" actions
 function* approveExam(action){
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/status/${ap.exam_id}`, {status: "APPROVED"} );
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: {exam_status: "APPROVED"}  });
  } catch (error) {
    console.log('update exam failed', error);
  }
}

 // worker Saga: will be fired on "REJECT_EXAM" actions
function* rejectExam(action){
  const ap = action.payload;
  //ap.exam_id
  try {
    yield axios.put(`/api/exam/status/${ap.exam_id}`, {status: "REJECTED"} );
    yield put({ type: 'SET-UPDATE_SELECTED_EXAM', payload: {exam_status: "REJECTED"}  });
  } catch (error) {
    console.log('update exam failed', error);
  }
}


 // worker Saga: will be fired on "FETCH_SELECTED_EXAM" actions
function* fetchSelectedExam(action) {
  const ap = action.payload;
  //ap.exam_id is the exam id to fetch
  try {
    const response = yield axios.get('/api/exam/selected', { params: {exam_id: ap.exam_id} });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
  } catch (error) {
    console.log('get selected exam request failed', error);
  }
}

 function* setExamPhoto(action){
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by, and id
  try {
    const response = yield axios({
      method: 'PUT',
      url:`/api/exam/photo`,
      data: ap
    });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
      console.log('');
      //todo ^ @Amanda - definitely need to verify that this works correctly
  } catch (error) {
    console.log('setExamPhoto failed', error);
  }
}

function* setIdPhoto(action){
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by, and id
  try {
    const response = yield axios({
      method: 'PUT',
      url:`/api/exam/id-image`,
      data: ap
    });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
      ap.done()
  } catch (error) {
    console.log('setIdPhoto failed', error);
  }
}



function* confirmId(action){
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by, and id
  try {
    const response = yield axios({
      method: 'PUT',
      url:`/api/exam/confirm-id`,
      data: ap
    });
    yield put({ type: 'SET_SELECTED_EXAM', payload: response.data });
      ap.done()
  } catch (error) {
    console.log('confirmId failed', error);
  }
}


// // worker Saga: will be fired on "UPDATE_EVENT_SETTINGS" actions
// function* updateEventSettings(action){
//   //TODO all of these
//   //TODO all of these
//   //TODO all of these
//   const ap = action.payload;
//   //ap.event is the event object to update, 
//   //including event_name, test_id, proctor_id, event_date, event_time
//   //event_end_time, url, last_modified_by, and id
//   try {
//     yield axios.put(`/api/event/${ap.event.id}`, ap.event);
//     yield put({ type: 'SET-UPDATE_SELECTED_EVENT', payload: ap.event });
//       //todo ^ @Amanda - definitely need to verify that this works correctly
//   } catch (error) {
//     console.log('update event failed', error);
//   }
// }

// // worker Saga: will be fired on "DELETE_EVENT" actions
// function* deleteEvent(action){
//   //TODO all of these
//   //TODO all of these
//   //TODO all of these
//   const ap = action.payload;
//   //ap.event_id 
//   try {
//     yield axios.delete(`/api/event/${ap.event_id}`);
//     yield put({ type: 'UNSET_SELECTED_EVENT' });
//     //note - unsure if we need to fetch_all_EVENTs here... I suppose deleting a event would bring
//     //the proctor back to the "all events" type view, but that should be doing its own 
//     //fetch_all_EVENTs already. if needed we can add one here!
//   } catch (error) {
//     console.log('DELETE event failed', error);
//   }
// }

// // worker Saga: will be fired on "ADD_EVENT" actions
// function* addEvent(action){
//   //TODO all of these
//   //TODO all of these
//   //TODO all of these
//   const ap = action.payload;
//   //ap.event is the event object to update, 
//   //including event_name, test_id, proctor_id, event_date, event_time
//   //event_end_time, url, last_modified_by
  
//   let event = ap.event;  //first declare event obj with all the event data from ap. 
//   try {
//     const postedEvent = yield axios.post('/api/event', ap.event );  //now add to that event object the id & dates that were created when it was posted to DB
//     event = {...event, id: postedEvent.id, create_date: postedEvent.create_date, last_modified_date: postedEvent.last_modified_date }
//     yield put({ type: 'SET_SELECTED_EVENT', payload: event }); //finally send the 'complete' event object to the reducer
//     //note - I did not put a fetch_all_EVENTs here since when a proctor creates a event, they are
//     // necessarily now selecting that event. if they navigate back to the 'all events' type view,
//     // there a fetch_all_EVENTs will be triggered anwyay. If needed we can add one of those here too.

//   } catch (error) {
//     console.log('POST event failed', error);
//   }
// }

// // worker Saga: will be fired on "FETCH_ALL_EVENTS" actions
// function* fetchAllEvents() {
//   //TODO all of these
//   //TODO all of these
//   //TODO all of these
//   try {
//     const response = yield axios.get('/api/event/all');
//     yield put({ type: 'SET_ALL_EVENTS', payload: response.data });
//   } catch (error) {
//     console.log('get all events request failed', error);
//   }
// }

export default eventSaga;
