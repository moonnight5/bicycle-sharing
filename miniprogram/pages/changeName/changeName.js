// pages/changeName/changeName.js
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
    isSuccess: false,
    name: '',
    errMsgs: [
      '用户名格式错误',
      '用户名已存在'
    ],
    errMsg: ''
  },
  changeName(e) {
    // console.log(e.detail.value.name)
    let name = e.detail.value.name;
    let pattern = /^[A-Za-z0-9_\u4e00-\u9fa5]{2,16}$/;
    let bingo = pattern.test(name);
    if(!bingo) {
      let errMsg = this.data.errMsgs[0]
      this.setData({
        isShow: true,
        errMsg: errMsg
      })
    } else {
      this.setData({
        isShow: false,
        name: name
      })
    }
    let id = app.globalData.id;
    userInfo.doc(id).update({
      data: {
        name: this.data.name
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