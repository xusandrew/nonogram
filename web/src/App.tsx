import React from 'react'
import './styles/App.css'

import { Routes, Route } from 'react-router-dom'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'

import { NavBar } from './components/NavBar'
import { GamePage } from './pages/GamePage'
import { HomePage } from './pages/HomePage'

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

const auth: any = firebase.auth()
const firestore = firebase.firestore()

export const App: React.FC = () => {
  const [user] = useAuthState(auth)

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  const signOut = () => {
    auth.signOut()
  }

  return (
    <div className='app'>
      <NavBar user={user} signIn={signIn} signOut={signOut} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/game'
          element={<GamePage auth={auth} firestore={firestore} />}
        />
      </Routes>
    </div>
  )
}