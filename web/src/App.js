import './App.css'
import sampleGameData from './samplegame.json'
import React, { useState, useEffect } from 'react'

function App() {
  const [boardState, setBoardState] = useState(
    sampleGameData.games[0].boardData // temp definition
  )

  function printBoard() {
    console.log(boardState)
  }

  return (
    <div className='App'>
      <h1>hello</h1>
      <button onClick={printBoard}>Hi</button>
    </div>
  )
}

export default App