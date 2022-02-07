import { combineReducers } from 'redux';

const all = (state = [], action) => {
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