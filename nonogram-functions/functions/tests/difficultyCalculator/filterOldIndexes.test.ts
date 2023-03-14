import { filterOldIndexes } from '../../src/difficultyCalculator'

test('Length 1 with unsure value', () => {
  const currentState = [-1]
  const indexes = [[], [0]]
  expect(filterOldIndexes(currentState, indexes)).toStrictEqual(indexes)
})

test('Length 1 with sure value', () => {
  const currentState = [1]
  const indexes = [[], []]
  expect(filterOldIndexes(currentState, indexes)).toStrictEqual(indexes)
})

test('Length 2 with unsure values', () => {
  const currentState = [-1, -1]
  const indexes = [[], [0, 1]]
  expect(filterOldIndexes(currentState, indexes)).toStrictEqual(indexes)
})

test('Length 2 with sure values', () => {
  const currentState = [1, 1]
  const indexes = [[], [0, 1]]
  const answer = [[], []]
  expect(filterOldIndexes(currentState, indexes)).toStrictEqual(answer)
})
