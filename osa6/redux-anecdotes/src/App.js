import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = props => (
  <div>
    <h1>Programming Anecdotes</h1>
    <Notification />
    <Filter />
    <AnecdoteForm />
    <br></br>
    <AnecdoteList />
  </div>
);

export default App;
