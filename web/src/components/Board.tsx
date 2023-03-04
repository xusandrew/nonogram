import React, { useState, useEffect } from 'react'
import { SideBoard } from './SideBoard'
import '../styles/Board.css'

interface Props {
  boardSize: number
  boardSolution: number[][]
  boardState: number[][]
  selectionMode: number
  gameWon: boolean
  onChangeGameWon: (val: boolean) => void
  onChangeBoardState: any
  onChangeMistakes: any
}

const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

export const Board: React.FC<Props> = ({
  boardSize,
  boardSolution,
  boardState,
  selectionMode,
  gameWon,
  onChangeGameWon,
  onChangeBoardState,
  onChangeMistakes,
}) => {
  const forceUpdate = useForceUpdate()
  const [boardStyle, setBoardStyle] = useState({})
  const [mouseDown, setMouseDown] = useState(false)
  const [firstSelected, setFirstSelected] = useState<number[]>([])
  const [verticalBarSums, setVerticalBarSums] = useState<string[]>([])
  const [horizontalBarSums, setHorizontalBarSums] = useState<string[]>([])

  const getIndex = (i: number) => {
    let row = Math.floor(i / boardSize)
    let column = i % boardSize
    return { row, column }
  }

  const handleHover = (row: number, column: number) => {
    if (mouseDown) {
      updateBoard(row, column)
    }
  }

  const onChangeVerticalBarSums = (val: string[]) => {
    setVerticalBarSums(val)
    forceUpdate()
  }

  const onChangeHorizontalBarSums = (val: string[]) => {
    setHorizontalBarSums(val)
    forceUpdate()
  }

  const getTotalFromString = (str: string) => {
    let total = 0
    str.split(' ').forEach(num => (total += parseInt(num)))
    return total
  }

  const checkCompleteRow = (board: number[][], row: number, column: number) => {
    const rowTotal = getTotalFromString(horizontalBarSums[row])
    const columnTotal = getTotalFromString(verticalBarSums[column])

    let rowOccurrences = 0
    let columnOccurrences = 0

    for (let i = 0; i < boardSize; i++) {
      if (board[row][i] === 1) rowOccurrences += 1
      if (board[i][column] === 1) columnOccurrences += 1
    }

    if (rowTotal === rowOccurrences) {
      for (let i = 0; i < boardSize; i++) {
        if (boardSolution[row][i] === 0) {
          board[row][i] = 2
        }
      }
    }

    if (columnTotal === columnOccurrences) {
      for (let i = 0; i < boardSize; i++) {
        if (boardSolution[i][column] === 0) {
          board[i][column] = 2
        }
      }
    }

    return board
  }

  const checkWin = () => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (boardSolution[i][j] === 1) {
          if (boardState[i][j] !== 1) return
        }
      }
    }

    onChangeGameWon(true)
    forceUpdate()
  }

  const handleMistake = (row: number, column: number) => {
    onChangeBoardState((boardState: number[][]) => {
      boardState[row][column] = 3
      return boardState
    })

    setTimeout(() => {
      onChangeBoardState((boardState: number[][]) => {
        boardState[row][column] = boardSolution[row][column]
        return boardState
      })
    }, 500)

    setMouseDown(false)
    onChangeMistakes((mistakes: any) => mistakes + 1)
  }

  const updateBoard = (row: number, column: number) => {
    if (gameWon) return
    if (firstSelected.length !== 0) {
      if (firstSelected?.[0] !== row && firstSelected?.[1] !== column) return
    }

    if (boardState[row][column] !== 0) return

    if (
      (boardSolution[row][column] === 1 && selectionMode !== 1) ||
      (boardSolution[row][column] === 0 && selectionMode !== 2)
    ) {
      handleMistake(row, column)
      return
    }

    let tempBoard: number[][] = boardState
    tempBoard[row][column] = selectionMode
    tempBoard = checkCompleteRow(tempBoard, row, column)
    onChangeBoardState(tempBoard)
    checkWin()
  }

  useEffect(() => {
    setBoardStyle({
      gridTemplateColumns: `repeat(${boardSize} , 1fr)`,
      gridTemplateRows: `repeat(${boardSize} , 1fr)`,
    })
  }, [boardSize])

  return (
    <div className='boardContainer'>
      <div></div>
      <SideBoard
        boardSolution={boardSolution}
        mode='vBars'
        verticalBarSums={verticalBarSums}
        onChangeVerticalBarSums={onChangeVerticalBarSums}
        horizontalBarSums={horizontalBarSums}
        onChangeHorizontalBarSums={onChangeHorizontalBarSums}
      />
      <SideBoard
        boardSolution={boardSolution}
        mode='hBars'
        verticalBarSums={verticalBarSums}
        onChangeVerticalBarSums={onChangeVerticalBarSums}
        horizontalBarSums={horizontalBarSums}
        onChangeHorizontalBarSums={onChangeHorizontalBarSums}
      />
      <div
        className='board'
        style={boardStyle}
        onMouseLeave={() => {
          setMouseDown(false)
        }}
      >
        {boardState?.flat().map((square, i) => {
          return (
            <div
              key={i}
              className='square'
              onMouseDown={() => {
                setMouseDown(true)
                let { row, column } = getIndex(i)
                setFirstSelected([row, column])
                updateBoard(row, column)
              }}
              onMouseUp={() => {
                setMouseDown(false)
                setFirstSelected([])
              }}
              onMouseEnter={() => {
                let { row, column } = getIndex(i)
                handleHover(row, column)
              }}
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
