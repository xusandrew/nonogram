import React from 'react'

const WinScreen = props => {
  const { minutes, seconds } = props
  const hideWinScreen = props.hide_win_screen

  return (
    <div className='winScreen'>
      <div className='winModal'>
        <div className='winText'>
          You beat the puzzle in {('0' + minutes).slice(-2)}:
          {('0' + seconds).slice(-2)}
        </div>
        <div className='winButton' onClick={hideWinScreen}>
          Done
        </div>
      </div>
    </div>
  )
}

export default WinScreen
