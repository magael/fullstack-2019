import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Display = props => <div>{props.value}</div>;

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]); // hups kovakoodaus.
// How about trying like this:

// Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0);
// //Output as [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// or

// new Array(10+1).join('0').split('').map(parseFloat)
// //Output as [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// EDIT:-

// If your array is dynamic then simply put that in a function which takes a number and replace 10 by that variable.
  
  const [mostVoted, setMostVoted] = useState(0);

  const setToSelect = newValue => {
    setSelected(newValue);
  };

  const newRandom = range => {
    let random = selected;
    while (random === selected) random = Math.floor(Math.random() * range);
    return random;
  };

  const setToVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    setToMostVoted(copy);
  };

  const setToMostVoted = copy => {
    let max = copy[mostVoted];
    let maxIndex = 0;
    
    let i = 0;
    copy.forEach(votesOfElement => {
      if (votesOfElement > max) {
        maxIndex = i;
        max = copy[i]
        setMostVoted(maxIndex);
      }
      i += 1;
    });
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display value={anecdotes[selected]} />
      <Display value={"has ".concat(votes[selected]).concat(" votes")} />
      <Button handleClick={setToVotes} text="vote" />
      <Button
        handleClick={() => setToSelect(newRandom(anecdotes.length))}
        text="next anectdote"
      />

      <h1>Anecdote with most votes</h1>
      <Display value={anecdotes[mostVoted]} />
      <Display value={"has ".concat(votes[mostVoted]).concat(" votes")} />
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
