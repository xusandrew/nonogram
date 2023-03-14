import { isBoardComplete } from '../../src/difficultyCalculator'

test('Board with -1s', () => {
  const board = [
    [0, 0],
    [0, -1],
  ]
  expect(isBoardComplete(board)).toBe(false)
})

test('Board with no -1s', () => {
  const board = [
    [0, 0],
    [0, 1],
  ]
  expect(isBoardComplete(board)).toBe(true)
})
