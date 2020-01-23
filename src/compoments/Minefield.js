import React, { useState } from 'react'

import { generateField, revealNear } from '../utils/MinefieldUtils'

import Square from './Square'
export default function Minefield({ rows = 25, columns = 50, bombs = 5 }) {

  // TODO check field can have that many bombs

  // const Field = 
  const [Field, setField] = useState(generateField({ rows, columns, bombs }))

  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)
  const [secondChance, setSecondChance] = useState(false)
  const squareClick = (x,y) => {
    if (won || lost) return
    console.log('x,y',x,y)
    const cell = Field[x][y]
    console.log('Field:', cell)
    if (cell.isBomb) {
      if (secondChance) {
        alert("BOOOM! You lost")
        setLost(true)
      } else {
        alert("Careful! That's a bomb! You have one more chance")
        setSecondChance(true)
      }

      return;
    }
    Field[x][y].revealed = true
    let newField = Field
    if (Field[x][y].nearBombs === 0) {
      console.log('Trying to reveal near')
      newField = revealNear(Field, x, y)
    }

    setField([...newField])
    // checkIfGameWon()
    // if (Field)

  }

  console.log('render?')
  return <div className="minefield">
    {Field.map((row, x) => {

      return <div className="row" key={x}>
        {row.map((cell, y) => <Square key={`${x}${y}`} x={x} y={y} cell={cell} lost={lost} onClick={squareClick}/>)}
        </div>
    })}
    {/* <Square/> */}
  </div>
}