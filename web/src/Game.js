import React, { useState, useEffect } from 'react'

import GameDataDisplay from './components/GameDataDisplay.js'
import Board from './components/Board'
import GameControls from './components/GameControls'
import WinScreen from './components/WinScreen.js'
import { useStopwatch } from 'react-timer-hook'
import { useCookies } from 'react-cookie'

const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

const Game = props => {
  const forceUpdate = useForceUpdate()
  const saveScore = props.save_score
  const { user, puzzleList, scores } = props
  const [boardSolution, setBoardSolution] = useState([])
  const [boardDifficulty, setBoardDifficulty] = useState([])
  const [boardIndex, setBoardIndex] = useState(-1)
  const [boardSize, setBoardSize] = useState(0)
  const [boardState, setBoardState] = useState([])
  const [selectionMode, setSelectionMode] = useState(1)
  const [mistakes, setMistakes] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [displayWinScreen, setDisplayWinScreen] = useState(false)
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  })
  const [cookies, setCookie] = useCookies(['scores'])

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
    setDisplayWinScreen(true)
    saveResult()
    forceUpdate()
  }

  const hideWinScreen = () => {
    setDisplayWinScreen(false)
    forceUpdate()
  }

  const saveResult = () => {
    let data = [
      {
        levelId: boardIndex,
        minutes: minutes,
        seconds: seconds,
        mistakes: mistakes,
      },
    ]

    if (user) {
      saveScore(data[0])
    } else {
      const currentCookies = cookies['scores']
      if (currentCookies) {
        data = [...currentCookies, ...data]
      }
      setCookie('scores', data, { path: '/' })
    }

    pause()
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
    let completedLevelIds
    if (user) {
      completedLevelIds = scores
        .filter(score => score.uid === user.uid && score.mistakes === 0)
        .map(score => score.levelId)
    } else {
      completedLevelIds = cookies['scores']
        ? cookies['scores'].map(cookie => cookie.levelId)
        : []
    }

    while (
      newBoardIndex === boardIndex ||
      completedLevelIds.includes(newBoardIndex)
    ) {
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
    <>
      {displayWinScreen && (
        <WinScreen
          minutes={minutes}
          seconds={seconds}
          hide_win_screen={hideWinScreen}
        />
      )}
      <div className='game'>
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
    </>
  )
}

export default Game
