//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    indicatorDots : true,
    autoplay : true,
    interval : 5000,
    duration : 1000,
    circular :true,
    indicatorActiveColor : '#d43d3d'
  },
  
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  itemClick : function(e) {
    // wx.showToast({
    //   title: e.currentTarget.dataset.id + "",
    //   icon: 'loading',
    //   duration: 1000
    // })
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'https://jsonplaceholder.typicode.com/photos',
      data: {
        _start : 0,
        _end : 4
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        'content-type': 'application/json'
      },
      success: function(res){
        // success
        console.log(res.data[1].url)
        that.setData({
          imgUrls : res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
    /**
     * 设置加载状态
     */
    showNavigationBarLoading: function() {
        wx.showNavigationBarLoading()
    }
})
