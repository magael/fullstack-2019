import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { clearMessage } from "../reducers/notificationReducer";

const AnecdoteList = ({ store }) => {
  const { anecdotes, notification, filter } = store.getState();

  const anecdotesToShow = () => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // Tän vois tietty eriyttää omaksi komponentiksi
  const upvote = (id, content) => {
    // Viestin ajastusta voisi säätää enemmänkin,
    // jotta joka viesti olisi aina sen 5 sekuntia,
    // mutta seuraavassa ainakin pieni ehto estämään päällekkäisiä ajastuksia
    if (notification === "") {
      setTimeout(() => {
        store.dispatch(clearMessage());
      }, 5000);
    }
    store.dispatch(vote(id, content));
  };

  return (
    <div>
      {anecdotesToShow().map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upvote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
