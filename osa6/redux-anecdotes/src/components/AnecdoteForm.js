import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = props => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    // const newAnecdote = await anecdoteService.createNew(content);
    // props.createAnecdote(newAnecdote.content);
    event.target.anecdote.value = "";
    props.createAnecdote(content)
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
