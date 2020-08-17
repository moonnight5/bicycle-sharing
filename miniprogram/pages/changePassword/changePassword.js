// pages/changePassword/changePassword.js
const db = wx.cloud.database();
const userInfo = db.collection('userInfo');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSuccess: false,
    isShow: false,
    errMsgs: [
      '原来密码不正确',
      '两次新密码不匹配',
      '密码长度至少为6位'
    ],
    errMsg: ''
  },
  changePassword(e) {
    // console.log(e.detail.value)
    let id = app.globalData.id;
    let oldPwd = e.detail.value.oldPwd;
    let newPwd = e.detail.value.newPwd;
    let sureNewPwd = e.detail.value.sureNewPwd;
    userInfo.doc(id).get().then(res => {
      // console.log(res.data.password);
      let password = res.data.password;
      let errMsgs = this.data.errMsgs;
      if (oldPwd !== password) {
        this.setData({
          isShow: true,
          errMsg: errMsgs[0]
        })
      } else {
        if (newPwd.length < 6) {
          this.setData({
            isShow: true,
            errMsg: errMsgs[2]
          }) 
        } else {
          if(newPwd === sureNewPwd) {
            userInfo.doc(id).update({
              data: {
                password: newPwd
              }
            }).then(res => {
              this.setData({
                isSuccess: true
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1,
                  complete: (res) => {
                  },
                })
              }, 800);
            })
          } else {
            this.setData({
              isShow: true,
              errMsg: errMsgs[1]
            })
          }
        }
      }
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