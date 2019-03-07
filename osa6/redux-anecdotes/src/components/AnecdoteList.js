import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { clearMessage } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  // Tän vois tietty eriyttää omaksi komponentiksi
  const upvote = (id, content) => {
    // Viestin ajastusta voisi säätää enemmänkin,
    // jotta joka viesti olisi aina sen 5 sekuntia,
    // mutta seuraavassa ainakin pieni ehto estämään päällekkäisiä ajastuksia
    if (props.notification === "") {
      setTimeout(() => {
        console.log("CLEARED MSG")
        props.clearMessage();
      }, 5000);
    }
    console.log("about to vote")
    props.vote(id, content);
  };

  return (
    <div>
      {props.visibleAnedotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button onClick={() => upvote(anecdote.id, anecdote.content)}>
              vote
            </button>
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

const mapStateToProps = state => {
  return {
    visibleAnedotes: anecdotesToShow(state)
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
