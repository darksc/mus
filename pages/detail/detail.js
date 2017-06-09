var app = getApp()
Page({
  data: {
    id: '',
    shop: {}
  },
  onLoad(option) {
    this.setData({
      id: option.id
    })
    this.getShop(option.id)
  },
  getShop (_id) {
    var _this = this
    wx.request({
      url: app.globalData.url + '/shop',
      data: {
        id: _id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          _this.setData({
            shop: res.data
          })
          _this.setTitle(res.data.name)
        }
      }
    })
  },
  // 设置标题
  setTitle (_title) {
    wx.setNavigationBarTitle({
      title: _title
    })
  },
  // 导航
  naviTab () {
    var _this = this
    wx.openLocation({
      latitude: _this.data.shop.latitude,
      longitude: _this.data.shop.longitude
    })
  },
  // 拨打电话
  phoneTab () {
    var _this = this
    wx.makePhoneCall({
      phoneNumber: _this.data.shop.phone,
    })
  }
})