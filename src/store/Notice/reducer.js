import * as actions from "./actionTypes";

const initialState = {
  notice: [],
  myNotice: [],
};

const getAllNotice = (state, action) => {
  return {
    ...state,
    notice: action.payload,
  };
};
const getMyNotice = (state, action) => {
  return {
    ...state,
    myNotice: action.payload,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_NOTICE:
      return getAllNotice(state, action);
    case actions.GET_MY_NOTICE:
      return getMyNotice(state, action);
    default:
      return state;
  }
};

export default reducer;
