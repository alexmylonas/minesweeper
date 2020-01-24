import React, { useState } from 'react'


export default function Controls ({ rows, columns, bombs, resetClick, setGame }) {

  const [Rows, setRows] = useState(rows)
  const [Cols, setCols] = useState(columns)
  const [Bombs, setBombs] = useState(bombs)
  const handleChange = (event, field) => {
    if (field === 'rows') {
      setRows(event.target.value)
    } else if (field === 'cols') {
      setCols(event.target.value)
    } else if (field === 'bombs') {
      setBombs(event.target.value)
    }
  };
  return <div className='controls'>
    <div className='inputs'> 
      <div>
        <div> Rows </div>
        <input type="number" value={Rows} onChange={(ev) => handleChange(ev, 'rows')}></input> 
      </div>
      <div>
        <div> Columns </div>
        <input type="number" value={Cols} onChange={(ev) => handleChange(ev, 'cols')}></input> 
      </div>
      <div>
        <div> Bombs </div>
        <input type="number" value={Bombs} onChange={(ev) => handleChange(ev, 'bombs')}></input> 
      </div>
    </div>
    <div className="btns">
      <button onClick={() => setGame(Rows,Cols,Bombs)}>
        Set Game
      </button>
      <button onClick={() => resetClick()}>
        Reset Board
      </button>
    </div>
  </div>
}