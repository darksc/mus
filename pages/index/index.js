//index.js
Page({
  // 页面初始数据
  data: {
    latitude: 39.90403,
    longitude: 116.407526,
    controls: [],
    markers: [{
      id: 0,
      latitude: 39.90403,
      longitude: 116.407526
    }]
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady () {
    this.getLocation()
    this.setControls()
  },
  // 获取当前坐标点
  getLocation () {
    let _this = this
    wx.getLocation({
      success(res) {
        _this.setLocation(res)
      }
    })
  },
  // 标记周边坐标点
  setLocation (res) {
    this.setData({
      latitude: res.latitude,
      longitude: res.longitude,
      markers: [
        {
          id: 0,
          latitude: res.latitude + 0.009,
          longitude: res.longitude - 0.008,
          iconPath: '/resources/Rating-48.png',
          width: 20,
          height: 20,
          anchor: { x: .5, y: .5 }
        },
        {
          id: 1,
          latitude: res.latitude + 0.001,
          longitude: res.longitude + 0.001,
          iconPath: '/resources/Rating-48.png',
          width: 20,
          height: 20,
          anchor: { x: .5, y: .5 }
        },
        {
          id: 2,
          latitude: res.latitude + 0.003,
          longitude: res.longitude + 0.004,
          iconPath: '/resources/Rating-48.png',
          width: 20,
          height: 20,
          anchor: { x: .5, y: .5 }
        }
      ]
    })
    
  },
  // 地区变化事件处理
  regionchange (e) {
    let _this = this
    if (e.type === 'end') {
      let map = wx.createMapContext('map')
      map.getCenterLocation({
        success: function (res) {
          _this.setLocation(res)
        }
      })
    }
  },
  // 标记点点击事件处理
  markertap (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.markerId
    })
  },
  // 配置地图控件
  setControls () {
    let systemInfo = wx.getSystemInfoSync()
    let width = systemInfo.windowWidth
    let height = systemInfo.windowHeight
    this.setData({
      controls: [
        {
          id: 'ratingClick',
          position: {
            top: height - height / 2 - 30,
            left: width - width / 2 - 15,
            width: 30,
            height: 30
          },
          iconPath: '/resources/User Location-64.png'
        }
      ]
    })
  },
  // 控件点击事件处理
  controltap (e) {
    this[e.controlId]()
  },
  // rating 控件点击事件处理
  ratingClick () {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  }
})
