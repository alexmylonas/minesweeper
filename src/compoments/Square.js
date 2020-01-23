import React from 'react'
import classnames from 'classnames'

export default function Square ({ onClick, x,y, cell }) {

  const { revealed, nearBombs, isBomb, lost } = cell
  const className = classnames('square', {
    'revealed': revealed,
    'bomb': isBomb & lost
  })
  return <div className={className} onClick={() => onClick(x,y)}>
    {revealed && nearBombs !== 0 && nearBombs}
  </div>
}