import { combineReducers } from 'redux';

/*
  This holds data for questions.
*/
const selected = (state = {}, action) => {
  //the currently selected/active question
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
  //all questions (on this test)
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
  //all questions (on this exam)
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
  //some logic for randomizing question order (for display on student exam)
  let options = [
    //push all options into their own array with only them
    question.option_one, 
    question.option_two, 
    question.option_three, 
    question.option_four, 
  ]

  let randomizedOptions = []; //empty array that we'll push into shortly

  while (options.length) {
    //get a random choice from options, remove it from there and put it in the new array instead. Do this until options is empty:

    let randomIndex = Math.floor(Math.random() * options.length); //get a random index according to length of options array, above
    let randomItem = options[randomIndex]; //get the item in options at that index
    options.splice(randomIndex, 1); //remove it from options
    randomizedOptions.push(randomItem); //push it into our new array instead
  }

  //now rewrite all of these options with the random order and return the question
  question.option_one = randomizedOptions[0];
  question.option_two = randomizedOptions[1];
  question.option_three = randomizedOptions[2];
  question.option_four = randomizedOptions[3];

  return question;
}

const examSelected = (state = {}, action) => {
  //selected student's exam questions - every time this reducer is set it randomizes the order of the Qs
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

