import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { clearMessage } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  // Tän vois tietty eriyttää omaksi komponentiksi
  const upvote = anecdote => {
    // Viestin ajastusta voisi säätää enemmänkin,
    // jotta joka viesti olisi aina sen 5 sekuntia,
    // mutta seuraavassa ainakin pieni ehto estämään päällekkäisiä ajastuksia
    if (props.visibleNotification === "") {
      setTimeout(() => {
        props.clearMessage();
      }, 5000);
    }
    props.vote(anecdote);
  };

  return (
    <div>
      {props.visibleAnedotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button onClick={() => upvote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter === "ALL") {
    return anecdotes;
  }
  return anecdotes.filter(a =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  );
};

const currentNotification = ({ notification }) => {
  return notification;
};

const mapStateToProps = state => {
  return {
    visibleAnedotes: anecdotesToShow(state),
    visibleNotification: currentNotification(state)
  };
};

const mapDispatchToProps = {
  clearMessage,
  vote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
