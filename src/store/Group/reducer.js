import * as actions from "./actionTypes";

const initialState = {
  notice: null,
};

const loginSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    isLogging: false,
    isAuthenticated: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_LOGIN_START:
      return loginStart(state);
    default:
      return state;
  }
};

export default reducer;
