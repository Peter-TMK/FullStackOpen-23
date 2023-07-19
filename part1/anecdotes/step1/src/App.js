import { useState } from "react";

const Header = () => <h1>give feedback</h1>;
const Content = () => <h2>statistics</h2>;

const Buttton = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    // <table>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    // </table>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (!(good || neutral || bad)) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine
        text="average"
        value={(good - bad) / (good + neutral + bad) || 0}
      />
      <StatisticLine
        text="positive"
        value={`${(good / (good + neutral + bad)) * 100 || 0}%`}
      />
      {/* <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / (good + neutral + bad) || 0}</p>
      <p>positive {(good / (good + neutral + bad)) * 100 || 0}%</p> */}
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);

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

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast is to go well.",
  ];

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  return (
    <div>
      <Header />
      <Buttton handleClick={goodClick} text="good" />
      <Buttton handleClick={neutralClick} text="neutral" />
      <Buttton handleClick={badClick} text="bad" />
      <Content />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <div>{anecdotes[selected]}</div>
      <button onClick={getRandomAnecdote}>Next Anecdote</button>
    </div>
  );
};

export default App;
