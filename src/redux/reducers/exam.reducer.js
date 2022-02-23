import { combineReducers } from 'redux';

/*
  This stores data for exams.

      Reminder - Definitions:
      A Test is a collection of questions
      An Event is a day/time where a specific test can be taken
      An Exam is an instance of one student assigned to that event; taking that test

  Since events/exams are tightly linked, 
  it may make more sense to some to store some of these in the event reducer instead
*/
const selected = (state = {}, action) => {
  //the selected/active exam
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
  //list of this student's exams
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
  //one question on a student's exam
  switch (action.type) {
    case 'SET_SELECTED_EXAM_DETAIL':
      return action.payload;
    case 'UNSET_SELECTED_EXAM_DETAIL':            
      return {};                           
    default:
      return state;  
  }
};

const selectedQuestionProctor = (state = {}, action) => {
  //when a proctor goes into a student's exam to chat with them, this is how they see the question the student sees
  switch (action.type) {
    case 'SET_SELECTED_EXAM_QUESTION_PROCTOR':
      return action.payload;
    case 'UNSET_SELECTED_EXAM_QUESTION_PROCTOR':           
      return {};                          
    default:
      return state;  
  }
};

const all = (state = [], action) => {
  //all exams
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

