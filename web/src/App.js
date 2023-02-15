import React from 'react'
import './App.css'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import Game from './Game'

firebase.initializeApp({
  apiKey: 'AIzaSyDwd2q5Jv8ZchbaA62CtSFWJlXpC-7Uoh0',
  authDomain: 'nonogram-4012c.firebaseapp.com',
  projectId: 'nonogram-4012c',
  storageBucket: 'nonogram-4012c.appspot.com',
  messagingSenderId: '500114099058',
  appId: '1:500114099058:web:2236a6b1c6bee891e66beb',
  measurementId: 'G-JX4P0QKYKE',
})

// const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  // const [user] = useAuthState(auth)
  const puzzlesRef = firestore.collection('puzzles')
  const query = puzzlesRef.orderBy('createAt')

  const [puzzles] = useCollectionData(query, { idField: 'id' })

  return <div className='App'>{puzzles && <Game puzzleList={puzzles} />}</div>
}

export default App
