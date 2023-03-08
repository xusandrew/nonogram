import React, { useState, useEffect } from 'react'

import { GameDataDisplay } from './GameDataDisplay'
import { Board } from './Board'
import { GameControls } from './GameControls'
import { WinScreen } from './WinScreen'
import { useCookies } from 'react-cookie'
import { useStopwatch } from 'react-timer-hook'

import '../styles/Game.css'

const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

interface Props {
  boardSolution: number[][]
  boardDifficulty: number
  boardIndex: number
  boardSize: number
  saveScore: (val: Score) => void
  user: any
  newBoard: () => void
}

interface Score {
  uid?: string
  levelId: number
  minutes: number
  seconds: number
  mistakes: number
}

export const Game: React.FC<Props> = ({
  boardSolution,
  boardDifficulty,
  boardIndex,
  boardSize,
  user,
  saveScore,
  newBoard,
}) => {
  const forceUpdate = useForceUpdate()
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

  useEffect(() => {
    resetBoard(boardSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardSize])

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
          onNextBoard={newBoard}
        />
      </div>
    </>
  )
}
