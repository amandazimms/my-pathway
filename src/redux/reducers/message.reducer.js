import { combineReducers } from 'redux';

/*
  This stores data for messages (chat)
*/
const activeMessageDetail = (state = [], action) => {
  //the current/active chat (single message)
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
  //the current/active session (collection of chats back-and-forth during this exam)
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