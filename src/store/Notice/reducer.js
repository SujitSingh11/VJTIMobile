import * as actions from "./actionTypes";

const initialState = {
  notice: [],
};

const getAllNotice = (state, action) => {
  return {
    ...state,
    notice: action.payload,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_NOTICE:
      return getAllNotice(state, action);
    default:
      return state;
  }
};

export default reducer;
