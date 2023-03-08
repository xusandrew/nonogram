import React, { useState, useEffect } from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { useCookies } from 'react-cookie'

import { Game } from '../components/Game'

interface Score {
  levelId: number
  minutes: number
  seconds: number
  mistakes: number
}

interface Props {
  auth: any
  firestore: any
}

export const GamePage: React.FC<Props> = ({ auth, firestore }) => {
  // Firebase Hooks
  const [user] = useAuthState(auth)
  const puzzlesRef = firestore.collection('puzzles')
  const puzzlesQuery: any = puzzlesRef.orderBy('createAt')
  const scoresRef = firestore.collection('scores')
  const scoresQuery: any = scoresRef.orderBy('createAt')

  // Firebase collections
  const [puzzles] = useCollectionData(puzzlesQuery)
  const [scores] = useCollectionData(scoresQuery)

  // Board Data
  const [currentBoardSolution, setCurrentBoardSolution] = useState<number[][]>(
    []
  )
  const [currentBoardDifficulty, setCurrentBoardDifficulty] = useState(-1)
  const [currentBoardIndex, setCurrentBoardIndex] = useState(-1)
  const [currentBoardSize, setCurrentBoardSize] = useState(0)
  const [cookies] = useCookies(['scores'])

  const saveScore = async (score: Score) => {
    await scoresRef.add({
      uid: user?.uid,
      levelId: score.levelId,
      minutes: score.minutes,
      seconds: score.seconds,
      mistakes: score.mistakes,
      createAt: new Date().toISOString(),
    })
  }

  const newBoard = () => {
    if (puzzles === undefined) return
    if (scores === undefined) return

    let newBoardIndex = Math.floor(Math.random() * puzzles.length)
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
      newBoardIndex === currentBoardIndex ||
      completedLevelIds.includes(newBoardIndex)
    ) {
      newBoardIndex = Math.floor(Math.random() * puzzles.length)
    }

    const newBoardSize = puzzles[newBoardIndex].size
    const newBoardSolution = JSON.parse(puzzles[newBoardIndex].body)
    const newBoardDifficulty = puzzles[newBoardIndex].difficulty
    setCurrentBoardSolution(newBoardSolution)
    setCurrentBoardDifficulty(newBoardDifficulty)
    setCurrentBoardIndex(newBoardIndex)
    setCurrentBoardSize(newBoardSize)
  }

  useEffect(() => {
    newBoard()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzles])

  return (
    <>
      {currentBoardSize && (
        <Game
          boardSolution={currentBoardSolution}
          boardDifficulty={currentBoardDifficulty}
          boardIndex={currentBoardIndex}
          boardSize={currentBoardSize}
          user={user}
          saveScore={saveScore}
          newBoard={newBoard}
        />
      )}
    </>
  )
}
