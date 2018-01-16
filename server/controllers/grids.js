const _row = 30
const _col = 20

module.exports = async (ctx, next) => {
  const grids = newMap()
  ctx.state.data = grids
}

function initGrids() {
  const grids = []
  for (let i = 0; i < _row; i++) {
    const rows = []
    for (let j = 0; j < _col; j++) {
      const grid = {
        key: i + ',' + j,
        row: i,
        col: j,
        top: 1,
        bottom: 1,
        left: 1,
        right: 1
      }
      rows.push(grid)
    }
    grids.push(rows)
  }
  return grids
}

function newMap() {
  const grids = initGrids()
  const beginRow = Math.floor(Math.random() * _row)
  const beginCol = Math.floor(Math.random() * _col)
  let endRow = null
  let endCol = null
  do {
    endRow = Math.floor(Math.random() * _row)
    endCol = Math.floor(Math.random() * _col)
  } while (beginRow === endRow && beginCol === endCol)
  grids[beginRow][beginCol].begin = 1
  grids[endRow][endCol].end = 1
  generateMap_1(grids, grids[beginRow][beginCol], true)
  return grids
}

let map1Stack = []

function generateMap_1(grids, currentGrid, init) {
  if (init) {
    map1Stack = []
  }
  currentGrid.map1Visit = 1
  const sideList = map1SideList(grids, currentGrid)
  if (sideList.length > 0) {
    const nextGrid = sideList[Math.floor(Math.random() * sideList.length)]
    map1Stack.push(currentGrid)
    if (nextGrid.row < currentGrid.row) {
      nextGrid.bottom = 0
      currentGrid.top = 0
    }
    if (nextGrid.col < currentGrid.col) {
      nextGrid.right = 0
      currentGrid.left = 0
    }
    if (nextGrid.col > currentGrid.col) {
      nextGrid.left = 0
      currentGrid.right = 0
    }
    if (nextGrid.row > currentGrid.row) {
      nextGrid.top = 0
      currentGrid.bottom = 0
    }
    generateMap_1(grids, nextGrid, false)
  } else {
    if (map1Stack.length > 0) {
      generateMap_1(grids, map1Stack.pop(), false)
    } else {
      return
    }
  }
}

function map1Remain(grids) {
  for (let i = 0; i < grids.length; i++) {
    for (let j = 0; j < grids[i].length; j++) {
      if (!grids[i][j].map1Visit) {
        return grids[i][j]
      }
    }
  }
  return null
}

function map1SideList(grids, grid) {
  const sideList = []
  if (grid.row > 0 && !grids[grid.row - 1][grid.col].map1Visit) {
    sideList.push(grids[grid.row - 1][grid.col])
  }
  if (grid.col > 0 && !grids[grid.row][grid.col - 1].map1Visit) {
    sideList.push(grids[grid.row][grid.col - 1])
  }
  if (grid.col < _col - 1 && !grids[grid.row][grid.col + 1].map1Visit) {
    sideList.push(grids[grid.row][grid.col + 1])
  }
  if (grid.row < _row - 1 && !grids[grid.row + 1][grid.col].map1Visit) {
    sideList.push(grids[grid.row + 1][grid.col])
  }
  return sideList
}
