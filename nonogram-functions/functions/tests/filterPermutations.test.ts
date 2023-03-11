import {
  filterPermutations,
  getPossiblePermutations,
} from '../src/difficultyCalculator'

test('1 size 1 block with total size 3', () => {
  const size = 3
  const blockNumber = [1]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [-1, -1, -1] // -1 -> unsure
  const answer = [[], []]
  expect(filterPermutations(currentState, permutations, size)).toStrictEqual(
    answer
  )
})

test('1 size 2 block with total size 3', () => {
  const size = 3
  const blockNumber = [2]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [-1, -1, -1] // -1 -> unsure
  const answer = [[], [1]]
  expect(filterPermutations(currentState, permutations, size)).toStrictEqual(
    answer
  )
})

test('2 blocks with size 6,2 with total size 10', () => {
  const size = 10
  const blockNumber = [6, 2]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1] // -1 -> unsure
  const answer = [[], [1, 2, 3, 4, 5, 8]]
  expect(filterPermutations(currentState, permutations, size)).toStrictEqual(
    answer
  )
})

test('2 blocks with size 6,2 with total size 10, with currentState', () => {
  const size = 10
  const blockNumber = [6, 2]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [1, -1, -1, -1, -1, -1, -1, -1, -1, -1] // -1 -> unsure
  const answer = [[6], [0, 1, 2, 3, 4, 5, 8]]
  expect(filterPermutations(currentState, permutations, size)).toStrictEqual(
    answer
  )
})

test('2 blocks with size 6,2 with total size 10, with currentState', () => {
  const size = 10
  const blockNumber = [6, 2]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [1, -1, -1, -1, -1, -1, -1, -1, -1, -1] // -1 -> unsure
  const answer = [[6], [0, 1, 2, 3, 4, 5, 8]]
  expect(filterPermutations(currentState, permutations, size)).toStrictEqual(
    answer
  )
})

test('2 blocks with size 6,2 with total size 10, with currentState', () => {
  const size = 10
  const blockNumber = [6, 2]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [1, -1, -1, -1, -1, -1, -1, -1, -1, -1] // -1 -> unsure
  const answer = [[6], [0, 1, 2, 3, 4, 5, 8]]
  expect(filterPermutations(currentState, permutations, size)).toStrictEqual(
    answer
  )
})

test('1 block with size 6 with total size 10, with block on edge', () => {
  const size = 10
  const blockNumber = [6]
  const permutations = getPossiblePermutations(blockNumber, size)
  const currentState = [1, -1, -1, -1, -1, -1, -1, -1, -1, -1] // -1 -> unsure
  const answer = [
    [6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5],
  ]
  expect(filterPermutations(currentState, permutations, size)).toStrictEqual(
    answer
  )
})
