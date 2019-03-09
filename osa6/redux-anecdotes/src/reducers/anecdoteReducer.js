import anecdoteService from "../services/anecdoteService";

const anecdoteReducer = (state = [], action) => {
  // console.log("state now: ", state);
  // console.log("action", action);

  switch (action.type) {
    case "VOTE":
      const changedAnecdote = action.data;
      return state
        .map(a => (a.id !== changedAnecdote.id ? a : changedAnecdote))
        .sort(function(a, b) {
          return b.votes - a.votes;
        });
    case "NEW_ANECDOTE":
      const newAnecdote = action.data;
      return state.concat(newAnecdote);
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const vote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote);
    dispatch({
      type: "VOTE",
      data: votedAnecdote
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export default anecdoteReducer;
