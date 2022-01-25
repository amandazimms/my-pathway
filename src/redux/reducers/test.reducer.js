
import { combineReducers } from 'redux';

const selected = (state = {}, action) => {
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const selectedTest = useSelector(store => store.test.selected);
  switch (action.type) {
    case 'SET_SELECTED_TEST':
      return action.payload;
    case 'UPDATE_SELECTED_TEST':
      return {...state, ...action.payload};
    case 'UNSET_SELECTED_TEST':

      return {};
    default:
      return state;
  }
};

const all = (state = [], action) => {
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const allTests = useSelector(store => store.test.all);
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

