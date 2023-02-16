import React from 'react'

interface Props {
  minutes: Number
  seconds: Number
  hideWinScreen: () => void
}

export const WinScreen: React.FC<Props> = ({
  minutes,
  seconds,
  hideWinScreen,
}) => {
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
