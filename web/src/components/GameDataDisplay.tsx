import React from 'react'

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
    if (difficultyNumber <= 3) return 'Impossible'
    if (difficultyNumber <= 6) return 'Expert'
    if (difficultyNumber <= 9) return 'Hard'
    if (difficultyNumber <= 12) return 'Normal'
    return 'Easy'
  }

  return (
    <div className='gameDataDisplay'>
      <div className='gameData'>
        <div className='levelLabel'>Level: {boardIndex + 1}</div>
        {getDifficultyName(boardDifficulty)} - {boardSize}x{boardSize}
      </div>
      <div>
        <div className='mistakes'>Mistakes: {mistakes}</div>
        <div className='timer'>
          {('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}
        </div>
      </div>
    </div>
  )
}
