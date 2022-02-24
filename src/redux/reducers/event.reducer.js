import { combineReducers } from 'redux';

/*
  This holds data about events. 
  
      Reminder - Definitions:
      A Test is a collection of questions
      An Event is a day/time where a specific test can be taken
      An Exam is an instance of one student assigned to that event; taking that test
  
  Since events/exams are tightly linked, 
  it may make more sense to some to store some of these in the exam redruce instead
*/
const calculateSingleEventStatus = (event) => {
  //this needs to run whenever we fetch an event
  //it compares the timestamps on that event to the current time
  //to determine whether that event is complete/upcoming/in progress
  const now = new Date().valueOf();

  event.status = ''
  if (now >= new Date(event.event_date_end).valueOf()){
    event.status = 'COMPLETE'
  }
  else if (now < new Date(event.event_date_start).valueOf()){
    event.status = 'UPCOMING'
  }
  else if (now > new Date(event.event_date_start).valueOf() && now < new Date(event.event_date_end).valueOf()){
    event.status = 'IN PROGRESS'
  }
  return event;
}

const calculateEventStatusArray = (events) => {
  //when we're fetching multiple events (proctor is looking at the list of all events),
  // we need to run calculateSingleEventStatus() on each one, so this does that.
  const now = new Date().valueOf();

  for (const event of events){
    event = calculateSingleEventStatus(event);
  }
  return events;
}

const selected = (state = {}, action) => {
  //one selected ewvent
  switch (action.type) {
    case 'SET_SELECTED_EVENT':
      return calculateSingleEventStatus(action.payload);
    case 'SET-UPDATE_SELECTED_EVENT':   // <----note - sorry about the goofy name.
      return {...state, ...action.payload}; // the idea is that "set-update"s spread in some new info and leave some existing, 
    case 'UNSET_SELECTED_EVENT':             // while "sets" return a totally new state
      return {};                            // this was done to avoid overlap with other UPDATE dispatches that make DB calls rather than reducer alterations
    default:
      return state;  
  }
};

const all = (state = [], action) => {
  //all events
  switch (action.type) {
    case 'SET_ALL_EVENTS':
      return calculateEventStatusArray(action.payload);
    case 'UNSET_ALL_EVENTS':
      return [];
    default:
      return state;
  }
};

const exams = (state = [], action) => {
  //all the exams associated with this event
  switch (action.type) {
    case 'SET_EVENT_EXAMS':
      return action.payload;
    case 'UNSET_EVENT_EXAMS':
      return [];
    default:
      return state;
  }
};

const examsHelp = (state = [], action) => {
  //the help status - ExamTable component has more explanation in comments
  switch (action.type) {
    case 'SET_EVENT_EXAMS_HELP':
      return action.payload;
    case 'UNSET_EVENT_EXAMS_HELP':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  selected,
  all,
  exams,
  examsHelp
});

