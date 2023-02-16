import React from 'react'
import 'firebase/compat/auth'

const NavBar = props => {
  const signIn = props.sign_in
  const signOut = props.sign_out
  const { user } = props

  return (
    <div className='navBar'>
      <div className='navGroup'>
        <div className='title'>Nonogram</div>
        <div className='navItems'>
          <div>
            <a
              href='https://www.linkedin.com/in/xusandrew'
              target='_blank'
              rel='noreferrer noopener'
            >
              Linkedin
            </a>
          </div>
          <div>
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
        <div className='navAccount' onClick={signOut}>
          {user.displayName}
        </div>
      ) : (
        <div className='navAccount' onClick={signIn}>
          Sign In
        </div>
      )}
    </div>
  )
}

export default NavBar
