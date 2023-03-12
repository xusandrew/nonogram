import { generateEmptyBoard } from '../../src/difficultyCalculator'

test('Empty board with -1s', () => {
  const board = generateEmptyBoard(3)
  board.forEach(row => {
    row.forEach(num => {
      expect(num === -1).toBe(true)
    })
  })
  expect(board.length === 3 && board[0].length === 3).toBe(true)
})
