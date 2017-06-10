// new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getLocation()
  },

  // 获取当前坐标点
  getLocation() {
    let _this = this
    wx.getLocation({
      type: 'gcj02 ',
      success(res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  }
})