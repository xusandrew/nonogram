import React from 'react'

const GameControls = props => {
  const switchMode = () => {
    if (props.selection_mode === 0) {
      props.on_change_selection_mode(1)
    } else {
      props.on_change_selection_mode(0)
    }
  }

  return (
    <div className='bottomContainer' onClick={switchMode}>
      <div className='controlsContainer'>
        <div
          className={`control ${props.selection_mode === 0 ? 'active' : ''}`}
        >
          X
        </div>
        <div
          className={`control ${props.selection_mode === 1 ? 'active' : ''}`}
        >
          O
        </div>
      </div>
    </div>
  )
}

export default GameControls
