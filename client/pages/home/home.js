var config = require('../../config')
// pages/home/home.js
Page({
  data: {
    grids: null,
    message: 'hello'
  },
  touchStart (event) {
    //console.log(event)
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
    this.getGrids()
  }
})