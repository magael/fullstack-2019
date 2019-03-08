import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from './store'
// import anecdoteReducer, { initializeAnecdotes } from "./reducers/anecdoteReducer";
// import anecdoteService from "./services/anecdoteService";

// anecdoteService
//   .getAll()
//   .then(anecdotes => store.dispatch(initializeAnecdotes(anecdotes)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
