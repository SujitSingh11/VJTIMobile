import * as actions from "./actionTypes";

export const addNotice = ({ notice }) => {
  return (dispatch) => {
    dispatch(loginStart());
    dispatch(
      loginSuccess({
        notice,
      })
    );
  };
};

export const addNotice = (user) => {
  return {
    type: actions.ADD_NOTICE,
    user,
  };
};
