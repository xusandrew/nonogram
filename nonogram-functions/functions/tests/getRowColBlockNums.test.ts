import { getRowBlockNums, getColBlockNums } from '../src/difficultyCalculator'

test('Rows of grid size 3', () => {
  const board = [
    [1, 0, 0],
    [0, 1, 1],
    [1, 0, 1],
  ]
  const answer = [[1], [2], [1, 1]]

  expect(getRowBlockNums(board)).toStrictEqual(answer)
})

test('Cols of grid size 3', () => {
  const board = [
    [1, 0, 0],
    [0, 1, 1],
    [1, 0, 1],
  ]
  const answer = [[1, 1], [1], [2]]

  expect(getColBlockNums(board)).toStrictEqual(answer)
})
