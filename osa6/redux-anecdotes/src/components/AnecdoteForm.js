import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault();
    props.createAnecdote(event.target.anecdote.value);
    event.target.anecdote.value = "";
  };

  return (
    <form onSubmit={addAnecdote}>
      create new
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

const mapDispatchToProps = {
  createAnecdote
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);
