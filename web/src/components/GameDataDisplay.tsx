import React from 'react'
import '../styles/GameDataDisplay.css'

interface Props {
  boardIndex: number
  boardDifficulty: number
  boardSize: number
  mistakes: number
  minutes: number
  seconds: number
}

export const GameDataDisplay: React.FC<Props> = ({
  boardIndex,
  boardDifficulty,
  boardSize,
  mistakes,
  minutes,
  seconds,
}) => {
  const getDifficultyName = (difficultyNumber: number) => {
    if (difficultyNumber <= 3) return 'Easy'
    if (difficultyNumber <= 6) return 'Normal'
    if (difficultyNumber <= 9) return 'Hard'
    if (difficultyNumber <= 12) return 'Expert'
    return 'Impossible'
  }

  return (
    <div className='gameDataDisplay'>
      <div>
        <div>Level: {boardIndex + 1}</div>
        {getDifficultyName(boardDifficulty)} - {boardSize}x{boardSize}
      </div>
      <div>
        <div>Mistakes: {mistakes}</div>
        <div>
          {('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}
        </div>
      </div>
    </div>
  )
}
