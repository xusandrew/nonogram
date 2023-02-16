import React from 'react'
import 'firebase/compat/auth'
import { useCookies } from 'react-cookie'

const NavBar = props => {
  const signIn = props.sign_in
  const signOut = props.sign_out
  const { user } = props
  const [cookies, , removeCookie] = useCookies(['scores'])

  return (
    <div className='navBar'>
      <div className='navGroup'>
        <div className='title'>Nonogram</div>
        <div className='navItems'>
          <div
            onClick={() => {
              console.log(cookies['scores'])
            }}
          >
            Get Cookies
          </div>

          <div
            onClick={() => {
              removeCookie('scores')
            }}
          >
            Remove Cookies
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
