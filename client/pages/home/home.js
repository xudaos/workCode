var config = require('../../config')
// pages/home/home.js
Page({
  data: {
    grids: null,
    mapWidth: 0,
    mapHeight: 0
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
    console.log(row + ',' + col)
  },
  getGrids () {
    const self = this
    wx.request({
      url: config.service.gridsUrl,
      success (res) {
        self.setData({
          grids: res.data.data
        })
      },
      fail (res) {
        //console.log(res)
      }
    })
  },
  onLoad: function (options) {
    const self = this
    wx.createSelectorQuery().select('#home-main').boundingClientRect(function (rect) {
      self.setData({
        mapWidth: rect.width,
        mapHeight: rect.height
      })
    }).exec()
    this.getGrids()
  }
})