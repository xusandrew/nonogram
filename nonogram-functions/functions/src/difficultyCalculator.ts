// export function getDifficulty(board:number[][], size:number) {
//
// Strategies for finding squares.
//   - Take the sum of the blocks and 1 for each space, if that sum == size,
//   row is filled
//       - i.e the row "6 3" in a size 10 game, 6 + 1 + 3 = 10 thus solvable
//   - Take the sum of blocks + spaces, and lay the blocks aligned to the start,
//   then to the end, and find where each block overlaps
//   -
//
// }

export function getSumFromBlockNums(blockNums: number[]) {
  //   Get number of squares the blocks must take up
  //   blockNums = [6, 3] => 6 + 3 + 1 = 10
  return (
    blockNums.reduce((a: number, b: number) => a + b, 0) + blockNums.length - 1
  )
}

export function getBlockNums(rawNums: number[]) {
  // Takes the raw row, and returns the block nums
  // rawNums = [1,1,1,0,1] => [3, 1]
  let out: number[] = []
  let currentBlockLen = 0
  for (let i = 0; i < rawNums.length; i++) {
    if (rawNums[i] == 0) {
      if (currentBlockLen > 0) {
        out.push(currentBlockLen)
        currentBlockLen = 0
      }
    } else if (rawNums[i] == 1) {
      currentBlockLen++
    }
  }
  if (currentBlockLen > 0) {
    out.push(currentBlockLen)
  }
  return out
}

export function getPossiblePermutations(blockNums: number[], size: number) {
  // Recursively find block permutations
  if (blockNums.length == 0) return []

  let output: number[][] = []
  const remainingLen = size - getSumFromBlockNums(blockNums.slice(1)) - 1
  const maxIndex = remainingLen - blockNums[0]

  for (let i = 0; i <= maxIndex; i++) {
    let perm: number[] = new Array(i).fill(0)
    perm = perm.concat(new Array(blockNums[0]).fill(1))

    if (blockNums.length != 1) {
      perm = perm.concat([0])
      getPossiblePermutations(blockNums.slice(1), size - perm.length).forEach(
        (remaining: number[]) => {
          output.push(perm.concat(remaining))
        }
      )
    } else {
      output.push(perm.concat(new Array(size - perm.length).fill(0)))
    }
  }

  return output
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

  console.log(possiblePermutations)

  // returns a list of lists of indexes for which values are guaranteed 0 or 1.
  // console.log(getIndexesOfMatchingColumns(possiblePermutations, size))
  return getIndexesOfMatchingColumns(possiblePermutations, size)
}

// export function getPossibleIndexes(
//   curState: number[],
//   blockNums: number[],
//   size: number
// ) {
//   // First generates all possible row permutations with the given block nums
//   let possiblePermutations: number[][] = []

//   // then compares this with curState
//   // compare each value the possible row permutations that are left
//   // if the value is the same for all states, return that index as a solution
// }
