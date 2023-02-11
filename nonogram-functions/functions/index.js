const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

exports.getPuzzles = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection('puzzles')
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

exports.createPuzzle = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const newPuzzle = {
    body: req.body.body,
    difficulty: req.body.difficulty,
    createAt: admin.firestore.Timestamp.fromDate(new Date()),
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
