import './App.css'
import './components/GameDataDisplay.js'
import sampleGameData from './samplegame.json'
import React, { useState, useEffect } from 'react'
import GameDataDisplay from './components/GameDataDisplay.js'

function App() {
  const [boardState, setBoardState] = useState(
    sampleGameData.games[0].boardData // temp definition
  )
  const [boardDifficulty, setBoardDifficulty] = useState(
    sampleGameData.games[0].difficulty
  )
  const [boardIndex, setBoardIndex] = useState(0)

  function printBoard() {
    console.log(boardState)
    console.log(boardDifficulty)
    console.log(boardIndex)
  }

  return (
    <div className='App'>
      <button onClick={printBoard}>Hi</button>
      <GameDataDisplay
        board_difficulty={boardDifficulty}
        board_index={boardIndex}
      />
    </div>
  )
}

export default App