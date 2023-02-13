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
  const [boardSize, setBoardSize] = useState(sampleGameData.games[0].size) //temp definition
  const [boardState, setBoardState] = useState([])
  const [selectionMode, setSelectionMode] = useState(1)
  const [mistakes, setMistakes] = useState(0)
  const [gameWon, setGameWon] = useState(false)

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

  const onChangeMistakes = val => {
    setMistakes(val)
    forceUpdate()
  }

  const onChangeGameWon = val => {
    setGameWon(val)
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
        mistakes={mistakes}
      />
      <Board
        board_solution={boardSolution}
        board_state={boardState}
        board_size={boardSize}
        on_change_board_state={onChangeBoardState}
        selection_mode={selectionMode}
        on_change_mistakes={onChangeMistakes}
        game_won={gameWon}
        on_change_game_won={onChangeGameWon}
      />
      <GameControls
        selection_mode={selectionMode}
        on_change_selection_mode={onChangeSelectionMode}
        game_won={gameWon}
      />
    </div>
  )
}

export default App
