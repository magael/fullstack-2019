const notificationReducer = (state = "", action) => {
  // console.log("state now: ", state);
  // console.log("action", action);

  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.message;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

// export const clearMessage = () => {
//   return {
//     type: "CLEAR"
//   };
// };

export const setNotification = (message, timeOutSeconds) => {
  // pieni ongelma toteutuksessa: clear-actioneja laitetaan menemään useita päällekkäin
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message,
        timeOutSeconds
      }
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR"
      });
    }, timeOutSeconds * 1000);
  };
};

export default notificationReducer;
