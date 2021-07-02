import React, { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];

  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]); 
  const [selected, setSelected] = useState(0);

  const newIndex = () => {
    const min = Math.ceil(0);
    const max = Math.floor(7);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const newVotes = (votesArray) => {
    const copy = [...votesArray];
    copy[selected] += 1;
    return(
      copy
    )
  }

  const mostVotes = (votesArray, anecdotesArray) => {
    const most = Math.max.apply(Math, votesArray);
    const index = votesArray.indexOf(most);
    console.log(most, index);

    return anecdotesArray[index];
  }

  console.log(votes);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={() => setVotes(newVotes(votes))} text='vote' />
      <Button handleClick={() => setSelected(newIndex)} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{mostVotes(votes, anecdotes)}</p>
      <p>has {Math.max.apply(Math, votes)} votes</p>
    </div>
  )
}

export default App