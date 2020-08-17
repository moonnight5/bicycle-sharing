// pages/register/register.js
const db = wx.cloud.database();
const _ = db.command;
const userInfo = db.collection("userInfo")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    password: '',
    isShow: false,
    isSuccess: false,
    errMsgs: [
      '用户名格式错误(允许字母,数字,下划线,减号)',
      '用户名已存在',
      '密码长度错误',
      '两次密码不匹配'
    ],
    errMsg: ''
  },
  getUserName(e) {
    // console.log(e.detail.value)
    let userName = e.detail.value;
    let pattern = /^[a-zA-Z0-9_-]{6,16}$/       //用户名正则，6到16位（字母，数字，下划线，减号）
    // console.log(pattern.test(userName))
    let bingo = pattern.test(userName)
    if(!bingo) {
      let errMsg = this.data.errMsgs[0]
      this.setData({
        isShow: true,
        errMsg: errMsg
      })
    } else {
      this.setData({
        isShow: false,
        userName: userName
      })
    }
  },
  getPassword(e) {
    let password = e.detail.value;
    if(password.length < 6) {
      let errMsg = this.data.errMsgs[2];
      this.setData({
        isShow: true,
        errMsg: errMsg
      })
    } else {
      this.setData({
        isShow: false,
        password: password
      })
    }
  },
  surePassword(e) {
    let surePassword = e.detail.value;
    let password = this.data.password;
    if (surePassword === password) {
      this.setData({
        isShow: false,
        password: surePassword
      })
    } else {
      let errMsg = this.data.errMsgs[3];
      this.setData({
        isShow: true,
        errMsg: errMsg,
        password: ''
      })
    }
  },
  register(res) {
    // console.log(res)
    let userName = this.data.userName;
    let password = this.data.password;
    if(userName.length > 0 && password.length > 0) {
      userInfo.where({
        userName: _.eq(userName)
      }).get().then(res => {
        if(res.data.length > 0) {
          let errMsg = this.data.errMsgs[1];
          this.setData({
            isShow: true,
            errMsg: errMsg
          })
        } else {
          userInfo.add({
            data: {
              userName: userName,
              password: password,
              name: '',
              avatarUrl: 'cloud://yun20190429-wu3as.7975-yun20190429-wu3as-1259140285/mine.png',
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
              wx.navigateTo({
                url: '../login/login',
              })
            }, 200);
          })
        }
      })
    } else {
      return
    }
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