// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [],
    message: 'hello'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const grids = []
    const beginI = Math.floor(Math.random() * 30)
    const beginJ = Math.floor(Math.random() * 20)
    console.log(beginI + ',' + beginJ)
    const endI = Math.floor(Math.random() * 30)
    const endJ = Math.floor(Math.random() * 20)
    console.log(endI + ',' + endJ)
    for (let i = 0; i < 30; i++) {
      const rows = []
      for (let j = 0; j < 20; j++) {
        const grid = {
          key: i + ',' + j,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
        if (i === 0) {
          grid.top = 1
        }
        if (i === 29) {
          grid.bottom = 1
        }
        if (j === 0) {
          grid.left = 1
        }
        if (j === 19) {
          grid.right = 1
        }
        rows.push(grid)
      }
      grids.push(rows)
      this.setData({
        grids: grids
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})