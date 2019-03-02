import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { clearMessage } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const store = props.store;

  const upvote = (id, content) => {
    // voisi säätää enemmänkin, että joka viesti olisi aina sen 5 sekuntia,
    // mutta seuraavassa ainakin pieni ehto estämään päällekkäisiä ajastuksia
    if (store.getState().notification === '') {
      setTimeout(() => {
        store.dispatch(clearMessage())
      }, 5000);
    }
    store.dispatch(vote(id, content));
  };

  return (
    <div>
      {store.getState().anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upvote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
