import { getSumFromBlockNums } from '../../src/difficultyCalculator'

test('Sum blockNums [1]', () => {
  const blockNums = [1]
  expect(getSumFromBlockNums(blockNums) === 1).toBe(true)
})

test('Sum blockNums [6, 3, 1]', () => {
  const blockNums = [6, 3, 1]
  expect(getSumFromBlockNums(blockNums) === 12).toBe(true)
})
