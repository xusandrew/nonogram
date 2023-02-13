import './App.css'
import './components/GameDataDisplay'
import './components/Board'
import sampleGameData from './samplegame.json'
import React, { useState, useEffect } from 'react'
import GameDataDisplay from './components/GameDataDisplay.js'
import Board from './components/Board'

const useForceUpdate = () => {
  const [value, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

function App() {
  const forceUpdate = useForceUpdate()
  const [boardState, setBoardState] = useState(
    sampleGameData.games[0].boardData // temp definition
  )
  const [boardDifficulty, setBoardDifficulty] = useState(
    sampleGameData.games[0].difficulty // temp definition
  )
  const [boardIndex, setBoardIndex] = useState(0)

  const [boardSize, setBoardSize] = useState(sampleGameData.games[0].size)

  const printBoard = () => {
    console.log(boardState)
  }

  const onChangeBoardState = val => {
    setBoardState(val)
    forceUpdate()
  }

  return (
    <div className='App'>
      <button onClick={printBoard}>Hi</button>
      <GameDataDisplay
        board_difficulty={boardDifficulty}
        board_index={boardIndex}
      />
      <Board
        board_state={boardState}
        board_size={boardSize}
        on_change_board_state={onChangeBoardState}
      />
    </div>
  )
}

export default App