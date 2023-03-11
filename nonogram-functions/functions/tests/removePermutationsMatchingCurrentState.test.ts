import {
  removePermutationsMatchingCurrentState,
  getPossiblePermutations,
} from '../src/difficultyCalculator'

test('1 block of size 6 of total size 10', () => {
  const size = 10
  const blockNumber = [6]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [1, -1, -1, -1, -1, -1, -1, -1, -1, -1] // -1 -> unsure
  const answer = [[1, 1, 1, 1, 1, 1, 0, 0, 0, 0]]
  expect(
    removePermutationsMatchingCurrentState(currentState, permutations)
  ).toStrictEqual(answer)
})

test('1 block of size 6 of total size 10, two ends spread apart', () => {
  const size = 10
  const blockNumber = [6]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [-1, -1, 1, -1, -1, -1, -1, 1, -1, -1] // -1 -> unsure
  const answer = [[0, 0, 1, 1, 1, 1, 1, 1, 0, 0]]
  expect(
    removePermutationsMatchingCurrentState(currentState, permutations)
  ).toStrictEqual(answer)
})
