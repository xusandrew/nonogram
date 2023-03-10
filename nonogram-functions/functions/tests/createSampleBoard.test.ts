import { createSampleBoard } from '../boardFunctions'

test('Creates board of specified size', () => {
  const size = 3
  const board = createSampleBoard(size)
  expect(board.length === size && board[0].length === size).toBe(true)
})

test('Creates board only containing zeroes and ones', () => {
  const size = 3
  const board = createSampleBoard(size)
  board.flat().forEach(num => expect(num === 0 || num === 1).toBe(true))
})
