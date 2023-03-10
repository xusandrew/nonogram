const functions = require('firebase-functions')
const admin = require('firebase-admin')
const app = require('express')()

admin.initializeApp()

app.get('/getPuzzles', (req:any, res:any) => {
  admin
    .firestore()
    .collection('puzzles')
    .orderBy('createAt')
    .get()
    .then((data:any) => {
      let puzzles = <number[][]>[]
      data.forEach((doc:any) => {
        puzzles.push(doc.data())
      })
      return res.json(puzzles)
    })
    .catch((err:any) => console.error(err))
})

app.get('/createPuzzle', (req:any, res:any) => {
  // const { size, board, difficulty } = generateBoard()
  const newPuzzle = {
  //   size: size,
  //   body: JSON.stringify(board),
  //   difficulty: difficulty,
  //   createAt: new Date().toISOString(),
  }

  admin
    .firestore()
    .collection('puzzles')
    .add(newPuzzle)
    .then((doc:any) => {
      return res.json({ message: `document ${doc.id} created successfully.` })
    })
    .catch((err:any) => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
})

exports.api = functions.https.onRequest(app)
