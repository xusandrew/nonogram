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

function createSampleBoard(size, density) {
  let entries = 0
  let board = []
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size; j++) {
      if (Math.random() < density) {
        row.push(0)
      } else {
        row.push(1)
        entries += 1
      }
    }
    board.push(row)
  }
  return board
}
 
function isValidBoard(board, size) {
  let occurrences = 0
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 1) {
        occurrences += 1
      }
    }
  }

  const totalSquares = size * size
  if (
    occurrences < (1 / 6) * totalSquares ||
    occurrences > (5 / 6) * totalSquares
  ) {
    return false
  }
  return true
}

function generateBoard() {
  let size = Math.floor(Math.random() * 15)
  while (size < 3) {
    size = Math.floor(Math.random() * 15)
  }

  let density = Math.random()
  while (density < 0.3 && density > 0.7) {
    density = Math.random()
  }

  let board = createSampleBoard(size, density)
  while (!isValidBoard(size, board)) {
    board = createSampleBoard(size, density)
  }

  const difficulty = (1 / 5) * (size * (1 / density))

  return { size, board, difficulty }
}
