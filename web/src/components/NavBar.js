import React from 'react'
import { useCookies } from 'react-cookie'

const NavBar = props => {
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
      <div className='navSignIn'>Sign In</div>
    </div>
  )
}

export default NavBar
