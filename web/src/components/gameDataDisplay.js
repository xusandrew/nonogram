import React from 'react'
import { useStopwatch } from 'react-timer-hook'

const GameDataDisplay = props => {
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: true,
  })

  const getDifficultyName = difficultyNumber => {
    if (difficultyNumber <= 1) return 'Easy'
    if (difficultyNumber <= 2) return 'Normal'
    if (difficultyNumber <= 3) return 'Hard'
    if (difficultyNumber <= 4) return 'Expert'
    return 'Impossible'
  }

  return (
    <div className='gameDataDisplay'>
      <div className='gameData'>
        <h1>Level: {props.board_index + 1}</h1>
        {getDifficultyName(props.board_difficulty)}
      </div>
      <div>
        <div className='mistakes'>Mistakes: {props.mistakes}</div>
        <div className='timer'>
          {('0' + minutes).slice(-2)}:{('0' + seconds).slice(-2)}
        </div>
      </div>
    </div>
  )
}

export default GameDataDisplay
