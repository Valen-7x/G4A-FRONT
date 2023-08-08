// actions/auth.js

export const setToken = (token) => {
    return {
      type: "SET_TOKEN",
      payload: token,
    };
  };
  
  export const setUser = (user) => {
    return {
      type: "SET_USER",
      payload: user,
    };
  };
  
  export const setPhoto = (photo) => {
    return {
      type: "SET_PHOTO",
      payload: photo,
    };
  };
  