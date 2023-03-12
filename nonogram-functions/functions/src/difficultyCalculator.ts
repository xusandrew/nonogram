export function generateEmptyBoard(size: number) {
  // Returns array of -1s
  const result: number[][] = []
  for (let i = 0; i < size; i++) {
    result.push(new Array(size).fill(-1))
  }
  return result
}

export function getSumFromBlockNums(blockNums: number[]) {
  //   Get number of squares the blocks must take up
  //   blockNums = [6, 3] => 6 + 3 + 1 = 10
  return (
    blockNums.reduce((a: number, b: number) => a + b, 0) + blockNums.length - 1
  )
}

export function getRowBlockNums(board: number[][]) {
  // Returns the block nums from the rows of the board
  let result: number[][] = []
  board.forEach(row => {
    result.push(getBlockNumsForSingle(row))
  })
  return result
}

export function getColBlockNums(board: number[][]) {
  // Returns the block nums from the rows of the board
  let result: number[][] = []

  for (let i = 0; i < board.length; i++) {
    const col = board.map(row => row[i])
    result.push(getBlockNumsForSingle(col))
  }

  return result
}

export function getBlockNumsForSingle(nums: number[]) {
  // Takes the raw row, and returns the block nums
  // rawNums = [1,1,1,0,1] => [3, 1]
  let result: number[] = []
  let currentBlockLen = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 0) {
      if (currentBlockLen > 0) {
        result.push(currentBlockLen)
        currentBlockLen = 0
      }
    } else if (nums[i] == 1) {
      currentBlockLen++
    }
  }
  if (currentBlockLen > 0) {
    result.push(currentBlockLen)
  }
  return result
}

export function getPossiblePermutations(blockNums: number[], size: number) {
  // Recursively find block permutations
  // returns list of lists
  // i.e result = [
  //   [1, 0, 0],
  //   [0, 1, 0],
  //   [0, 0, 1]
  // ]
  if (blockNums.length == 0) return []

  let result: number[][] = []
  const remainingLen = size - getSumFromBlockNums(blockNums.slice(1)) - 1
  const maxIndex = remainingLen - blockNums[0]

  for (let i = 0; i <= maxIndex; i++) {
    let perm: number[] = new Array(i).fill(0)
    perm = perm.concat(new Array(blockNums[0]).fill(1))

    if (blockNums.length != 1) {
      perm = perm.concat([0])
      getPossiblePermutations(blockNums.slice(1), size - perm.length).forEach(
        (remaining: number[]) => {
          result.push(perm.concat(remaining))
        }
      )
    } else {
      result.push(perm.concat(new Array(size - perm.length).fill(0)))
    }
  }

  return result
}

export function removePermutationsMatchingCurrentState(
  currentState: number[],
  possiblePermutations: number[][]
) {
  // filters out the permutations that do not equal currentState

  // indexes of the currentState which are defined (not -1)
  let definedIndex: number[] = []
  currentState.forEach((num, i) => {
    if (num !== -1) definedIndex.push(i)
  })

  let removeIndex: number[] = []

  possiblePermutations.forEach((perm, i) => {
    for (const j of definedIndex) {
      if (perm[j] !== currentState[j]) {
        removeIndex.push(i)
        break
      }
    }
  })

  removeIndex.reverse().forEach((index: number) => {
    possiblePermutations.splice(index, 1)
  })

  return possiblePermutations
}

export function getIndexesOfMatchingColumns(
  possiblePermutations: number[][],
  size: number
) {
  // check if any of the columns contain the same value, and returns
  // the indexes

  // result[0] will be indexes with zeroes
  // result[1] will be indexes ones
  let result: number[][] = [[], []]
  if (possiblePermutations.length === 0) {
    return result
  }

  for (let i = 0; i < size; i++) {
    let foundNotEqual = false

    const desiredVal = possiblePermutations[0][i]
    for (let j = 1; j < possiblePermutations.length; j++) {
      if (possiblePermutations[j][i] !== desiredVal) {
        foundNotEqual = true
        break
      }
    }

    if (!foundNotEqual) {
      // column should be all the same digit
      result[desiredVal].push(i)
    }
  }

  return result
}

export function filterOldIndexes(currentState: number[], indexes: number[][]) {
  let result: number[][] = [[], []]

  // For each 0
  indexes[0].forEach(zeroIndex => {
    if (currentState[zeroIndex] === -1) {
      result[0].push(zeroIndex)
    }
  })

  // For each 1
  indexes[1].forEach(oneIndex => {
    if (currentState[oneIndex] === -1) {
      result[1].push(oneIndex)
    }
  })
  return result
}

export function filterPermutations(
  currentState: number[],
  possiblePermutations: number[][],
  size: number
) {
  // Will be given currentState in form
  // [0, 0, 1, 1, -1], where -1 is unsure, 0 is unfilled and 1 is filled

  // first filters out the permutations that do not equal currentState
  possiblePermutations = removePermutationsMatchingCurrentState(
    currentState,
    possiblePermutations
  )

  // returns a list of lists of indexes for which values are guaranteed 0 or 1.
  // indexes = [
  //  [0,1,2],   // values are 0
  //  [3,4,5]    // values are 1
  // ]
  let indexes = getIndexesOfMatchingColumns(possiblePermutations, size)

  // only return indexes that are new compared to currentState
  const result = filterOldIndexes(currentState, indexes)
  return result
}

export function findSquaresPerRow(
  boardState: number[][],
  rowBlockNums: number[][],
  size: number
) {
  // result[0] = points with zero
  // result[1] = points with one
  let result: number[][][] = [[], []]

  boardState.forEach((row, rowIndex) => {
    // possible permutations of given blockNums
    const perms: number[][] = getPossiblePermutations(
      rowBlockNums[rowIndex],
      size
    )

    // filter permutations and give out values
    const values: number[][] = filterPermutations(row, perms, size)

    // Add 0s to result
    values[0].forEach(zeroIndex => {
      result[0].push([rowIndex, zeroIndex])
    })

    // Add 1s to result
    values[1].forEach(oneIndex => {
      result[1].push([rowIndex, oneIndex])
    })
  })
  return result
}

export function findSquaresPerCol(
  boardState: number[][],
  colBlockNums: number[][],
  size: number
) {
  // result[0] = points with zero
  // result[1] = points with one
  let result: number[][][] = [[], []]

  for (let colIndex = 0; colIndex < size; colIndex++) {
    const col = boardState.map(row => row[colIndex])

    const perms: number[][] = getPossiblePermutations(
      colBlockNums[colIndex],
      size
    )

    // filter permutations and give out values
    const values: number[][] = filterPermutations(col, perms, size)

    // Add 0s to result
    values[0].forEach(zeroIndex => {
      result[0].push([zeroIndex, colIndex])
    })

    // Add 1s to result
    values[1].forEach(oneIndex => {
      result[1].push([oneIndex, colIndex])
    })
  }
  return result
}

export function applyChangesToBoard(
  boardState: number[][],
  zeroSquares: number[][],
  oneSquares: number[][]
) {
  zeroSquares.forEach(([i, j]) => {
    boardState[i][j] = 0
  })
  oneSquares.forEach(([i, j]) => {
    boardState[i][j] = 1
  })
  return boardState
}

export function isBoardComplete(boardState: number[][]) {
  return !boardState.flat().includes(-1)
}

export function getDifficulty(board: number[][], size: number) {
  // Main function to get difficulty

  let difficulty = 0
  let boardState: number[][] = generateEmptyBoard(size)

  const rowBlockNums = getRowBlockNums(board)
  const colBlockNums = getColBlockNums(board)

  let iteration = 1
  let boardComplete = false
  while (!boardComplete) {
    // On every iteration, keep track of zeroes and ones
    const [rowZeroes, rowOnes] = findSquaresPerRow(
      boardState,
      rowBlockNums,
      size
    )

    const [colZeroes, colOnes] = findSquaresPerCol(
      boardState,
      colBlockNums,
      size
    )

    // Use set to make values unique
    const zeroSquares = [...new Set(rowZeroes.concat(colZeroes))]
    const oneSquares = [...new Set(rowOnes.concat(colOnes))]

    // Check if unsolvable
    if (zeroSquares.length + oneSquares.length === 0) {
      return -1
    }

    // difficulty calculation algorithm
    difficulty +=
      (1 / iteration) * (0.5 * zeroSquares.length + oneSquares.length)

    // Apply changes to boardState
    boardState = applyChangesToBoard(boardState, zeroSquares, oneSquares)

    boardComplete = isBoardComplete(boardState)

    iteration++
  }
  return difficulty
}
