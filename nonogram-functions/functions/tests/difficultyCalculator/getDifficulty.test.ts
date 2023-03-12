import { getDifficulty } from '../../src/difficultyCalculator'
import { createSampleBoard } from '../../src/boardFunctions'

test('get difficulty of 3x3 board', () => {
  const size = 3
  const board = [
    [0, 0, 1],
    [1, 1, 0],
    [1, 1, 1],
  ]
  expect(getDifficulty(board, size) > 0).toBe(true)
})

test('get difficulty of 5x5 board', () => {
  const size = 5
  const board = [
    [1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0],
  ]
  expect(getDifficulty(board, size) === -1).toBe(true)
})

test('get difficulty of 3x3 unsolvable board', () => {
  const size = 3
  const board = [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ]
  expect(getDifficulty(board, size) === -1).toBe(true)
})

test('get difficulty of arbitrary 3x3 board', () => {
  const size = 3
  const board = createSampleBoard(size)
  console.table(board)
  console.log(getDifficulty(board, size))
  expect(true).toBe(true)
})

test('get difficulty of arbitrary 5x5 board', () => {
  const size = 5
  const board = createSampleBoard(size)
  console.table(board)
  console.log(getDifficulty(board, size))
  expect(true).toBe(true)
})

test('get difficulty of arbitrary 10x10 board', () => {
  const size = 10
  const board = createSampleBoard(size)
  console.table(board)
  console.log(getDifficulty(board, size))
  expect(true).toBe(true)
})
