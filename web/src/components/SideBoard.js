import React from 'react'

const SideBoard = props => {
  const flipArray = arr => {
    let res = []
    for (let i = 0; i < arr.length; i++) {
      let newRow = []
      for (let j = 0; j < arr.length; j++) {
        newRow.push(arr[j][i])
      }
      res.push(newRow)
    }

    return res
  }

  const getString = arr => {
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

    return res.slice(1)
  }

  if (props.mode === 'vBars') {
    return (
      <div className='sideBoard vBars'>
        {flipArray(props.board_solution).map((arr, i) => {
          return (
            <div key={i} className='sideSquare'>
              {getString(arr).split(' ').join('')}
            </div>
          )
        })}
      </div>
    )
  } else {
    return (
      <div className='sideBoard hBars'>
        {props.board_solution.map((arr, i) => {
          return (
            <div key={i} className='sideSquare'>
              {getString(arr)}
            </div>
          )
        })}
      </div>
    )
  }
}

export default SideBoard
