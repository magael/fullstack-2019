import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Display = props => <div>{props.value}</div>;

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  const setToSelect = newValue => {
    setSelected(newValue);
  };

  const newRandom = range => {
    let random = selected;
    while (random === selected) random = Math.floor(Math.random() * range);
    return random;
  };

  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

  const setToVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <Display value={anecdotes[selected]} />
      <Display value={"has ".concat(votes[selected]).concat(" votes")} />
      <Button handleClick={setToVotes} text="vote" />
      <Button
        handleClick={() => setToSelect(newRandom(anecdotes.length))}
        text="next anectdote"
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
