import React from "react";
import { vote, createAnecdote } from "./reducers/anecdoteReducer";

const App = props => {
  const store = props.store;

  const upvote = id => {
    store.dispatch(vote(id));
  };

  const addAnecdote = event => {
    event.preventDefault();
    store.dispatch(createAnecdote(event.target.anecdote.value));
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {store.getState().map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upvote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
