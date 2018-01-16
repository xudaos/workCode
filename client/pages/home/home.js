// pages/home/home.js
Page({
  data: {
    grids: null,
    message: 'hello'
  },
  touchStart (event) {
    console.log(event)
  },
  newMap () {
    this.initGrids()
    const beginRow = Math.floor(Math.random() * getApp().data.row)
    const beginCol = Math.floor(Math.random() * getApp().data.col)
    let endRow = null
    let endCol = null
    do {
      endRow = Math.floor(Math.random() * getApp().data.row)
      endCol = Math.floor(Math.random() * getApp().data.col)
    } while (beginRow === endRow && beginCol === endCol)
    const grids = this.data.grids
    this.gridByRowAndCol(beginRow, beginCol).begin = 1
    this.gridByRowAndCol(endRow, endCol).end = 1
    this.generateMap_1(grids, this.gridByRowAndCol(beginRow, beginCol))
    this.setData({
      grids: grids
    })
  },
  generateMap_1 (grids, currentGrid) {
    currentGrid.map1Visit = 1
    const sideList = this.map1SideList(grids, currentGrid)
    if (sideList.length > 0) {
      const nextGrid = sideList[Math.floor(Math.random() * sideList.length)]
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
      this.generateMap_1(grids, nextGrid)
    }
  },
  map1Remain (grids) {
    for (let i = 0; i < grids.length; i++) {
      for (let j = 0; j < grids[i].length; j++) {
        if (!grids[i][j].map1Visit) {
          return grids[i][j]
        }
      }
    }
    return null
  },
  map1SideList (grids, grid) {
    const sideList = []
    if (grid.row > 0 && !grids[grid.row - 1][grid.col].map1Visit) {
      sideList.push(grids[grid.row - 1][grid.col])
    }
    if (grid.col > 0 && !grids[grid.row][grid.col - 1].map1Visit) {
      sideList.push(grids[grid.row][grid.col - 1])
    }
    if (grid.col < getApp().data.col - 1 && !grids[grid.row][grid.col + 1].map1Visit) {
      sideList.push(grids[grid.row][grid.col + 1])
    }
    if (grid.row < getApp().data.row - 1 && !grids[grid.row + 1][grid.col].map1Visit) {
      sideList.push(grids[grid.row + 1][grid.col])
    }
    return sideList
  },
  initGrids () {
    const grids = []
    for (let i = 0; i < getApp().data.row; i++) {
      const rows = []
      for (let j = 0; j < getApp().data.col; j++) {
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
    this.setData({
      grids: grids
    })
  },
  gridByRowAndCol (row, col) {
    return this.data.grids[row][col]
  },
  onLoad: function (options) {
    this.newMap()
  }
})