import {
  findSquaresPerRow,
  findSquaresPerCol,
} from '../src/difficultyCalculator'

test('Rows of grid size 3', () => {
  const boardState = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ]
  const rowBlockNums = [[1], [2], [1, 1]]
  const size = 3

  const answer = [
    [[2, 1]],
    [
      [1, 1],
      [2, 0],
      [2, 2],
    ],
  ]

  expect(findSquaresPerRow(boardState, rowBlockNums, size)).toStrictEqual(
    answer
  )
})

test('Cols of grid size 3', () => {
  const boardState = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ]
  const colBlockNums = [[1], [2], [1, 1]]
  const size = 3

  const answer = [
    [[1, 2]],
    [
      [1, 1],
      [0, 2],
      [2, 2],
    ],
  ]

  expect(findSquaresPerCol(boardState, colBlockNums, size)).toStrictEqual(
    answer
  )
})
