export function createSampleBoard(size:number) {
  /* Creates a random board with randomly placed 0s and 1s*/
  let board = <number[][]>[]
  for (let i = 0; i < size; i++) {
    let row = <number[]>[]
    for (let j = 0; j < size; j++) {
      if (Math.random() < 0.5) {
        row.push(0)
      } else {
        row.push(1)
      }
    }
    board.push(row)
  }
  return board
}

export function hasEmpty(board:number[][], size:number) {
  /* Checking if a board has an empty row/column */
  for (let i = 0; i < size; i++) {
    let seenRow = false
    let seenColumn = false

    for (let j = 0; j < size; j++) {
      if (seenRow && seenColumn) {
        break
      }
      if (board[i][j] === 1) {
        seenRow = true
      }
      if (board[j][i] === 1) {
        seenColumn = true
      }
    }

    if (!seenRow || !seenColumn) {
      return true
    }
  }
  return false
}

export function generateBoard() {}