// pages/lock/lock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 20,
    isComplete: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let interval = setInterval(() => {
      // width = width + 10;
      let width = this.data.width;
      width += 5;
      if (width >= 100) clearInterval(interval);
      this.setData({
        width: width
      })
    }, 100);
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
    setTimeout(() => {
      // wx.redirectTo({
      //   url: '../login/login'
      // })
      this.setData({
        isComplete: false
      })
      wx.navigateTo({
        url: '../cycling/cycling',
      })
    }, 1700);
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