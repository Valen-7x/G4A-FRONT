const initialState = {
  token: null,
  user: null,
  photo: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const updateToken = () => ({
    ...state,
    token: payload,
  });
  const updateUser = () => ({
    ...state,
    user: payload,
  });

  const updatePhoto = () => ({
    ...state,
    photo: payload,
  });

  const actionHandlers = {
    SET_TOKEN: updateToken,
    SET_USER: updateUser,
    SET_PHOTO: updatePhoto,
  };

  const actionHandler = actionHandlers[type] || (() => state);

  return actionHandler();
};

export default authReducer;
