// pages/buyCard/buyCard.js
const db = wx.cloud.database();
const userInfo = db.collection('userInfo');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthCard: 0,
    weekCard: 0
  },
  inputMonthCount(options) {
    // console.log(options.currentTarget.dataset)
    let day = options.currentTarget.dataset.day;
    wx.navigateTo({
      url: `../inputCardCount/inputCardCount?day=${day}`,
    })
  },
  inputWeekCount(options) {
    let day = options.currentTarget.dataset.day;
    wx.navigateTo({
      url: `../inputCardCount/inputCardCount?day=${day}`,
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
      let monthCard = res.data.monthCard;
      let weekCard = res.data.weekCard;
      this.setData({
        monthCard: monthCard,
        weekCard: weekCard
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