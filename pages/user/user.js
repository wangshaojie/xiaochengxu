//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello',
    userinfo: {
      text: '用户名称'
      
    },
    userHeadImg : "1.jpg"
    
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../user/user'
    })
  },

  //图片上传上传
  upLoadImg : function(){
    var _this = this;  
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function(res) {
        if(res.tapIndex == 0){
          wx.chooseImage({  
            success: function(res) {  
              var tempFilePaths = res.tempFilePaths  
              wx.uploadFile({  
                url: 'http://221.174.21.241/index.php/Wxthread/add',
                method : 'POST',
                filePath: tempFilePaths[0],  
                name: 'file',  
                formData:{
                  'user': 'test'  
                },  
                success: function(res){  
                  var data = res.data  
                  if(res.success == 1){
                       console.log("======================")
                      //do something
                  }
                 
                }  
              })  
            }  
          })  
        }else if(res.tapIndex == 1){
           wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: 'camera',
            success: function (res) {
              var tempFilePaths = res.tempFilePaths
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
