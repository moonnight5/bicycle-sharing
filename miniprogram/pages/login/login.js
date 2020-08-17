// pages/login/login.js
const db = wx.cloud.database();
const _ = db.command;
const userInfo = db.collection('userInfo');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    isSuccess: false
  },
  checkLocation() {
    let that = this;
    //选择位置，需要用户授权
    wx.getSetting({
     success(res) {
      if (!res.authSetting['scope.userLocation']) {
       wx.authorize({
        scope: 'scope.userLocation',
        success() {
         wx.showToast({ //这里提示失败原因
          title: '授权成功！',
          duration: 1500
         })
        },
        fail() {
         that.showSettingToast('需要授权位置信息');
        }
       })
      }
     }
    })
   },
   showSettingToast: function (e) {
    wx.showModal({
     title: '提示！',
     confirmText: '去设置',
     showCancel: false,
     content: e,
     success: function (res) {
      if (res.confirm) {
       wx.openSetting({
         complete: (res) => {
           console.log(res)
         },
       })
      }
      console.log(res)
     }
    })
   },
   getLocation() {
    this.checkLocation();
  
    // let that = this;
    wx.getLocation({
     success: function(res) {
      //  console.log(res,'-----')
      // var latitude = res.latitude
      // var longitude = res.longitude;
      // that.setData({
      //  latitude,
      //  longitude
      // })
     }
    })
   },

  // 跳转注册页面
  toRedict() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  // 登录
  login(res) {
    // console.log(res)
    let userName = res.detail.value.userName;
    let password = res.detail.value.password;
    userInfo.where({
      userName: _.eq(userName),
      password: _.eq(password)
    }).get().then(res => {
      // console.log(res)
      if(res.data.length > 0) {
        let id =res.data[0]._id;
        app.globalData.id = id;
        let wxLogin = false;
        app.globalData.wxLogin = wxLogin;
        wx.redirectTo({
          url: `../index/index?id=${id}&wxLogin=${wxLogin}`,
        })
      } else {
        this.setData({
          isShow: true
        })
      }
    })
  },
  toLogin() {
    // wx.authorize({scope: "scope.userInfo"})
    wx.getUserInfo({
      success: (res) => {
        let userName = res.userInfo.nickName;
        let avatarUrl = res.userInfo.avatarUrl;
        userInfo.where({
          userName: _.eq(userName),
          // avatarUrl: _.eq(avatarUrl)
        }).get().then(res => {
          if(res.data.length > 0) {
            let id =res.data[0]._id;
            app.globalData.id = id;
            let wxLogin = true;
            app.globalData.wxLogin = wxLogin;
            wx.navigateTo({
              url: `../index/index?id=${id}&wxLogin=${wxLogin}`,
            })
          } else {
            userInfo.add({
              data: {
                userName: userName,
                password: '',
                name: '',
                avatarUrl: avatarUrl,
                balance: 0.0,
                point: 0,
                monthCard: 0,
                weekCard: 0
              }
            }).then(res => {
              this.setData({
                isSuccess: true
              })
              setTimeout(() => {
                this.setData({
                  isSuccess: false
                })
              }, 1000);
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})