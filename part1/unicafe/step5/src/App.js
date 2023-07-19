import { useState } from "react";

const Header = () => <h1>give feedback</h1>;
const Content = () => <h2>statistics</h2>;

const Buttton = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}
      {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (!(good || neutral || bad)) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <StatisticLine text="good " value={good} />
      <StatisticLine text="neutral " value={neutral} />
      <StatisticLine text="bad " value={bad} />
      <StatisticLine text="all " value={good + neutral + bad} />
      <StatisticLine
        text="average "
        value={(good - bad) / (good + neutral + bad) || 0}
      />
      <StatisticLine
        text="positive "
        value={`${(good / (good + neutral + bad)) * 100 || 0}%`}
      />
      {/* <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad) || 0}</p>
      <p>positive {(good / (good + neutral + bad)) * 100 || 0}%</p> */}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  // const [total, setTotal] = useState(0);

  // const totalClick = () => {
  //   setTotal(good + neutral + bad);
  // };

  const goodClick = () => {
    setGood(good + 1);
  };
  const neutralClick = () => {
    setNeutral(neutral + 1);
  };
  const badClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Buttton handleClick={goodClick} text="good" />
      <Buttton handleClick={neutralClick} text="neutral" />
      <Buttton handleClick={badClick} text="bad" />
      <Content />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
