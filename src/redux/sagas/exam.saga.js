import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* examSaga() {
  //TODO all of these
  //TODO all of these
  //TODO all of these
  // yield takeLatest('FETCH_EVENT', fetchEvent);//fetches all the info for a single Event. 
  //   //dispatch({ type: 'FETCH_EVENT', payload: {event_id: putSomethingHere} }); 
  yield takeLatest('FETCH_ALL_EXAMS', fetchAllExams);//fetches ALL Exams this student is registered to
    //dispatch({ type: 'FETCH_ALL_EXAMS' }); 
  yield takeLatest('ADD_EXAM', addExam);//posts a new Exam to the db.
    //dispatch({ type: 'ADD_EXAM', payload: { event: newEvent } }); 
  // yield takeLatest('DELETE_EVENT', deleteEvent);//deletes a event from the db.
  //   //dispatch({ type: 'DELETE_EVENT', payload: { event_id: putSomethingHere } }); 
  // yield takeLatest('UPDATE_EVENT_SETTINGS', updateEventSettings);//updates any/all of the columns in the event table in the db.
  //   //dispatch({ type: 'UPDATE_EVENT_SETTINGS', payload: { event: updatedEvent } }); 
 }


// worker Saga: will be fired on "FETCH_ALL_EXAMS" actions
function* fetchAllExams(action) {
  const ap = action.payload;

  try {
    const response = yield axios.get('/api/exam/all', { params: {student_id: ap.student_id} } );
    yield put({ type: 'SET_ALL_EXAMS', payload: response.data });
  } catch (error) {
    console.log('get all exams request failed', error);
  }
}

 // worker Saga: will be fired on "ADD_EVENT" actions
function* addExam(action){
  const ap = action.payload;
  //ap.exam is the exam object to add,
  //including event_id, student_id, created_by (proctor id)
  
  let exam = ap.exam;  //first declare exam obj with all the event data from ap. 
  try {
    const postedExam = yield axios.post('/api/exam', ap.exam );  //now add to that event object the id & dates that were created when it was posted to DB
    //nothing to SET here, as the creation of an exam means a proctor registers a student to an event
    //... we don't use that info until a later 

  } catch (error) {
    console.log('POST event failed', error);
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

// // worker Saga: will be fired on "FETCH_EVENT" actions
// function* fetchEvent(action) {
//   //TODO all of these
//   //TODO all of these
//   //TODO all of these
//   const ap = action.payload;
//   //ap.event_id is the event id to fetch
//   try {
//     const response = yield axios.get('/api/event/selected', { params: {event_id: ap.event_id} });
//     yield put({ type: 'SET_SELECTED_EVENT', payload: response.data });
//   } catch (error) {
//     console.log('get event request failed', error);
//   }
// }


export default examSaga;
