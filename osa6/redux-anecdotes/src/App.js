import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = props => (
  <div>
    <h2>Anecdotes</h2>
    <Notification store={props.store} />
    <Filter store={props.store} />
    <AnecdoteForm store={props.store} />
    <br></br>
    <AnecdoteList store={props.store} />
  </div>
);

export default App;
