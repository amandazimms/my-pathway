import { combineReducers } from 'redux';

const selected = (state = {}, action) => {
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
  switch (action.type) {
    case 'SET_ALL_EXAM_QUESTIONS':
      return action.payload;
    case 'UNSET_ALL_EXAM_QUESTIONS':
      return [];
    default:
      return state;
  }
};

const randomizeOrder = (question) => {
  let options = [
    question.option_one, 
    question.option_two, 
    question.option_three, 
    question.option_four, 
  ]

  let randomizedOptions = [];

  while (options.length) {
    let randomIndex = Math.floor(Math.random() * options.length);
    let randomItem = options[randomIndex];
    options.splice(randomIndex, 1);
    randomizedOptions.push(randomItem);
  }

  question.option_one = randomizedOptions[0];
  question.option_two = randomizedOptions[1];
  question.option_three = randomizedOptions[2];
  question.option_four = randomizedOptions[3];

  return question;
}

const examSelected = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_EXAM_QUESTIONS':
      return randomizeOrder(action.payload);
    case 'UNSET_SELECTED_EXAM_QUESTIONS':
      return {};
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

