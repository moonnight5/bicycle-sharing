// pages/pay/pay.js
const db = wx.cloud.database();
const userInfo = db.collection('userInfo');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0,
    balance: 0,
    gradientColor: {
      '0%': '#1251b9',
      '100%': '#1f67de'
    }
  },
  pay() {
    let id = app.globalData.id;
    let money = this.data.balance;
    userInfo.doc(id).get().then(res => {
      let balance = res.data.balance;
      if (balance - money >= 0) {
        userInfo.doc(id).update({
          data: {
            balance: balance - money
          }
        })
        wx.showToast({
          title: '支付成功',
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../index/index',
          })
        }, 500);
      } else {
        wx.showToast({
          title: '余额不足',
          icon: 'none'
        })
        setTimeout(() => {       
          wx.navigateTo({
            url: '../save/save',
          })
        }, 500);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = options.time;
    let balance = 0;
    if (time < 20) {
      balance = 2;
      this.setData({
        time,
        balance
      })
    } else {
      let n = Math.ceil((time - 20) / 30);
      balance = 2 + n
      this.setData({
        time,
        balance
      })
    } 
    // console.log(balance)
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