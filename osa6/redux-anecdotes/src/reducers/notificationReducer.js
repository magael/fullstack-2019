const notificationReducer = (state = "", action) => {
  // console.log("state now: ", state);
  // console.log("action", action);

  switch (action.type) {
    case "VOTE":
      return "You voted " + action.data.content;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

export const clearMessage = () => {
  return {
    type: "CLEAR"
  };
};

export default notificationReducer;
