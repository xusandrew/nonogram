import React, { useState, useEffect } from 'react'
import SideBoard from './SideBoard'

const Board = props => {
  const [boardStyle, setBoardStyle] = useState({})
  const [mouseDown, setMouseDown] = useState(false)

  const handleHover = i => {
    if (mouseDown) {
      updateBoard(i)
    }
  }

  const updateBoard = notFlatIndex => {
    let row = Math.floor(notFlatIndex / props.board_size)
    let column = notFlatIndex % props.board_size

    let tempBoardState = props.board_state
    tempBoardState[row][column] = props.selection_mode
    props.on_change_board_state(tempBoardState)
  }

  useEffect(() => {
    setBoardStyle({
      gridTemplateColumns: `repeat(${props.board_size} , 1fr)`,
      gridTemplateRows: `repeat(${props.board_size} , 1fr)`,
    })
  }, [props.board_size])

  return (
    <div className='boardContainer'>
      <div></div>
      <SideBoard board_solution={props.board_solution} mode='vBars' />
      <SideBoard board_solution={props.board_solution} mode='hBars' />
      <div className='board' style={boardStyle}>
        {props.board_state.flat().map((square, i) => {
          return (
            <div
              key={i}
              className='square'
              onMouseDown={() => {
                setMouseDown(true)
                updateBoard(i)
              }}
              onMouseUp={() => setMouseDown(false)}
              onMouseEnter={() => handleHover(i)}
            >
              {square === 1 ? (
                <div className='filled'></div>
              ) : (
                <div className='empty'></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Board
