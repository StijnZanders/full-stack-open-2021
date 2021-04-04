import React, { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>
const Statistic = (props) => (
  <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {

  const {good, neutral, bad} = props
  const total = good + neutral + bad

  if (total > 0)
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="all" value={total}/>
            <Statistic text="average" value={(good-bad)/(total)}/>
            <Statistic text="positive" value={100*good/(total) + ' %'}/>
          </tbody>
        </table>
      </div>
    )
  else
      return (
        <div>
          <h1>statistics</h1>
          No feedback fiven
        </div>
      )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App