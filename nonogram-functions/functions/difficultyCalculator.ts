export function getDifficulty(board:number[][], size:number) {
  /* 
    Strategies for finding squares.
      - Take the sum of the blocks and 1 for each space, if that sum == size,
      row is filled
          - i.e the row "6 3" in a size 10 game, 6 + 1 + 3 = 10 thus solvable
      - Take the sum of blocks + spaces, and lay the blocks aligned to the start,
      then to the end, and find where each block overlaps
      - 
    */
}

export function getSumFromBlockNums(blockNums: number[]) {
  //   Get number of squares the blocks must take up
  //   blockNums = [6, 3] => 6 + 3 + 1 = 10
  return blockNums.reduce((a:number, b:number) => a + b, 0) + blockNums.length - 1
}

export function getBlockNums(rawNum:number[]) {
  // Takes the raw row, and returns the block nums
  // rawNums = [1,1,1,0,1] => [3, 1]
}
