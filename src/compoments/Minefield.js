import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { generateField, revealNear, checkIfGameWon } from '../utils/MinefieldUtils'

import Controls from './Controls'
import Square from './Square'

export default function Minefield() {

  // TODO check field can have that many bombs
  const [rows, setRows] = useState(10)
  const [columns, setCols] = useState(25)
  const [bombs, setBombs] = useState(50)
  // const Field = 
  const [Field, setField] = useState(generateField({ rows, columns, bombs }))

  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)
  const [secondChance, setSecondChance] = useState(false)

  const squareClick = (x,y) => {
    if (won || lost) return
    const cell = Field[x][y]
    if (cell.isBomb) {
      if (secondChance) {
        toast.error('BOOOM! You lost', {
          position: "top-center",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setLost(true)
      } else {
        toast.warn("Careful! That's a bomb! You have one more chance", {
          position: "top-center",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
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
    console.log('bombs', bombs)
    if (checkIfGameWon(newField, bombs)) {
      setWon(true)
      // toast('Congrats, you WON! Kudos')
      toast.success('Congrats, you WON! Kudos', {
        position: "top-center",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
    // if (Field)

  }
  
  function resetClick() {
    setWon(false)
    setLost(false)
    setSecondChance(false)
    setField(generateField({ rows, columns, bombs }))
  }

  function setGame(rows, columns, bombs) {
    setWon(false)
    setLost(false)
    setSecondChance(false)
    setRows(rows)
    setCols(columns)
    setBombs(bombs)
    setField(generateField({ rows, columns, bombs }))
  }

  return <div className="minefield">
    <Controls rows={rows} bombs={bombs} columns={columns} resetClick={resetClick} setGame={setGame}/>
    {Field.map((row, x) => {

      return <div className="row" key={x}>
        {row.map((cell, y) => <Square key={`${x}${y}`} x={x} y={y} cell={cell} lost={lost} onClick={squareClick}/>)}
        </div>
    })}
    {/* <ToastContainer position={toast.POSITION.TOP_RIGHT}/> */}
    <ToastContainer/>
  </div>
}