const _row = 30
const _col = 20

module.exports = async (ctx, next) => {
  const { grids, beginGrid } = newMap()
  setEndGrid(grids, beginGrid)
  ctx.state.data = grids
}

//初始化网格
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

//生成新地图
function newMap() {
  const grids = initGrids()
  const beginRow = Math.floor(Math.random() * _row)
  const beginCol = Math.floor(Math.random() * _col)
  grids[beginRow][beginCol].begin = 1
  generateMap_1(grids, grids[beginRow][beginCol], true)
  return {
    grids: grids,
    beginGrid: grids[beginRow][beginCol]
  }
}

//新地图生成算法1
let map1Stack = []
function generateMap_1(grids, currentGrid, init) {
  if (init) {
    map1Stack = []
  }
  currentGrid.map1Visit = 1
  const sideList = map1SideList(grids, currentGrid) //获取周边未访问单元格
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
//地图寻路算法
function solveMap (grids, beginGrid) {
  const solvePath = []
  const pathList = []
  beginGrid.solveVisit = 1
  solvePath.push(beginGrid)
  while (solvePath.length > 0) {
    const currentGrid = solvePath[solvePath.length - 1]
    const sideList = solveSideList(grids, currentGrid)
    if (sideList.length > 0) {
      solvePath.push(sideList[0])
      sideList[0].solveVisit = 1
    } else {
      pathList.push(solvePath.concat())
      solvePath.pop()
    }
  }
  pathList.sort(function (x, y) {
    return y.length - x.length
  })
  const path = pathList[0]
  return path[path.length - 1]
}
function solveSideList (grids, grid) {
  const sideList = []
  if (grid.top === 0 && !grids[grid.row - 1][grid.col].solveVisit) {
    sideList.push(grids[grid.row - 1][grid.col])
  }
  if (grid.left === 0 && !grids[grid.row][grid.col - 1].solveVisit) {
    sideList.push(grids[grid.row][grid.col - 1])
  }
  if (grid.right === 0 && !grids[grid.row][grid.col + 1].solveVisit) {
    sideList.push(grids[grid.row][grid.col + 1])
  }
  if (grid.bottom === 0 && !grids[grid.row + 1][grid.col].solveVisit) {
    sideList.push(grids[grid.row + 1][grid.col])
  }
  return sideList
}

//设置结束点
function setEndGrid(grids, beginGrid) {
  const endGrid = solveMap(grids, beginGrid)
  grids[endGrid.row][endGrid.col].end = 1
  return grids
}
