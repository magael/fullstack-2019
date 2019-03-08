import anecdoteService from "../services/anecdoteService";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const newVotes = anecdoteToChange.votes + 1;
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: newVotes
      };
      return state
        .map(a => (a.id !== id ? a : changedAnecdote))
        .sort(function(a, b) {
          return b.votes - a.votes;
        });
    case "NEW_ANECDOTE":
      const newAnecdote = asObject(action.data.content);
      return state.concat(newAnecdote);
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const vote = (id, content) => {
  return {
    type: "VOTE",
    data: {
      id,
      content
    }
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
