import { combineReducers } from 'redux';

const data = (state = '/images/profile_default.png', action) => {
  switch (action.type) {
    case 'SET_IMAGE_DATA':
      return action.payload.data;
    case 'UNSET_IMAGE_DATA':
      return {url:'/images/image.png'}
    default:
      return state;
  }
};



export default combineReducers({
  data,
});
