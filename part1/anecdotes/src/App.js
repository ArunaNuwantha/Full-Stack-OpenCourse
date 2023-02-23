import { useState } from 'react'

const AnecdoteLine = (props) => {
  return (
    <div>
      <p>{props.anecdotes[props.selected]}</p>
      <p>has {props.points[props.selected]} votes</p>
    </div>
  )
}


const MostVoteLine = (props) => {
  let max = 0;
  let maxIndex = -1;
  props.points.forEach((v, i) => {
    if (v > max) {
      max = v;
      maxIndex = i;
    }
  });

  if (max === 0 || maxIndex === -1) {
    return;
  }
  return (
    <AnecdoteLine points={props.points} selected={maxIndex} anecdotes={props.anecdotes} />
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]



  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleOnClick = () => {
    if (selected === anecdotes.length - 1) {
      setSelected(0);
    } else {
      setSelected(e => e + 1);
    }
  }

  const handleVote = () => {
    points[selected] += 1;
    setPoints([...points]);
  }



  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteLine points={points} selected={selected} anecdotes={anecdotes} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleOnClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVoteLine points={points} anecdotes={anecdotes} />

    </div>
  )
}

export default App