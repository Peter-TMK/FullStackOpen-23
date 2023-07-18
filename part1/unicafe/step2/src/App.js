import { useState } from "react";

const Header = () => <h1>give feedback</h1>;
const Content = () => <h2>statistics</h2>;

const Buttton = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  // const [total, setTotal] = useState(0);

  const goodClick = () => {
    setGood(good + 1);
  };
  const neutralClick = () => {
    setNeutral(neutral + 1);
  };
  const badClick = () => {
    setBad(bad + 1);
  };
  // const totalClick = () => {
  //   setTotal(good + neutral + bad);
  // };

  return (
    <div>
      <Header />
      <Buttton handleClick={goodClick} text="good" />
      <Buttton handleClick={neutralClick} text="neutral" />
      <Buttton handleClick={badClick} text="bad" />
      <Content />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad) / 9}</p>
      <p>positive {(good / (good + neutral + bad)) * 100}%</p>
    </div>
  );
};

export default App;
