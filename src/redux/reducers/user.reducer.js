/*
  Stores user that is logged in
*/

const userReducer = (state = {profile_picture: "/images/profile_default.png"}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

export default userReducer;
