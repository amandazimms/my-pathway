import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
  yield takeLatest('FETCH_EVENT', fetchEvent);//fetches all the info for a single Event. 
    //dispatch({ type: 'FETCH_EVENT', payload: {event_id: putSomethingHere} }); 
  yield takeLatest('FETCH_ALL_EVENTS', fetchAllEvents);//fetches ALL Events in DB. 
    //dispatch({ type: 'FETCH_ALL_EVENTS' }); 
  yield takeLatest('ADD_EVENT', addEvent);//posts a new event to the db.
    //dispatch({ type: 'ADD_EVENT', payload: { event: newEvent } }); 
  yield takeLatest('DELETE_EVENT', deleteEvent);//deletes a event from the db.
    //dispatch({ type: 'DELETE_EVENT', payload: { event_id: putSomethingHere } }); 
  yield takeLatest('UPDATE_EVENT_SETTINGS', updateEventSettings);//updates any/all of the columns in the event table in the db.
    //dispatch({ type: 'UPDATE_EVENT_SETTINGS', payload: { event: updatedEvent } }); 
  yield takeLatest('FETCH_EVENT_EXAMS', getEventExams);//return all exams associated with the event.

    
 }



// worker Saga: will be fired on "UPDATE_EVENT_SETTINGS" actions
function* updateEventSettings(action){
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by, and id
  try {
    yield axios.put(`/api/event/${ap.event.id}`, ap.event);
    yield put({ type: 'SET-UPDATE_SELECTED_EVENT', payload: ap.event });
      //todo ^ @Amanda - definitely need to verify that this works correctly
  } catch (error) {
    console.log('update event failed', error);
  }
}

// worker Saga: will be fired on "DELETE_EVENT" actions
function* deleteEvent(action){
  const ap = action.payload;
  //ap.event_id 
  try {
    yield axios.delete(`/api/event/${ap.event_id}`);
    yield put({ type: 'UNSET_SELECTED_EVENT' });
    //note - unsure if we need to fetch_all_EVENTs here... I suppose deleting a event would bring
    //the proctor back to the "all events" type view, but that should be doing its own 
    //fetch_all_EVENTs already. if needed we can add one here!
  } catch (error) {
    console.log('DELETE event failed', error);
  }
}

// worker Saga: will be fired on "ADD_EVENT" actions
function* addEvent(action){
  const ap = action.payload;
  //ap.event is the event object to update, 
  //including event_name, test_id, proctor_id, event_date, event_time
  //event_end_time, url, last_modified_by
  let event = ap.event;  //first declare event obj with all the event data from ap. 
  try {
    const postedEvent = yield axios.post('/api/event', ap.event );  //now add to that event object the id & dates that were created when it was posted to DB
    event = {...event, id: postedEvent.data.id, create_date: postedEvent.data.create_date, last_modified_date: postedEvent.data.last_modified_date }
    yield put({ type: 'SET_SELECTED_EVENT', payload: event }); //finally send the 'complete' event object to the reducer
    //note - I did not put a fetch_all_EVENTs here since when a proctor creates a event, they are
    // necessarily now selecting that event. if they navigate back to the 'all events' type view,
    // there a fetch_all_EVENTs will be triggered anwyay. If needed we can add one of those here too.

  } catch (error) {
    console.log('POST event failed', error);
  }
}

// worker Saga: will be fired on "FETCH_EVENT" actions
function* fetchEvent(action) {
  const ap = action.payload;
  //ap.event_id is the event id to fetch
  try {
    const response = yield axios.get('/api/event/selected', { params: {event_id: ap.event_id} });
    yield put({ type: 'SET_SELECTED_EVENT', payload: response.data });
  } catch (error) {
    console.log('get event request failed', error);
  }
}



function* getEventExams(action) {
  const ap = action.payload;
  //ap.event_id is the event id to fetch
  try {
    const response = yield axios.get('/api/event/exams', { params: {event_id: ap.event_id} });
    yield put({ type: 'SET_EVENT_EXAMS', payload: response.data });
  } catch (error) {
    console.log('getEventExams request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ALL_EVENTS" actions
function* fetchAllEvents() {
  try {
    const response = yield axios.get('/api/event/all');
    
    //@Chris todo please - research combining event_time and event_date into one date object. 
    //then use some placeholder events (one in the past, one future, one now) to test
    //I read that comparing date equality (=== / ==) is finnicky (not > / < / <=...), 
    //but the pseudocode below should avoid that.
    const events = response.data;   
    const now = new Date().valueOf();


    for (const event of events){
      event.status = ''
      if (now >= new Date(event.event_date_end).valueOf()){
        event.status = 'COMPLETE'
      }
      else if (now < new Date(event.event_date_start).valueOf()){
        event.status = 'UPCOMING'
      }
      else if (now > new Date(event.event_date_start).valueOf() && now < new Date(event.event_date_end).valueOf()){
        console.log('made it here once');
        event.status = 'IN PROGRESS'
      }
    }

    yield put({ type: 'SET_ALL_EVENTS', payload: events });
  } catch (error) {
    console.log('get all events request failed', error);
  }
}

export default eventSaga;
