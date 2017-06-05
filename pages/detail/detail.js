Page({
  data: {
    title: ''
  },
  onLoad(option) {
    console.log(option.id)
    wx.showLoading({
      title: '正在加载'
    })
    this.setData({
      title: '详情页面' + option.id
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  }
})