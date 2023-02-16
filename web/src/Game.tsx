import React, { useState, useEffect } from 'react'

import { GameDataDisplay } from './components/GameDataDisplay'
import { Board } from './components/Board'
import { GameControls } from './components/GameControls'
import { WinScreen } from './components/WinScreen'
import { useStopwatch } from 'react-timer-hook'
import { useCookies } from 'react-cookie'

const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

interface Props {
  saveScore: (val: Score) => void
  user: any
  puzzleList: any
  scores: any
}

interface Score {
  uid?: string
  levelId: number
  minutes: number
  seconds: number
  mistakes: number
}

export const Game: React.FC<Props> = ({
  saveScore,
  user,
  puzzleList,
  scores,
}) => {
  const forceUpdate = useForceUpdate()
  const [boardSolution, setBoardSolution] = useState<number[][]>([])
  const [boardDifficulty, setBoardDifficulty] = useState(-1)
  const [boardIndex, setBoardIndex] = useState(-1)
  const [boardSize, setBoardSize] = useState(0)
  const [boardState, setBoardState] = useState<number[][]>([])
  const [selectionMode, setSelectionMode] = useState(1)
  const [mistakes, setMistakes] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [displayWinScreen, setDisplayWinScreen] = useState(false)
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  })
  const [cookies, setCookie] = useCookies(['scores'])

  const onChangeBoardState = (val: number[][]) => {
    setBoardState(val)
    forceUpdate()
  }

  const onChangeSelectionMode = (val: number) => {
    setSelectionMode(val)
    forceUpdate()
  }

  const onChangeMistakes = (val: number) => {
    setMistakes(val)
    forceUpdate()
  }

  const onChangeGameWon = (val: boolean) => {
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

  const resetBoard = (newBoardSize: number | undefined) => {
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
        .filter((score: any) => score.uid === user.uid && score.mistakes === 0)
        .map((score: any) => score.levelId)
    } else {
      completedLevelIds = cookies['scores']
        ? cookies['scores'].map((cookie: any) => cookie.levelId)
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
          hideWinScreen={hideWinScreen}
        />
      )}
      <div className='game'>
        <GameDataDisplay
          boardDifficulty={boardDifficulty}
          boardSize={boardSize}
          boardIndex={boardIndex}
          mistakes={mistakes}
          seconds={seconds}
          minutes={minutes}
        />
        <Board
          boardSolution={boardSolution}
          boardState={boardState}
          boardSize={boardSize}
          onChangeBoardState={onChangeBoardState}
          selectionMode={selectionMode}
          onChangeMistakes={onChangeMistakes}
          gameWon={gameWon}
          onChangeGameWon={onChangeGameWon}
        />
        <GameControls
          selectionMode={selectionMode}
          onChangeSelectionMode={onChangeSelectionMode}
          onReset={() => resetBoard(undefined)}
          onNextBoard={nextBoard}
        />
      </div>
    </>
  )
}
