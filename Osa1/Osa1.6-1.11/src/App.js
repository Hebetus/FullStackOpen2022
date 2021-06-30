import React, {useState} from 'react'

const Button = (props) => {
  return(
    <button onClick={props.HandleClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {
  return <p>{props.text} {props.value}</p>
}

const Statistics = (props) => {
  const total = props.first + props.second + props.third;
  const average = (first, second, third) => {
    if(first, second, third === 0){
      return 0;
    }
    return (first*1 + second*0 + third*-1)/total
  }
  const positiveRatio = (first) => {
    if(first === 0){
      return 0;
    }
    const ratio = (first/total)*100;
    return `${ratio} %`
  }

  if(props.first === 0 && props.second === 0 && props.third === 0){
    return <p>No feedback given</p>
  }

  return(
    <div>
      <table>
        <tbody align="left">
        <tr></tr>
	        <th scope="row">good</th>
          <td>{props.first}</td>
        <tr></tr>
	        <th scope="row">neutral</th>
          <td>{props.second}</td>
        <tr></tr>
	        <th scope="row">bad</th>
          <td>{props.third}</td>
        <tr></tr>
	        <th scope="row">all</th>
          <td>{total}</td>
        <tr></tr>
	        <th scope="row">average</th>
          <td>{average(props.first, props.second, props.third)}</td>
        <tr></tr>
	        <th scope="row">positive</th>
          <td>{positiveRatio(props.first)}</td>
          </tbody>
      </table>
    </div>
  )
}

const App = (props) => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  return(
    <div>
      <h1>give feedback</h1>
      <Button HandleClick={() => setGood(good + 1)} text='good' />
      <Button HandleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button HandleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <Statistics first={good} second={neutral} third={bad} />
    </div>
  )
}

export default App