import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.points} votes</p>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)

  const randomlyChooseAnecdote = (props) => {
    const numberOfAnecdotes = anecdotes.length
    const randomAnecdoteNumber = Math.ceil(numberOfAnecdotes*Math.random()) 

    setSelected(randomAnecdoteNumber - 1)
  }

  const voteForAnecdote = (props) => {
    const copy = { ...points}
    copy[selected] += 1
    setPoints(copy)
  }

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const anecdoteWithMostVotes = (props) => {

    let mostVotedAnecdote = 0
    let mostVotes = 0 

    for (let anecdoteIndex = 0; anecdoteIndex < anecdotes.length; anecdoteIndex++) {
      if(points[anecdoteIndex] > mostVotes){
        mostVotes = points[anecdoteIndex]
        mostVotedAnecdote = anecdoteIndex
      }
    }

    return mostVotedAnecdote
  }
  
  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={voteForAnecdote} text="vote" />
      <Button handleClick={randomlyChooseAnecdote} text="next anecdote" />

      <Header text="Anecdote with most votes"/>
      <Anecdote anecdote={anecdotes[anecdoteWithMostVotes()]} points={points[anecdoteWithMostVotes()]}/>
    </div>
  )
  
}

export default App