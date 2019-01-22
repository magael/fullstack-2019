import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = props => {
  const { good, neutral, bad } = props;
  let total = good + neutral + bad;
  let avg, positive = 0;

  if (total === 0) {
    return <Statistic title="Ei yhtään palautetta annettu" />;
  } else {
    avg = (good - bad) / total;
    positive = (good / total) * 100;
  }
  return (
    <div>
      <Statistic title="hyvä" value={good} />
      <Statistic title="neutraali" value={neutral} />
      <Statistic title="huono" value={bad} />
      <Statistic title="yhteensä" value={total} />
      <Statistic title="keskiarvo" value={avg} />
      <Statistic title="positiivisia" value={positive} sign="%" />
    </div>
  );
};

const Statistic = props => (
  <div>
    {props.title} {props.value} {props.sign}
  </div>
);

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Header = props => <h1>{props.title}</h1>;

const App = props => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = newValue => setGood(newValue);
  const setToNeutral = newValue => setNeutral(newValue);
  const setToBad = newValue => setBad(newValue);

  return (
    <div>
      <Header title="anna palautetta" />
      <Button handleClick={() => setToGood(good + 1)} text="hyvä" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutraali" />
      <Button handleClick={() => setToBad(bad + 1)} text="huono" />

      <Header title="statistiikka" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
