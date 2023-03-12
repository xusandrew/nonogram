import { getBlockNumsForSingle } from '../src/difficultyCalculator'

test('Empty Array', () => {
  expect(getBlockNumsForSingle([])).toStrictEqual([])
})

test('Single block', () => {
  expect(getBlockNumsForSingle([1, 1, 1, 1, 1, 1, 0])).toStrictEqual([6])
})

test('Multiple blocks', () => {
  expect(getBlockNumsForSingle([1, 1, 1, 1, 0, 0, 1])).toStrictEqual([4, 1])
})
