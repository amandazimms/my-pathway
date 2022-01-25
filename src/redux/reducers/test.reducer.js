const testReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TEST':
      return action.payload;
    case 'UNSET_TEST':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default testReducer;
