import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics  = ({good, neutral, bad}) => {
  let total = good+neutral+bad;
  if (total === 0)
    return (<p>No feedback given</p>)
  return (
    <table>
      <tbody>
      <Statistic text = "Good" value = {good} />
      <Statistic text = "neutral" value = {neutral} />
      <Statistic text = "bad" value = {bad} />
      <Statistic text = "All" value = {total} />
      <Statistic text = "average" value = {(good-bad)/total} />
      <Statistic text = "positive" value = {(good/total)*100} />
      </tbody>
    </table>
  )
}
 
const Button = ({ onClick, text }) => (  <button onClick={onClick}>    {text}  </button>)
const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNuetralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text='Good' />
        <Button onClick={handleNuetralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
      </div>
      <hr />
        <h1>Statistics</h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)