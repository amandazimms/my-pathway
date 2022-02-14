import { combineReducers } from 'redux';

const selected = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_TEST':
      return action.payload;
    case 'SET-UPDATE_SELECTED_TEST':   // <----note - sorry about the goofy name.
      return {...state, ...action.payload}; // the idea is that "set-update"s spread in some new info and leave some existing, 
    case 'UNSET_SELECTED_TEST':             // while "sets" return a totally new state
      return {};                            // this was done to avoid overlap with other UPDATE dispatches that make DB calls rather than reducer alterations
    default:
      return state;  
  }
};

const all = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_TESTS':
      return action.payload;
    case 'UNSET_ALL_TESTS':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  selected,
  all,
});

