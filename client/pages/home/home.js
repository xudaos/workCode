var config = require('../../config')
// pages/home/home.js
Page({
  data: {
    grids: null,
    beginGrid: null,
    endGrid: null,
    mapWidth: 0,
    mapHeight: 0,
    currentGrid: null
  },
  touchStartMap(event) {
    this.moveTarget(event)
  },
  touchMoveMap(event) {
    this.moveTarget(event)
  },
  moveTarget(event) {
    var row = Math.floor(event.touches[0].pageY / ((this.data.mapHeight - 2 * this.data.mapHeight / 720) / 30))
    var col = Math.floor(event.touches[0].pageX / ((this.data.mapWidth - 2 * this.data.mapWidth / 720) / 20))
    if (this.data.currentGrid.key !== (row + ',' + col)) {
      var grids = this.data.grids
      grids[row][col].visit = 1
      grids[row][col].current = 1
      this.setData({
        grids,
        currentGrid: grids[row][col]
      })
    }
  },
  getGrids () {
    var self = this
    wx.request({
      url: config.service.gridsUrl,
      success (res) {
        var grids = res.data.data.grids
        var beginGrid = res.data.data.beginGrid
        var endGrid = res.data.data.endGrid
        grids[beginGrid.row][beginGrid.col].visit = 1
        grids[beginGrid.row][beginGrid.col].current = 1
        self.setData({
          grids,
          beginGrid,
          endGrid,
          currentGrid: beginGrid
        })
      },
      fail (res) {
        //console.log(res)
      }
    })
  },
  onLoad: function (options) {
    var self = this
    wx.createSelectorQuery().select('#home-main').boundingClientRect(function (rect) {
      self.setData({
        mapWidth: rect.width,
        mapHeight: rect.height
      })
    }).exec()
    this.getGrids()
  }
})