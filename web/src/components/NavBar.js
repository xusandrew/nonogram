import React from 'react'

const NavBar = props => {
  return (
    <div className='navBar'>
      <div className='navGroup'>
        <div className='title'>Nonogram</div>
        <div className='navItems'>
          <div>Menu</div>
          <div>Options</div>
        </div>
      </div>
      <div className='navSignIn'>Sign In</div>
    </div>
  )
}

export default NavBar
