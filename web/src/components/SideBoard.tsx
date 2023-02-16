import React, { useEffect } from 'react'

interface Props {
  onChangeHorizontalBarSums: (val: string[]) => void
  onChangeVerticalBarSums: (val: string[]) => void
  mode: string
  boardSolution: number[][]
  horizontalBarSums: string[]
  verticalBarSums: string[]
}

export const SideBoard: React.FC<Props> = ({
  onChangeHorizontalBarSums,
  onChangeVerticalBarSums,
  mode,
  boardSolution,
  horizontalBarSums,
  verticalBarSums,
}) => {
  const flipArray = (arr: number[][]) => {
    let res: number[][] = []
    for (let i = 0; i < arr.length; i++) {
      let newRow: number[] = []
      for (let j = 0; j < arr.length; j++) {
        newRow.push(arr[j][i])
      }
      res.push(newRow)
    }

    return res
  }

  const getString = (arr: number[]) => {
    let res = ''
    let curLen = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 1) {
        curLen += 1
      } else if (curLen !== 0) {
        res += ' ' + curLen
        curLen = 0
      }
    }
    if (curLen > 0) {
      res += ' ' + curLen
    }

    if (res === '') {
      return '0'
    }

    return res.slice(1)
  }

  useEffect(() => {
    if (
      onChangeHorizontalBarSums === undefined &&
      onChangeVerticalBarSums === undefined
    )
      return

    if (mode === 'vBars') {
      let vertical: string[] = []
      flipArray(boardSolution).forEach(arr => {
        vertical.push(getString(arr))
      })

      onChangeVerticalBarSums(vertical)
    } else if (mode === 'hBars') {
      let horizontal: string[] = []
      boardSolution.forEach(arr => {
        horizontal.push(getString(arr))
      })

      onChangeHorizontalBarSums(horizontal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardSolution])

  if (mode === 'vBars') {
    return (
      <div className='sideBoard vBars'>
        {verticalBarSums.map((str, i) => {
          return (
            <div key={i} className='sideSquare'>
              {str.split(' ').join('')}
            </div>
          )
        })}
      </div>
    )
  } else {
    return (
      <div className='sideBoard hBars'>
        {horizontalBarSums.map((str, i) => {
          return (
            <div key={i} className='sideSquare'>
              {str}
            </div>
          )
        })}
      </div>
    )
  }
}
