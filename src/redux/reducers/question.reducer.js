import { combineReducers } from 'redux';

const selected = (state = {}, action) => {
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const selectedQuestion = useSelector(store => store.question.selected);
  switch (action.type) {
    case 'SET_SELECTED_QUESTION':
      return action.payload;
    case 'SET-UPDATE_SELECTED_QUESTION':   // <----note - sorry about the goofy name.
      return {...state, ...action.payload}; // the idea is that "set-update"s spread in some new info and leave some existing, 
    case 'UNSET_SELECTED_QUESTION':         // while "sets" return a totally new state
      return {};                            // this was done to avoid overlap with other UPDATE dispatches that make DB calls rather than reducer alterations
    default:
      return state;  
  }
};

const all = (state = [], action) => {
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const allQuestions = useSelector(store => store.question.all);
  switch (action.type) {
    case 'SET_ALL_QUESTIONS':
      return action.payload;
    case 'UNSET_ALL_QUESTIONS':
      return [];
    default:
      return state;
  }
};

const examAll = (state = [], action) => {
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const allQuestions = useSelector(store => store);
  switch (action.type) {
    case 'SET_ALL_EXAM_QUESTIONS':
      return action.payload;
    case 'UNSET_ALL_EXAM_QUESTIONS':
      return [];
    default:
      return state;
  }
};

const examSelected = (state = [], action) => {
  //@jackie store/reducer - if you want to use this store in your component, put something like this at the top
  //const allQuestions = useSelector(store => store);
  switch (action.type) {
    case 'SET_SELECTED_EXAM_QUESTIONS':
      return action.payload;
    case 'UNSET_SELECTED_EXAM_QUESTIONS':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  selected,
  all,
  examAll,
  examSelected, 
});

