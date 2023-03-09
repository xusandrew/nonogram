function createSampleBoard(size) {
  /* Creates a random board with randomly placed 0s and 1s*/
  let board = []
  for (let i = 0; i < size; i++) {
    let row = []
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

function hasEmpty(board, size) {
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

function isValidBoard(board, size) {
  // Check for no empty rows
  if (hasEmpty(board, size)) {
    return false
  }
  return true
}

function getDifficulty(board, size) {
  let occurrences = 0
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 1) {
        occurrences += 1
      }
    }
  }

  const cover = occurrences / (size * size)
  const difficulty = size / cover
  return difficulty
}

function generateBoard() {
  let size = Math.floor(Math.random() * 15)
  while (size < 3) {
    size = Math.floor(Math.random() * 15)
  }

  let board = createSampleBoard(size)
  while (!isValidBoard(size, board)) {
    board = createSampleBoard(size)
  }

  const difficulty = getDifficulty(board, size)

  return { size, board, difficulty }
}

module.exports = {
  createSampleBoard,
  hasEmpty,
  isValidBoard,
  getDifficulty,
  generateBoard,
}
