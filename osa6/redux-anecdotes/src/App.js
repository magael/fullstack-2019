import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = props => (
  <div>
    <h2>Anecdotes</h2>
    <Notification store={props.store}/>
    <AnecdoteList store={props.store} />
    <h2>create new</h2>
    <AnecdoteForm store={props.store} />
  </div>
);

export default App;
