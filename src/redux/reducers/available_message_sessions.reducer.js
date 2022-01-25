const activeMessageSessionReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_MESSAGE_SESSIONS':
      return action.payload;
    case 'UNSET_AVAILABLE_MESSAGE_SESSIONS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeMessageSessionReducer;
