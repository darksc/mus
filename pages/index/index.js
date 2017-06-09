//index.js
var app = getApp()

Page({
  // 页面初始数据
  data: {
    latitude: 39.90403,
    longitude: 116.407526,
    controls: [],
    markers: [],

    inputShowed: false,
    inputVal: "",

    // 列表数据
    lists: [],
    scrollInto: 'mus-5'
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
  // 获取商家信息
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
          var _data = res.data.data
          var markers = []
          for (var i = 0; i < _data.length; i++) {
            markers.push({
              id: _data[i].id,
              latitude: _data[i].latitude,
              longitude: _data[i].longitude,
              iconPath: '/resources/Rating-48.png',
              width: 20,
              height: 20,
              anchor: { x: .5, y: .5 }
            })
          }
          _this.setLocation(markers)
        }
      }
    })
  },
  // 进入商家详情
  listTab (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.listid
    })
  },
  // 获取当前坐标点
  getLocation () {
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
  },
  // 标记商家坐标点
  setLocation (_markers) {
    this.setData({
      markers: _markers
    })
    
  },
  // 地区变化事件处理
  regionchange (e) {
  },
  // 标记点点击事件处理
  markertap (e) {
    this.setData({
      scrollInto: e.markerId
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
    let map = wx.createMapContext('map')
    map.moveToLocation()
  }
})
