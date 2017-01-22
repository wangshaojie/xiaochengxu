//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    userName:'',
    userPassword:'',
    id_token:'',
    responseData:'',
    boo:false
  },
  

  //验证用户名密码
  userNameInput:function(e){
      this.setData({
        userName: e.detail.value
      })
      console.log(e.detail.value)
    },
    userPasswordInput:function(e){
      this.setData({
        userPassword: e.detail.value
      })
      console.log(e.detail.value)
    },

    //转跳
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../user/user'
  //   })
  // },
  
    bindViewTap: function() {
      var that = this
      if(this.data.userName == ""){
        wx.showToast({
          title: '请请输入账号',
          icon: 'success',
          duration: 2000
        })
      }else if(this.data.userPassword == ""){
        wx.showToast({
          title: '请输入密码',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.request({
        url: 'http://221.174.21.241/index.php/login/index',
        data: {
          username: this.data.userName,
          password: this.data.userPassword
        }, 
        header: {
            "Content-Type": "application/x-www-form-urlencoded"  
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
        if(res.data.status == 0 ){
            console.log(res)
        }else{
            console.log("1")
        }
          
          wx.navigateTo({
            url: '../user/user'
          })
          
        },
        fail :function(err){
          console.log(res.data);
          console.log('is failed')
        }
       
      })
    }
      
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
