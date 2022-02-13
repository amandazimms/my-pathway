import { combineReducers } from 'redux';

const calculateSingleEventStatus = (event) => {
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
  const now = new Date().valueOf();

  for (const event of events){
    event = calculateSingleEventStatus(event);
  }
  return events;
}

const selected = (state = {}, action) => {
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const selectedEvent = useSelector(store => store.event.selected);
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
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const allEvents = useSelector(store => store.event.all);
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
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const allEvents = useSelector(store => store.event.all);
  switch (action.type) {
    case 'SET_EVENT_EXAMS':
      return action.payload;
    case 'UNSET_EVENT_EXAMS':
      return [];
    default:
      return state;
  }
};



export default combineReducers({
  selected,
  all,
  exams
});

