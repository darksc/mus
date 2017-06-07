//index.js
var app = getApp()
var sliderWidth = 96;

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

    tabs: ["地图", "列表"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    inputShowed: false,
    inputVal: "",

    // 列表数据
    lists: []
  },
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / _this.data.tabs.length * _this.data.activeIndex
        });
      }
    });
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady () {
    this.getLocation()
    this.setControls()

    this.getShops()
  },
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
  // 标签卡 点击事件
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
    let height = systemInfo.windowHeight - 50
    this.setData({
      controls: [
        {
          id: 'centerMarkerClick',
          position: {
            top: height - height / 2 - 48,
            left: width - width / 2 - 24,
            width: 48,
            height: 48
          },
          iconPath: '/resources/mapPin-48.png'
        },
        {
          id: 'loactionClick',
          position: {
            top: height - 78,
            left: 30,
            width: 48,
            height: 48
          },
          iconPath: '/resources/Compass-48.png',
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
  },


  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})
