import React, { useEffect } from 'react'

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

  useEffect(() => {
    if (
      props.on_change_horizontal_bar_sums === undefined &&
      props.on_change_vertical_bar_sums === undefined
    )
      return

    if (props.mode === 'vBars') {
      let vertical = []
      flipArray(props.board_solution).forEach(arr => {
        vertical.push(getString(arr))
      })

      props.on_change_vertical_bar_sums(vertical)
    } else if (props.mode === 'hBars') {
      let horizontal = []
      props.board_solution.forEach(arr => {
        horizontal.push(getString(arr))
      })

      props.on_change_horizontal_bar_sums(horizontal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.board_solution])

  if (props.mode === 'vBars') {
    return (
      <div className='sideBoard vBars'>
        {props.vertical_bar_sums.map((str, i) => {
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
        {props.horizontal_bar_sums.map((str, i) => {
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

export default SideBoard
