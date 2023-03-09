const { hasEmpty } = require('../boardFunctions')

test('hasEmpty detects empty row', () => {
  const board = [
    [0, 0, 0],
    [1, 1, 1],
    [1, 1, 1],
  ]

  expect(hasEmpty(board, 3)).toBe(true)
})

test('hasEmpty detects empty column', () => {
  const board = [
    [1, 1, 0],
    [1, 1, 0],
    [1, 1, 0],
  ]

  expect(hasEmpty(board, 3)).toBe(true)
})

test('hasEmpty detects empty arbitrary row/column', () => {
  const board = [
    [1, 1, 1],
    [0, 0, 0],
    [1, 1, 0],
  ]

  expect(hasEmpty(board, 3)).toBe(true)
})

test('hasEmpty returns false when no empty rows/column', () => {
  const board = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ]

  expect(hasEmpty(board, 3)).toBe(false)
})
