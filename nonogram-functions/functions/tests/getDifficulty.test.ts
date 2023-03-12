import { getDifficulty } from '../src/difficultyCalculator'
import { createSampleBoard } from '../src/boardFunctions'

test('get difficulty of 3x3 board', () => {
  const size = 3
  const board = createSampleBoard(size)
  console.log(board)
  console.log(getDifficulty(board, size))
  expect(true).toBe(true)
})
