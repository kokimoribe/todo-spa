const SET_USER_PROFILE = "user/SET_USER_PROFILE";

const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  payload: { profile }
});

const actions = {
  setUserProfile
};

const initialState = {
  profile: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return { ...state, profile: action.payload.profile };
    default:
      return state;
  }
};

export { reducer as userReducer, actions };
