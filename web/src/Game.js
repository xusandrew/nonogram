import React, { useState, useEffect } from 'react'

import GameDataDisplay from './components/GameDataDisplay.js'
import Board from './components/Board'
import GameControls from './components/GameControls'
import { useStopwatch } from 'react-timer-hook'
import { useCookies } from 'react-cookie'

const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

const Game = props => {
  const forceUpdate = useForceUpdate()
  const puzzleList = props.puzzleList
  const [boardSolution, setBoardSolution] = useState([])
  const [boardDifficulty, setBoardDifficulty] = useState([])
  const [boardIndex, setBoardIndex] = useState(-1)
  const [boardSize, setBoardSize] = useState(0)
  const [boardState, setBoardState] = useState([])
  const [selectionMode, setSelectionMode] = useState(1)
  const [mistakes, setMistakes] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  })
  const [cookies, setCookie, removeCookie] = useCookies(['scores'])

  const printBoard = () => {
    console.log(puzzleList)
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

  const saveResult = () => {
    const currentCookies = cookies['scores']
    if (!currentCookies) {
      setCookie(
        'scores',
        [
          {
            levelId: boardIndex,
            minutes: minutes,
            seconds: seconds,
            mistakes: mistakes,
          },
        ],
        { path: '/' }
      )
    } else {
      setCookie(
        'scores',
        [
          ...currentCookies,
          {
            levelId: boardIndex,
            minutes: minutes,
            seconds: seconds,
            mistakes: mistakes,
          },
        ],
        { path: '/' }
      )
    }

    pause()
  }

  const onChangeGameWon = val => {
    setGameWon(val)
    saveResult()
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
    reset()
    start()
  }

  const nextBoard = () => {
    let newBoardIndex = Math.floor(Math.random() * puzzleList.length)
    while (newBoardIndex === boardIndex) {
      newBoardIndex = Math.floor(Math.random() * puzzleList.length)
    }

    const newBoardSize = puzzleList[newBoardIndex].size
    const newBoardSolution = JSON.parse(puzzleList[newBoardIndex].body)
    const newBoardDifficulty = puzzleList[newBoardIndex].difficulty
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
    <div className='game'>
      {/* <button onClick={printBoard}>Hi</button>
      <button onClick={() => removeCookie('scores')}>Remove Cookies</button> */}
      <GameDataDisplay
        board_difficulty={boardDifficulty}
        board_size={boardSize}
        board_index={boardIndex}
        mistakes={mistakes}
        seconds={seconds}
        minutes={minutes}
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

export default Game
