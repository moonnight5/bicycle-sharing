// pages/lock/lock.js
const db = wx.cloud.database();
// const userInfo = db.collection('userInfo');
const recode = db.collection('recode')
var app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var qqmapsdk = new QQMapWX({
  key: 'XSNBZ-DL4KJ-B5PFO-FUTZG-5DES7-DTFGK'
});
var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    curLatitude: 0,
    curLongitude: 0,
    distance: 0,
    startTime: 0,
    time: 0,
    energy: 0,
    speed: 0
  },
  toPay() {
    let id = app.globalData.id
    // let id = 'f3db088f5e930c5b0099575a25db6b24'
    let time = this.data.time
    let speed = this.data.speed
    let energy = this.data.energy
    let distance = this.data.distance
    recode.add({
      data: {
        userId: id,
        time: time,
        speed: speed,
        energy: energy,
        distance: distance
      }
    })
    wx.navigateTo({
      url: `../pay/pay?time=${time}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let startTime = util.time(new Date());
    this.setData({
      startTime: startTime
    })
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
    wx.getLocation({
      type: 'wgs84',
      isHighAccuracy: true,
      success: res => {
        // console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })

    setInterval(() => {
      let curTime = util.time(new Date());
      let startTime = this.data.startTime;
      this.setData({
        time: curTime - startTime
      })
      // console.log(this.data.time)
      wx.getLocation({
        type: 'wgs84',
        isHighAccuracy: true,
        success: res => {
          // console.log(res)
          this.setData({
            curLatitude: res.latitude,
            curLongitude: res.longitude
          })
            // 路线规划
        let startLatitude = this.data.latitude;
        let startLongitude = this.data.longitude;
        let endLatitude = res.latitude;
        let endLongitude = res.longitude;
        // console.log(startLatitude,startLongitude,endLatitude,endLongitude)
        qqmapsdk.calculateDistance({
          mode: 'driving',
          from: {
            latitude: startLatitude,
            longitude: startLongitude
          },
          to: [{
            latitude: endLatitude,
            longitude: endLongitude
          }],
          success: res => {
            // console.log(res.result.elements[0].distance)
            // console.log(res.result.elements[0])
            this.setData({
              distance: (res.result.elements[0].distance)/1000
            })
          },
        })
        }
        
      })
      let time = this.data.time;
      let distance = this.data.distance;
      let speed = this.data.speed;
      if (time === 0) {
        speed = 0
      } else {
        speed = distance/(time * 1000)
      }
      this.setData({
        speed: speed,
        energy: 2.38 * distance
      })
    }, 30000);

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