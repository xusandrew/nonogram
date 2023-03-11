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

export function getPossibleFromBlockNums(blockNums: number[], size: number) {
  // Assume row is empty, and return a new row with guaranteed blocks

  // Create smallest row
  let smallestRow: number[] = []
  for (let blockIndex = 0; blockIndex < blockNums.length; blockIndex++) {
    if (blockIndex != 0) {
      smallestRow.push(0)
    }
    smallestRow = smallestRow.concat(new Array(blockNums[blockIndex]).fill(1))
  }

  const extraSpaces = <number[]>new Array(size - smallestRow.length).fill(0)
  const leftAlignRow = smallestRow.concat(extraSpaces)
  const rightAlignRow = extraSpaces.concat(smallestRow)

  let result: number[] = []
  for (let i = 0; i < size; i++) {
    if (leftAlignRow[i] === 1 && rightAlignRow[i] === 1) {
      result.push(1)
    } else {
      result.push(0)
    }
  }

  return result
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
