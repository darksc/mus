// new.js
var bmap = require('../../libs/bmap-wx.min.js')
var wxMarkerData = []
var BMap = new bmap.BMapWX({
  ak: 'cYKpNeGb1GtNkgr7Uuqlvm5pDVoXmxPp'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    nexttime: '',
    markers: [],
    latitude: '',
    longitude: '',
    controls: [],
    rgcData: '',
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前坐标
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 加载地图控件
    this.setControls()
  },

  // 加载百度地图
  loadBMap(latitude, longitude) {
    var _this = this
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      location: latitude + ',' + longitude,
      success: function (data) {
        wxMarkerData = data.wxMarkerData
        _this.setData({
          markers: wxMarkerData
        })
      },
      fail: function (data) {
        console.log('检索失败: ' + data)
      },
      iconPath: '../../resources/Rating-48.png',
      iconTapPath: '../../resources/Rating-48.png',
      width: 28,
      height: 28
    })
  },
  // marker 点击事件
  makertap: function (e) {
    var _this = this
    var id = e.markerId
    _this.showSearchInfo(wxMarkerData, id)
  }, 

  // // 获得当前坐标地址信息
  showSearchInfo: function (data, i) {
    var _this = this
    _this.setData({
      rgcData: data[i].address + data[i].desc
    })
  },

  // 获取当前坐标点
  getLocation() {
    var _this = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        _this.loadBMap(res.latitude, res.longitude)
      },
      fail: function (res) {
        console.log('定位失败: ' + JSON.stringify(res))
      },
      complete: function (res) {
        console.log('定位完成: ' + JSON.stringify(res))
      }
    })
  },
  // 时间控件
  bindTimeChange (e) {
    this.setData({
      [e.currentTarget.dataset.type]: e.detail.value
    })
  },

  // 图片上传
  uploadImg () {
    var _this = this
    wx.chooseImage({
      count: '5',
      sizeType: 'compressed',
      success: function (res) {
        _this.setData({
          images: res.tempFiles
        })
        console.log(res.tempFiles)
      }
    })
  },
  // 配置地图控件
  setControls() {
    var systemInfo = wx.getSystemInfoSync()
    var width = systemInfo.windowWidth
    var height = systemInfo.windowHeight
    this.setData({
      controls: [
        {
          id: 'loactionClick',
          position: {
            top: height * .4 - 38,
            left: 10,
            width: 28,
            height: 28
          },
          iconPath: '/resources/location.png',
          clickable: true
        }
      ]
    })
  },
  // 控件点击事件处理
  controltap(e) {
    this[e.controlId]()
  },
  // 定位到我的位置
  loactionClick() {
    var map = wx.createMapContext('map')
    if (this.latitude == '' || this.longitude == '') {
      this.getLocation()
    }
    map.moveToLocation()
    
  }
})