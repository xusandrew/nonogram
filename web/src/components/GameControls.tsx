import React from 'react'
import '../styles/GameControls.css'

interface Props {
  selectionMode: number
  onChangeSelectionMode: (val: number) => void
  onReset: () => void
  onNextBoard: () => void
}

export const GameControls: React.FC<Props> = ({
  selectionMode,
  onChangeSelectionMode,
  onReset,
  onNextBoard,
}) => {
  const switchMode = () => {
    if (selectionMode === 1) {
      onChangeSelectionMode(2)
    } else {
      onChangeSelectionMode(1)
    }
  }

  return (
    <div className='bottomContainer'>
      <div className='controlsContainer' onClick={switchMode}>
        <div className={`control ${selectionMode === 2 ? 'active' : ''}`}>
          X
        </div>
        <div className={`control ${selectionMode === 1 ? 'active' : ''}`}>
          O
        </div>
      </div>

      <div className='controlsContainer button' onClick={onReset}>
        Reset
      </div>

      <div className='controlsContainer button' onClick={onNextBoard}>
        Next
      </div>
    </div>
  )
}
