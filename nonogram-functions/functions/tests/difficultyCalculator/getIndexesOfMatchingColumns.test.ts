import { getIndexesOfMatchingColumns } from '../../src/difficultyCalculator'

test('Matching permutations of length 1', () => {
  const perms = [[1], [1]]
  const size = 1
  const result = [[], [0]]
  expect(getIndexesOfMatchingColumns(perms, size)).toStrictEqual(result)
})

test('Different permutations of length 1', () => {
  const perms = [[1], [0]]
  const size = 1
  const result = [[], []]
  expect(getIndexesOfMatchingColumns(perms, size)).toStrictEqual(result)
})

test('Permutations of length 2', () => {
  const perms = [
    [1, 1],
    [1, 0],
  ]
  const size = 2
  const result = [[], [0]]
  expect(getIndexesOfMatchingColumns(perms, size)).toStrictEqual(result)
})
