
function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
      array.push(dimensions.length === 1 ? 0 : zeros(dimensions.slice(1)));
  }

  return array;
}

function getRandomPosition(rows, columns) {
  const x = Math.floor(Math.random() * rows);
  const y = Math.floor(Math.random() * columns);
  return [x, y]
}

function findNearBombs(f, x, y) {
  let counter = 0
  if (f[x-1]){
    if (f[x-1][y] && f[x-1][y].isBomb) counter++
    if (f[x-1][y-1] && f[x-1][y-1].isBomb) counter++
    if (f[x-1][y+1] && f[x-1][y+1].isBomb) counter++
  }

  if (f[x+1]) {
    if (f[x+1][y] && f[x+1][y].isBomb) counter++
    if (f[x+1][y-1] && f[x+1][y-1].isBomb) counter++
    if (f[x+1][y+1] && f[x+1][y+1].isBomb) counter++
  }

  // if (f[x][y] && f[x+1][y].isBomb) counter++
  if (f[x][y-1] && f[x][y-1].isBomb) counter++
  if (f[x][y+1] && f[x][y+1].isBomb) counter++


  return counter
}
export function generateField({ rows, columns, bombs }) {

  const Field = zeros([rows, columns]).map((row, r) => {
    return row.map((col, c) => {
      return { revealed: false }
    })
  })

  let availableBombs = bombs
  while (availableBombs > 0) {
    const [x,y] = getRandomPosition(rows,columns)
    if (!Field[x][y].isBomb) {
      Field[x][y].isBomb = true
      availableBombs--
    }
  }

  const Numbered = Field.map((row, x) => {
    return row.map((cell, y) => {
      if (cell.isBomb) return cell;
      const nearBombs = findNearBombs(Field,x,y)
      return { ...cell, nearBombs }
    })
  })

  return Numbered
}



function revealDirection (f,x,y, hor, vert) {
  // console.log(x,y,hor,vert)
  if (f[x+hor]) {
    if (f[x+hor][y+vert]){
      if (f[x+hor][y+vert].nearBombs === 0 && f[x+hor][y+vert].revealed === false) {
        f[x+hor][y+vert].revealed = true
        return revealNear(f, x+hor, y+vert)
      } else if (!f[x+hor][y+vert].isBomb) {
        f[x+hor][y+vert].revealed = true
      }
    }
  }
  return f
}
export function revealNear(f, x, y) {
  // * reveal right
  f = revealDirection(f,x,y, 0, 1)
  // * reveal left
  f = revealDirection(f,x,y, 0, -1)
  // * reveal top
  f = revealDirection(f,x,y, -1, 0)
  // * reveal bottom
  f = revealDirection(f,x,y, 1, 0)
  // * reveal diagonial top-right
  f = revealDirection(f,x,y, -1, 1)
  // * reveal diagonial bottom-right
  f = revealDirection(f,x,y, 1, 1)
  // * reveal diagonial top-left
  f = revealDirection(f,x,y, -1, -1)
  // * reveal diagonial bottom-left
  f = revealDirection(f,x,y, 1, -1)
  return f
}

export function checkIfGameWon(f, bombs) {
  let unRevealead = 0;
  f.forEach((row) => {
    row.forEach(cell => {
      if (!cell.revealed) unRevealead++
    })
  })

  return unRevealead === bombs
}