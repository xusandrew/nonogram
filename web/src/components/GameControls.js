import React from 'react'

const GameControls = props => {
  const switchMode = () => {
    if (props.selection_mode === 1) {
      props.on_change_selection_mode(2)
    } else {
      props.on_change_selection_mode(1)
    }
  }

  return (
    <div className='bottomContainer' onClick={switchMode}>
      <div className='controlsContainer'>
        <div
          className={`control ${props.selection_mode === 2 ? 'active' : ''}`}
        >
          X
        </div>
        <div
          className={`control ${props.selection_mode === 1 ? 'active' : ''}`}
        >
          O
        </div>
      </div>

      {props.game_won ? <div>Game Won! Congrats</div> : <></>}
    </div>
  )
}

export default GameControls
