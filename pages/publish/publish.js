//index.js
//获取应用实例
var app = getApp()
const AV = require('../../utils/av-weapp.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    tempFilePaths : ""
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../user/user'
    })
  },

  upLoadImg : function(){
    var _this = this;  
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function(res) {
        if(res.tapIndex == 0){
          _this.setData({  
              tempFilePaths: res.tempFilePaths
            })
          wx.previewImage({
            current: tempFilePaths, // 当前显示图片的http链接
            urls: tempFilePaths // 需要预览的图片http链接列表
          })
          wx.chooseImage({
            count: 8, // 默认9  
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
            success: function (res) {  
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
              _this.setData({  
                tempFilePaths: res.tempFilePaths
              })  
            var tempFilePath = res.tempFilePaths[0];  
              new AV.File('file-name', {  
                blob: {
                  uri: tempFilePath,
                },
              }).save().then(  
                file => console.log(file.url())  
                ).catch(console.error);  
            }  
          })  
        }else if(res.tapIndex == 1){
           wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: 'camera',
            success: function (res) {
              var tempFilePaths = res.tempFilePaths
              console.log(res)
            }
          })
        }else{
          console.log("========>2")
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    

    
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
