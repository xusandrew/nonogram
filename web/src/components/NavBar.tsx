import React from 'react'
import 'firebase/compat/auth'

import '../styles/NavBar.css'

interface Props {
  signIn: () => void
  signOut: () => void
  user: any
}

export const NavBar: React.FC<Props> = ({ signIn, signOut, user }) => {
  return (
    <div className='navBar'>
      <div className='navGroup'>
        <a className='title' href='/'>
          Nonogram
        </a>
        <div className='navItems'>
          <div className='navLinks'>
            <a
              href='https://www.linkedin.com/in/xusandrew'
              target='_blank'
              rel='noreferrer noopener'
            >
              Linkedin
            </a>
          </div>
          <div className='navLinks'>
            <a
              href='https://github.com/xusandrew'
              target='_blank'
              rel='noreferrer noopener'
            >
              Github
            </a>
          </div>
        </div>
      </div>
      {user ? (
        <div className='navAccount'>
          <div className='userName'>{user.displayName}</div>
          <div className='signInOutButton' onClick={signOut}>
            Sign Out
          </div>
        </div>
      ) : (
        <div className='signInOutButton' onClick={signIn}>
          Sign In
        </div>
      )}
    </div>
  )
}
