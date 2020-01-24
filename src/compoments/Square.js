import React from 'react'
import classnames from 'classnames'

export default function Square ({ onClick, x,y, cell, lost }) {

  const { revealed, nearBombs, isBomb } = cell
  const className = classnames('square', {
    'revealed': revealed,
    'bomb': isBomb & lost
  })
  return <div className={className} onClick={() => onClick(x,y)}>
    {revealed && nearBombs !== 0 && <span>{nearBombs}</span>}
  </div>
}