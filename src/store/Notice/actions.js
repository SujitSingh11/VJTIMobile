import * as actions from "./actionTypes";

export const getFeed = (notice) => {
  return (dispatch) => {
    dispatch(getAllNotice(notice));
  };
};

export const getAllNotice = (notice) => {
  return {
    type: actions.GET_ALL_NOTICE,
    payload: notice,
  };
};
