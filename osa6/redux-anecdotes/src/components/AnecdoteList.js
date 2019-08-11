import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const upvote = anecdote => {
    props.setNotification(`you voted '${anecdote.content}'`, 10);
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
  setNotification,
  vote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
