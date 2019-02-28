import React from "react";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = props => {
  const store = props.store;

  const upvote = id => {
    store.dispatch(vote(id));
  };

  return (
    <div>
      {store.getState().map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upvote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
