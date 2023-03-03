const functions = require('firebase-functions')
const admin = require('firebase-admin')
const app = require('express')()

admin.initializeApp()

app.get('/getPuzzles', (req, res) => {
  admin
    .firestore()
    .collection('puzzles')
    .orderBy('createAt')
    .get()
    .then(data => {
      let puzzles = []
      data.forEach(doc => {
        puzzles.push(doc.data())
      })
      return res.json(puzzles)
    })
    .catch(err => console.error(err))
})

app.get('/createPuzzle', (req, res) => {
  const { size, board, difficulty } = generateBoard()
  const newPuzzle = {
    size: size,
    body: JSON.stringify(board),
    difficulty: difficulty,
    createAt: new Date().toISOString(),
  }

  admin
    .firestore()
    .collection('puzzles')
    .add(newPuzzle)
    .then(doc => {
      return res.json({ message: `document ${doc.id} created successfully.` })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
})

exports.api = functions.https.onRequest(app)

function createSampleBoard(size) {
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
