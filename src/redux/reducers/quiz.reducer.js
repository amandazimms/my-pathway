const quizReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_QUIZ':
      return action.payload;
    case 'UNSET_QUIZ':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default quizReducer;
