const activeMessageSessionReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVE_MESSAGE_DETAIL':
      return action.payload;
    case 'UNSET_ACTIVE_MESSAGE_DETAIL':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default activeMessageSessionReducer;
