import React, { useState, useEffect } from 'react'
import SideBoard from './SideBoard'

const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

const Board = props => {
  const forceUpdate = useForceUpdate()
  const [boardStyle, setBoardStyle] = useState({})
  const [mouseDown, setMouseDown] = useState(false)

  const handleHover = i => {
    if (mouseDown) {
      updateBoard(i)
    }
  }

  const checkWin = () => {
    for (let i = 0; i < props.board_size; i++) {
      for (let j = 0; j < props.board_size; j++) {
        if (props.board_solution[i][j] !== props.board_state[i][j]) return
      }
    }

    props.on_change_game_won(true)
    forceUpdate()
  }

  const handleMistake = (row, column) => {
    props.on_change_board_state(boardState => {
      boardState[row][column] = 3
      return boardState
    })

    setTimeout(() => {
      props.on_change_board_state(boardState => {
        boardState[row][column] = props.board_solution[row][column]
        return boardState
      })
    }, 500)

    setMouseDown(false)
    props.on_change_mistakes(mistakes => mistakes + 1)
  }

  const updateBoard = notFlatIndex => {
    if (props.game_won) return

    let row = Math.floor(notFlatIndex / props.board_size)
    let column = notFlatIndex % props.board_size

    if (props.board_state[row][column] !== 0) return

    if (
      (props.board_solution[row][column] === 1 && props.selection_mode !== 1) ||
      (props.board_solution[row][column] === 0 && props.selection_mode !== 2)
    ) {
      handleMistake(row, column)
      return
    }

    props.on_change_board_state(boardState => {
      boardState[row][column] = props.selection_mode
      return boardState
    })
    checkWin()
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
              ) : square === 2 ? (
                <div className='crossed'></div>
              ) : square === 3 ? (
                <div className='mistake'></div>
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
