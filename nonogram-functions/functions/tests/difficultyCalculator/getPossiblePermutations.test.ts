import { getPossiblePermutations } from '../../src/difficultyCalculator'

test('Permutations of no block', () => {
  const answer: number[][] = []
  expect(getPossiblePermutations([], 5)).toStrictEqual(answer)
})

test('Permutations of max len block', () => {
  const answer: number[][] = [[1, 1, 1, 1, 1]]
  expect(getPossiblePermutations([5], 5)).toStrictEqual(answer)
})

test('Permutations of 1 block', () => {
  const answer: number[][] = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]
  expect(getPossiblePermutations([1], 3)).toStrictEqual(answer)
})

test('Permutations of 1 block of len 2', () => {
  const answer: number[][] = [
    [1, 1, 0],
    [0, 1, 1],
  ]
  expect(getPossiblePermutations([2], 3)).toStrictEqual(answer)
})

test('Permutations of 2 blocks of len 1', () => {
  const answer: number[][] = [
    [1, 0, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 0, 1],
  ]
  expect(getPossiblePermutations([1, 1], 4)).toStrictEqual(answer)
})

test('Permutations of 3 blocks of len 1', () => {
  const answer: number[][] = [
    [1, 0, 1, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 0, 1],
  ]
  expect(getPossiblePermutations([1, 1, 1], 7)).toStrictEqual(answer)
})

test('Permutations of 2 blocks of different lengths', () => {
  const answer: number[][] = [
    [1, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1],
    [0, 0, 0, 1, 0, 1, 1],
  ]
  expect(getPossiblePermutations([1, 2], 7)).toStrictEqual(answer)
})

test('Permutations of multiple blocks of different lengths', () => {
  const answer: number[][] = [
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  ]
  expect(getPossiblePermutations([1, 5, 7, 2], 20)).toStrictEqual(answer)
})
