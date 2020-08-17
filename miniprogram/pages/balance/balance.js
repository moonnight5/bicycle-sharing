// pages/balance/balance.js
const db = wx.cloud.database();
const userInfo = db.collection('userInfo');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 100,
    gradientColor: {
      '0%': '#1251b9',
      '100%': '#1f67de'
    }
  },
  toSave() {
    wx.navigateTo({
      url: '../save/save',
    })
  },
  toBuyCard() {
    wx.navigateTo({
      url: '../buyCard/buyCard',
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
    let id = app.globalData.id;
    userInfo.doc(id).get().then(res => {
      // console.log(res.data.balance)
      let balance = res.data.balance;
      this.setData({
        balance: balance
      })
    })
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