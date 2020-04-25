import * as actions from "./actionTypes";

export const getFeed = (notice) => {
  return (dispatch) => {
    dispatch(getAllNotice(notice));
  };
};

export const getMyFeed = (notice) => {
  return (dispatch) => {
    dispatch(getMyNotice(notice));
  };
};

export const getAllNotice = (notice) => {
  return {
    type: actions.GET_ALL_NOTICE,
    payload: notice,
  };
};

export const getMyNotice = (notice) => {
  return {
    type: actions.GET_MY_NOTICE,
    payload: notice,
  };
};
