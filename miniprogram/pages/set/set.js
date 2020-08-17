// pages/set/set.js
const db = wx.cloud.database();
const userInfo = db.collection('userInfo')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSuccess: false,
    errMsg: ''
  },
  changeAvatar() {
    let id = app.globalData.id
    wx.chooseImage({
      count: 1,
      success: (res) => {
        // console.log(res.tempFilePaths[0])
        wx.cloud.uploadFile({
          cloudPath: `${Math.floor(Math.random()*1000000)}.png`,
          filePath: res.tempFilePaths[0]
        }).then(res => {
          // console.log(res.fileID)
          userInfo.doc(id).update({
            data: {
              avatarUrl: res.fileID
            }
          }).then(res => {
            // console.log(res)
            this.setData({
              isSuccess: true,
              errMsg: '修改成功'
            })
            setTimeout(() => {
              this.setData({
                isSuccess: false,
              })
            }, 800);
          })
        })
      },
    })
  },
  changeName() {
    wx.navigateTo({
      url: '../changeName/changeName',
    })
  },
  changePassword() {
    let wxLogin = app.globalData.wxLogin;
    if(wxLogin) {
      this.setData({
        isSuccess: true,
        errMsg: '微信登录无密码'
      })
      setTimeout(() => {
        this.setData({
          isSuccess: false
        })
      }, 1000);
    } else {
      wx.navigateTo({
        url: '../changePassword/changePassword',
      })
    }
  },
  exitLogin() {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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