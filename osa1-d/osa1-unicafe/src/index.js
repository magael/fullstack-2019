import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = props => <div>{props.title} {props.value}</div>;

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Header = props => {
  return <h1>{props.title}</h1>;
};

const App = props => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = newValue => {
    setGood(newValue);
  };
  
  const setToNeutral = newValue => {
    setNeutral(newValue);
  };

  const setToBad = newValue => {
    setBad(newValue);
  };

  return (
    <div>
      <Header title="anna palautetta" />

      <Button handleClick={() => setToGood(good + 1)} text="hyvä" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutraali" />
      <Button handleClick={() => setToBad(bad + 1)} text="huono" />

      <Header title="statistiikka" />

      <Display title='hyvä' value={good} />
      <Display title='neutraali' value={neutral} />
      <Display title='huono' value={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
