const { hasEmpty } = require('../boardFunctions')

test('Detects empty row', () => {
  const board = [
    [0, 0, 0],
    [1, 1, 1],
    [1, 1, 1],
  ]

  expect(hasEmpty(board, 3)).toBe(true)
})

test('Detects empty column', () => {
  const board = [
    [1, 1, 0],
    [1, 1, 0],
    [1, 1, 0],
  ]

  expect(hasEmpty(board, 3)).toBe(true)
})

test('Detects empty arbitrary row/column', () => {
  const board = [
    [1, 1, 1],
    [0, 0, 0],
    [1, 1, 0],
  ]

  expect(hasEmpty(board, 3)).toBe(true)
})

test('Returns false when no empty rows/column', () => {
  const board = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ]

  expect(hasEmpty(board, 3)).toBe(false)
})
