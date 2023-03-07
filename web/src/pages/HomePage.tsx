import React from 'react'
import '../styles/HomePage.css'

export const HomePage: React.FC = () => {
  return (
    <div className='homePage'>
      <div className='section main'>
        <div className='title'>Nonogram</div>
        <div className='subtitle'>A.K.A Hanjie or Paint by Numbers</div>
        <div className='description'>Simple rules, challenging solutions.</div>
      </div>

      <div className='section tutorial'>
        <div className='title'>How to Play</div>
        <div className='description'>
          You have a grid of squares, which must be either filled in black or
          marked with X. Beside each row of the grid are listed the lengths of
          the runs of black squares on that row. Above each column are listed
          the lengths of the runs of black squares in that column. Your aim is
          to find all black squares.
        </div>

        <a
          className='videoButton'
          href='https://www.youtube.com/watch?v=zisu0Qf4TAI&list=PLH_elo2OIwaAYMF8CAfDnlKcVyyB5UITk'
        >
          Watch a more detailed tutorial
        </a>
      </div>

      <div className='section normalMode'>
        <div className='title'>Ready? Play now.</div>
        <a className='button' href='/game'>
          Play
        </a>
      </div>
    </div>
  )
}
