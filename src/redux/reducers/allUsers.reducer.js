import { combineReducers } from 'redux';

/*
  This holds data for "other" users, not the user that is logged in: 
  e.g. get all the users; get all the proctors; or make another user into a proctor
*/
const all = (state = [], action) => {
  //all the users
  switch (action.type) {
    case 'SET_ALL_USERS':
      return action.payload;
    case 'UNSET_ALL_USERS':
      return [];
    default:
      return state;
  }
};

const proctorsOnly = (state = [], action) => {
  //all the proctors
  switch (action.type) {
    case 'SET_ALL_PROCTORS':
      return action.payload;
    case 'UNSET_ALL_PROCTORS':
      return [];
    default:
      return state;
  }
};

const searchedStudents = (state = [], action) => {
  //all the students that should appear in the current results 
  //  (when registering students to an event)
  //   e.g. searching "ha" should return students: harry potter, bob@ham.com, and harley quinn 
  //   and store them here
  switch (action.type) {
    case 'SET_SEARCHED_STUDENTS':
      return action.payload;
    case 'UNSET_SEARCHED_STUDENTS':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  all,
  proctorsOnly,
  searchedStudents,
});