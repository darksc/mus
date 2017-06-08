//index.js
var app = getApp()

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
    }],
    // 列表数据
    lists: []
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady () {
    this.getLocation()
    this.setControls()
    this.getShops()
  },
  // 滚动到底部/右边，会触发 scrolltolower 事件
  scrolltolower (e) {
    console.log(e)
  },
  // 获取商家数据
  getShops(params) {
    var _this = this
    wx.request({
      url: app.globalData.url + '/shops',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          _this.setData({
            lists: res.data.data
          })
        }
      }
    })
  },
  // 获取当前坐标点
  getLocation () {
    let _this = this
    wx.getLocation({
      type: 'gcj02 ',
      success(res) {
        _this.setLocation(res)
      }
    })
  },
  // 标记商家坐标点
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
          id: 'loactionClick',
          position: {
            top: height * .4 - 58,
            left: 10,
            width: 48,
            height: 48
          },
          iconPath: '/resources/Radar-48.png',
          clickable: true
        }
      ]
    })
  },
  // 控件点击事件处理
  controltap (e) {
    this[e.controlId]()
  },
  // 定位到我的位置
  loactionClick () {
    let _this = this
    let map = wx.createMapContext('map')
    map.moveToLocation()
    // 重新加载附近点
    wx.getLocation({
      success: function (res) {
        _this.setLocation(res)
      }
    })
  }
})
