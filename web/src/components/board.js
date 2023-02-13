import React, { useState, useEffect } from 'react'

const Board = props => {
  const [boardStyle, setBoardStyle] = useState({})

  useEffect(() => {
    setBoardStyle({
      gridTemplateColumns: `repeat(${props.board_size} , 1fr)`,
      gridTemplateRows: `repeat(${props.board_size} , 1fr)`,
    })
  }, [props.board_size])

  return (
    <div className='board' style={boardStyle}>
      {props.board_state.flat().map((square, i) => {
        return (
          <div key={i} className='square'>
            {square}
          </div>
        )
      })}
    </div>
  )
}

export default Board
