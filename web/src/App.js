import './App.css'
import sampleGameData from './samplegame.json'
import React, { useState, useEffect } from 'react'
import GameDataDisplay from './components/GameDataDisplay.js'
import Board from './components/Board'
import GameControls from './components/GameControls'

const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

function App() {
  const forceUpdate = useForceUpdate()
  const [boardSolution, setBoardSolution] = useState(
    sampleGameData.games[0].boardData // temp definition
  )
  const [boardDifficulty, setBoardDifficulty] = useState(
    sampleGameData.games[0].difficulty // temp definition
  )
  const [boardIndex, setBoardIndex] = useState(0)
  const [boardSize, setBoardSize] = useState(sampleGameData.games[0].size)
  const [boardState, setBoardState] = useState([])
  const [selectionMode, setSelectionMode] = useState(1)

  const printBoard = () => {
    console.log(boardState)
  }

  const onChangeBoardState = val => {
    setBoardState(val)
    forceUpdate()
  }

  const onChangeSelectionMode = val => {
    setSelectionMode(val)
    forceUpdate()
  }

  useEffect(() => {
    let emptyBoard = []
    for (let i = 0; i < boardSize; i++) {
      emptyBoard.push(Array.from({ length: boardSize }, () => 0))
    }

    setBoardState(emptyBoard)
  }, [boardSize])

  return (
    <div className='App'>
      <button onClick={printBoard}>Hi</button>
      <GameDataDisplay
        board_difficulty={boardDifficulty}
        board_index={boardIndex}
      />
      <Board
        board_solution={boardSolution}
        board_state={boardState}
        board_size={boardSize}
        on_change_board_state={onChangeBoardState}
        selection_mode={selectionMode}
      />
      <GameControls
        selection_mode={selectionMode}
        on_change_selection_mode={onChangeSelectionMode}
      />
    </div>
  )
}

export default App
