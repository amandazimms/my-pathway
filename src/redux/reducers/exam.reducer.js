import { combineReducers } from 'redux';

const selected = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_EXAM':
      return action.payload;
    case 'SET-UPDATE_SELECTED_EXAM':   // <----note - sorry about the goofy name.
      return {...state, ...action.payload}; // the idea is that "set-update"s spread in some new info and leave some existing, 
    case 'UNSET_SELECTED_EXAM':             // while "sets" return a totally new state
      return {};                            // this was done to avoid overlap with other UPDATE dispatches that make DB calls rather than reducer alterations
    default:
      return state;  
  }
};

const myExams = (state = [], action) => {
  switch (action.type) {
    case 'SET_MY_EXAMS':
      return action.payload;
    case 'UNSET_MY_EXAMS':   
      return [];
    default:
      return state;  
  }
};

const detail = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_EXAM_DETAIL':
      return action.payload;
    case 'UNSET_SELECTED_EXAM_DETAIL':             // while "sets" return a totally new state
      return {};                            // this was done to avoid overlap with other UPDATE dispatches that make DB calls rather than reducer alterations
    default:
      return state;  
  }
};

const selectedQuestionProctor = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_EXAM_QUESTION_PROCTOR':
      return action.payload;
    case 'UNSET_SELECTED_EXAM_QUESTION_PROCTOR':             // while "sets" return a totally new state
      return {};                            // this was done to avoid overlap with other UPDATE dispatches that make DB calls rather than reducer alterations
    default:
      return state;  
  }
};

const all = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_EXAMS':
      return action.payload;
    case 'UNSET_ALL_EXAMS':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  selected,
  selectedQuestionProctor,
  all,
  detail,
  myExams,
});

