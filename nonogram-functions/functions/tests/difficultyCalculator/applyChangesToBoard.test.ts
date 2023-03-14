import { applyChangesToBoard } from '../../src/difficultyCalculator'

test('Apply changes to 3x3 board', () => {
  const boardState = [
    [-1, -1],
    [-1, -1],
  ]
  const zeroSquares = [[0, 0]]
  const oneSquares = [[1, 1]]
  const answer = [
    [0, -1],
    [-1, 1],
  ]
  expect(
    applyChangesToBoard(boardState, zeroSquares, oneSquares)
  ).toStrictEqual(answer)
})
