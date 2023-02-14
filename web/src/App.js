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
  const [boardSolution, setBoardSolution] = useState([])
  const [boardDifficulty, setBoardDifficulty] = useState([])
  const [boardIndex, setBoardIndex] = useState(-1)
  const [boardSize, setBoardSize] = useState(0)
  const [boardState, setBoardState] = useState([])
  const [selectionMode, setSelectionMode] = useState(1)
  const [mistakes, setMistakes] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const printBoard = () => {
    console.log(boardState)
    console.log(boardIndex)
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

  const resetBoard = newBoardSize => {
    let size = newBoardSize
    if (!size) {
      size = boardSize
    }

    let emptyBoard = []
    for (let i = 0; i < size; i++) {
      emptyBoard.push(Array.from({ length: size }, () => 0))
    }
    setBoardState(emptyBoard)
    setSelectionMode(1)
    setMistakes(0)
    setGameWon(false)
  }

  const nextBoard = () => {
    let newBoardIndex = Math.floor(Math.random() * sampleGameData.games.length)
    while (newBoardIndex === boardIndex) {
      newBoardIndex = Math.floor(Math.random() * sampleGameData.games.length)
    }

    let newBoardSize = sampleGameData.games[newBoardIndex].size
    let newBoardSolution = sampleGameData.games[newBoardIndex].boardData
    let newBoardDifficulty = sampleGameData.games[newBoardIndex].difficulty

    setBoardSolution(newBoardSolution)
    setBoardDifficulty(newBoardDifficulty)
    setBoardIndex(newBoardIndex)
    setBoardSize(newBoardSize)
    resetBoard(newBoardSize)
  }

  useEffect(() => {
    nextBoard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        on_reset={() => resetBoard(null)}
        on_next_board={nextBoard}
      />
    </div>
  )
}

export default App
