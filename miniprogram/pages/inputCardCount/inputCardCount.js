// miniprogram/pages/inputCardCount/inputCardCount.js
const db = wx.cloud.database();
const userInfo = db.collection('userInfo');
const _ = db.command;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    balance: 0,
    point: 0,
    day: '',        // 判断是月卡还是周卡
    isShow: false,
    isSuccess: false,
    count: 0,
    errMsgs: [
      '余额不足',
      '积分不足',
      '购买成功'
    ],
    errMsg: ''
  },
  getCount(e) {
    console.log(e.detail.value)
    let count = parseInt(e.detail.value);
    if(typeof(count) == 'number' && count%1 === 0) {
      this.setData({
        count: count
      })
    } else {
      this.setData({
        isShow: true
      })
    }
  },
  balanceBuy() {
    let id = this.data.id;
    let count = this.data.count;
    let balance = this.data.balance;
    let day = this.data.day;
    if (count !== 0) {
      if (day === 'month') {
        let newBalance = balance - count * 15;
        if(newBalance >= 0) {
          userInfo.doc(id).update({
            data: {
              balance: newBalance,
              monthCard: _.inc(count)
            }
          })
          let errMsg = this.data.errMsgs[2];
          this.setData({
            isSuccess: true,
            errMsg: errMsg
          })
          setTimeout(() => { 
            wx.navigateBack({
              delta: 1,
              complete: (res) => {},
            })
          }, 800);
        } else {
          let errMsg = this.data.errMsgs[0];
          this.setData({
            isSuccess: true,
            errMsg: errMsg
          })
          setTimeout(() => {
            this.setData({
              isSuccess: false
            })   
          }, 800);
        }
      } else if (day === 'week') {
        // console.log('asdfa')
        let newBalance = balance - count * 5;
        if(newBalance >= 0) {
          userInfo.doc(id).update({
            data: {
              balance: newBalance,
              weekCard: _.inc(count)
            }
          })
          let errMsg = this.data.errMsgs[2];
          this.setData({
            isSuccess: true,
            errMsg: errMsg
          })
          setTimeout(() => { 
            wx.navigateBack({
              delta: 1,
              complete: (res) => {},
            })
          }, 800);
        } else {
          let errMsg = this.data.errMsgs[0];
          this.setData({
            isSuccess: true,
            errMsg: errMsg
          })
          setTimeout(() => {
            this.setData({
              isSuccess: false
            })   
          }, 800);
        }
      }
    } else {
      return
    }
  },
  pointBuy() {
    let id = this.data.id;
    let count = this.data.count;
    let point = this.data.point;
    let day = this.data.day;
    if (count !== 0) {
      if (day === 'month') {
        let newpoint = point - count * 30;
        if(newpoint >= 0) {
          userInfo.doc(id).update({
            data: {
              point: newpoint,
              monthCard: _.inc(count)
            }
          })
          let errMsg = this.data.errMsgs[2];
          this.setData({
            isSuccess: true,
            errMsg: errMsg
          })
          setTimeout(() => { 
            wx.navigateBack({
              delta: 1,
              complete: (res) => {},
            })
          }, 800);
        } else {
          let errMsg = this.data.errMsgs[1];
          this.setData({
            isSuccess: true,
            errMsg: errMsg
          })
          setTimeout(() => {
            this.setData({
              isSuccess: false
            })   
          }, 800);
        }
      } else if (day === 'week') {
        console.log('asdfa')
        let newpoint = point - count * 10;
        if(newpoint >= 0) {
          userInfo.doc(id).update({
            data: {
              point: newpoint,
              weekCard: _.inc(count)
            }
          })
          let errMsg = this.data.errMsgs[2];
          this.setData({
            isSuccess: true,
            errMsg: errMsg
          })
          setTimeout(() => { 
            wx.navigateBack({
              delta: 1,
              complete: (res) => {},
            })
          }, 800);
        } else {
          let errMsg = this.data.errMsgs[1];
          this.setData({
            isSuccess: true,
            errMsg: errMsg
          })
          setTimeout(() => {
            this.setData({
              isSuccess: false
            })   
          }, 800);
        }
      }
    } else {
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let day = options.day;
    this.setData({
      day: day
    })
    let id = app.globalData.id;
    userInfo.doc(id).get().then(res => {
      let balance = res.data.balance;
      let point = res.data.point;
      this.setData({
        id: id,
        balance: balance,
        point: point
      })
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