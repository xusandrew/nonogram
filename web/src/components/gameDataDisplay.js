import React from 'react'

const GameDataDisplay = props => {
  const getDifficultyName = difficultyNumber => {
    if (difficultyNumber <= 3) return 'Impossible'
    if (difficultyNumber <= 6) return 'Expert'
    if (difficultyNumber <= 9) return 'Hard'
    if (difficultyNumber <= 12) return 'Normal'
    return 'Easy'
  }

  return (
    <div className='gameDataDisplay'>
      <div className='gameData'>
        <div className='levelLabel'>Level: {props.board_index + 1}</div>
        {getDifficultyName(props.board_difficulty)} - {props.board_size}x
        {props.board_size}
      </div>
      <div>
        <div className='mistakes'>Mistakes: {props.mistakes}</div>
        <div className='timer'>
          {('0' + props.minutes).slice(-2)}:{('0' + props.seconds).slice(-2)}
        </div>
      </div>
    </div>
  )
}

export default GameDataDisplay
