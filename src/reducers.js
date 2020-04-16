import { combineReducers } from "redux";

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case CASE:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
