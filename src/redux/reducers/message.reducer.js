import { combineReducers } from 'redux';

const activeMessageDetail = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVE_MESSAGE_DETAIL':
      return action.payload;
    case 'UNSET_ACTIVE_MESSAGE_DETAIL':
      return [];
    default:
      return state;
  }
};

const activeMessageSession = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_MESSAGE_SESSION':
      return action.payload;
    case 'UNSET_ACTIVE_MESSAGE_SESSION':
      return {};
    default:
      return state;
  }
};

const availableMessageSession = (state = [], action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_MESSAGE_SESSIONS':
      return action.payload;
    case 'UNSET_AVAILABLE_MESSAGE_SESSIONS':
      return [];
    default:
      return state;
  }
};


export default combineReducers({
  activeMessageDetail,
  activeMessageSession,
  availableMessageSession,
});