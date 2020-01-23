import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { generateField, revealNear, checkIfGameWon } from '../utils/MinefieldUtils'

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
        toast.error('BOOOM! You lost', {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        setLost(true)
      } else {
        toast.warn("Careful! That's a bomb! You have one more chance", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        setSecondChance(true)
      }

      return;
    }
    Field[x][y].revealed = true
    let newField = Field
    newField = revealNear(Field, x, y)

    setField([...newField])
    if (checkIfGameWon(newField, bombs)) {
      setWon(true)
      // toast('Congrats, you WON! Kudos')
      toast.success('Congrats, you WON! Kudos', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
    }
    // if (Field)

  }

  return <div className="minefield">
    {Field.map((row, x) => {

      return <div className="row" key={x}>
        {row.map((cell, y) => <Square key={`${x}${y}`} x={x} y={y} cell={cell} lost={lost} onClick={squareClick}/>)}
        </div>
    })}
    {/* <ToastContainer position={toast.POSITION.TOP_RIGHT}/> */}
    <ToastContainer/>
  </div>
}