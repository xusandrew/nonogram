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
          <div className='description-small'>
            Nonogram, also known as Picross, Griddlers, or Hanjie, is a puzzle
            game that revolves around filling in squares on a grid to create a
            picture. Here's a step-by-step guide on how to play:
          </div>

          <div className='description-title'>1. Understanding the Grid</div>
          <div className='description-small'>
            A Nonogram puzzle consists of a grid with rows and columns. -
            Numbers are provided on the top and left side of the grid to
            indicate how many squares should be filled in each row and column.
          </div>

          <div className='description-title'>2. Reading the Clues</div>
          <div className='description-small'>
            The numbers on the top and left side represent sequences of filled
            squares in the corresponding rows and columns. - For example, a clue
            of "3 2" means there is a group of three filled squares, followed by
            at least one blank square, and then a group of two filled squares.
          </div>

          <div className='description-title'>
            3. Starting with Definite Squares
          </div>
          <div className='description-small'>
            Begin by identifying rows or columns where the clues fill up the
            entire length, or where there's only one possible position for a
            sequence of filled squares.
          </div>

          <div className='description-title'>4. Cross-referencing</div>
          <div className='description-small'>
            Use the information from filled squares in rows to help solve
            columns and vice versa.
          </div>

          <div className='description-title'>5. Marking Empty Squares</div>
          <div className='description-small'>
            It's helpful to mark squares that you know are empty with a
            different symbol (in this case a light blue square)
          </div>

          <div className='description-title'>
            6. Using Logic and Elimination
          </div>
          <div className='description-small'>
            Apply logic to figure out where the filled squares must go, based on
            the clues and what you've already filled in.
          </div>

          <div className='description-title'>7. Checking Your Work</div>
          <div className='description-small'>
            As you progress, keep checking your work to ensure that the filled
            squares match the clues.
          </div>

          <div className='description-title'>8. Completing the Puzzle</div>
          <div className='description-small'>
            Continue filling in squares, cross-referencing between rows and
            columns, and applying logic until the puzzle is complete and a
            picture emerges.
          </div>

          <div className='description-title'>10. Practicing</div>
          <div className='description-small'>
            The more you play, the better you'll get at recognizing patterns and
            solving puzzles more quickly. Nonograms can be a fun and engaging
            way to exercise your brain. Each puzzle can be unique and offer a
            different level of challenge based on its size and complexity.
            Remember, practice and patience are key to becoming proficient at
            Nonogram puzzles!
          </div>
        </div>

        <a
          className='videoButton'
          href='https://www.youtube.com/watch?v=zisu0Qf4TAI&list=PLH_elo2OIwaAYMF8CAfDnlKcVyyB5UITk'
        >
          Here is a video that may be helpful!
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
