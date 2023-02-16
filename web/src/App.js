import React from 'react'
import './App.css'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import Game from './Game'
import NavBar from './components/NavBar'

const firebaseConfig = {
  apiKey: 'AIzaSyDwd2q5Jv8ZchbaA62CtSFWJlXpC-7Uoh0',
  authDomain: 'nonogram-4012c.firebaseapp.com',
  projectId: 'nonogram-4012c',
  storageBucket: 'nonogram-4012c.appspot.com',
  messagingSenderId: '500114099058',
  appId: '1:500114099058:web:2236a6b1c6bee891e66beb',
  measurementId: 'G-JX4P0QKYKE',
}
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)
  const puzzlesRef = firestore.collection('puzzles')
  const puzzlesQuery = puzzlesRef.orderBy('createAt')
  const scoresRef = firestore.collection('scores')
  const scoresQuery = scoresRef.orderBy('createAt')

  const [puzzles] = useCollectionData(puzzlesQuery, { idField: 'id' })
  const [scores] = useCollectionData(scoresQuery, { idField: 'id' })

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  const signOut = () => {
    auth.signOut()
  }

  const saveScore = async score => {
    await scoresRef.add({
      uid: user.uid,
      levelId: score.levelId,
      minutes: score.minutes,
      seconds: score.seconds,
      mistakes: score.mistakes,
      createAt: new Date().toISOString(),
    })
  }

  return (
    <div className='app'>
      <NavBar user={user} sign_in={signIn} sign_out={signOut} />
      {puzzles && (
        <Game
          puzzleList={puzzles}
          user={user}
          save_score={saveScore}
          scores={scores}
        />
      )}
    </div>
  )
}

export default App
