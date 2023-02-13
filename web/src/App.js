import './App.css'
import './components/GameDataDisplay'
import './components/Board'
import sampleGameData from './samplegame.json'
import React, { useState, useEffect } from 'react'
import GameDataDisplay from './components/GameDataDisplay.js'
import Board from './components/Board'

function App() {
  const [boardState, setBoardState] = useState(
    sampleGameData.games[0].boardData // temp definition
  )
  const [boardDifficulty, setBoardDifficulty] = useState(
    sampleGameData.games[0].difficulty // temp definition
  )
  const [boardIndex, setBoardIndex] = useState(0)

  const [boardSize, setBoardSize] = useState(sampleGameData.games[0].size)

  function printBoard() {
    console.log(boardState)
    console.log(boardDifficulty)
    console.log(boardIndex)
    console.log(boardSize)
  }

  return (
    <div className='App'>
      <button onClick={printBoard}>Hi</button>
      <GameDataDisplay
        board_difficulty={boardDifficulty}
        board_index={boardIndex}
      />
      <Board board_state={boardState} board_size={boardSize} />
    </div>
  )
}

export default App