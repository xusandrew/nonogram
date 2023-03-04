import React from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

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
  const [user] = useAuthState(auth)
  const puzzlesRef = firestore.collection('puzzles')
  const puzzlesQuery: any = puzzlesRef.orderBy('createAt')
  const scoresRef = firestore.collection('scores')
  const scoresQuery: any = scoresRef.orderBy('createAt')

  const [puzzles] = useCollectionData(puzzlesQuery)
  const [scores] = useCollectionData(scoresQuery)

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

  return (
    <div className='app'>
      {puzzles && (
        <Game
          puzzleList={puzzles}
          user={user}
          saveScore={saveScore}
          scores={scores}
        />
      )}
    </div>
  )
}
