// miniprogram/pages/index/index.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk');
var qqmapsdk = new QQMapWX({
  key: 'XSNBZ-DL4KJ-B5PFO-FUTZG-5DES7-DTFGK'
});
const db = wx.cloud.database();
const _ = db.command;
const userInfo = db.collection('userInfo');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    avatarUrl: '',
    name: '',
    balance: 0.0,
    point: 0,
    recode: 0,
    value: '',
    latitude: 0,
    longitude: 0,
    isShow: false,
    overlay: false,
    show: false,
    suggest: [],
    backfill: '',
    mks: [],
    markers: [],
    polyline: []
  },


  getValue(e) {
    // console.log(e.detail.value)
    let value = e.detail.value;
    if(value.length > 0) {
      this.setData({
        value: value,
        isShow: true
      })
    }  else {
      this.setData({
        isShow: false
      })
    }
    let latitude = this.data.latitude
    let longitude = this.data.longitude
    qqmapsdk.getSuggestion({
      keyword: value,
      location : latitude + ',' + longitude,
      success: res => {
        // console.log(res.data)
        let suggest = [];
        for (var i = 0; i < res.data.length; i++) {
          suggest.push({ // 获取返回结果，放到suggest数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        // let suggest = res.data;
        this.setData({
          suggest: suggest
        })
      },
      // complete:res => {
      //   console.log(res)
      // }
    })
  },
  backfill(e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggest.length;i++){
      if(i == id){
        this.setData({
          value: this.data.suggest[i].title
        });
      }  
    }
  },
  toSearch() {
    let value = this.data.value;
    let startLatitude = this.data.latitude;
    let startLongitude = this.data.longitude;
    this.setData({
      isShow: false
    })
    
    qqmapsdk.search({
      keyword: value,
      // location: latitude + ',' + longitude,
      page_size: 1,
      complete: res => {
        let mks = [];
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/image/mark.png", //图标路径
            width: 20,
            height: 20
          })
        }
        // console.log(mks)
        this.setData({
          markers: mks
        })
        // 路线规划
        let startLatitude = this.data.latitude;
        let startLongitude = this.data.longitude;
        let endLatitude = mks[0].latitude;
        let endLongitude = mks[0].longitude;
        // console.log(startLatitude,startLongitude,endLatitude,endLongitude)
        qqmapsdk.direction({
          mode: 'bicycling',
          from: {
            latitude: startLatitude,
            longitude: startLongitude
          },
          to: {
            latitude: endLatitude,
            longitude: endLongitude
          },
          success: res => {
            // console.log(res.result.routes[0].polyline)
            let coors = res.result.routes[0].polyline;
            for (let i = 2; i < coors.length ; i++)
            {coors[i] = coors[i-2] + coors[i]/1000000}
            let b=[]; 
            for(let i=0; i< coors.length; i=i+2) { 
              b[i/2]={latitude: coors[i],longitude:coors[i+1] }; 
            }
            this.setData({
              polyline: [{points: b, color:"#74C3CA", width:4, dottedLine:false }], 
            })
          },
        })
      }
    })

  },


  getUserInfo: function() {
    let id = app.globalData.id;
    this.setData({
      id: id
    });
    userInfo.doc(id).get().then(res => {
     //  console.log(res)
     let userInfo = res.data;
     // console.log(userInfo)
     let name = userInfo.name;
     let avatarUrl = userInfo.avatarUrl;
     let balance = userInfo.balance;
     let point = userInfo.point;
     let recode = userInfo.recode;
     let card = userInfo.card;
     let reg = /^ *$/;
     let nResult = reg.test(name);
     // let aResult = reg.test(avatar);
     this.setData({
       point: point,
       balance: balance,
       recode: recode,
       avatarUrl: avatarUrl
     })
     // if(wxLogin) {
       if(!nResult) {
         this.setData({
           name: name
         })
       } else if (nResult) {
         this.setData({
           name: userInfo.userName
         })
       }
       // if(!aResult) {
       //   this.setData({
       //     avatar: avatar
       //   })
       // } else if(aResult) {
       //   this.setData({
       //     avatar: userInfo.avatarUrl
       //   })
       // }
     // } else if (!wxLogin) {
       // if(!nResult) {
       //   this.setData({
       //     name: name
       //   })
       // } else if(nResult) {
       //   this.setData({
       //     name: userInfo.userName
       //   })
       // }
       // if(!aResult) {
       //   this.setData({
       //     avatar: avatar
       //   })
       // } else if(aResult) {
       //   this.setData({
       //     avatar: userInfo.avatarUrl
       //   })
       // }
     // }
    })
  },


  showContent() {
    this.setData({
      show: true
    })
  },
  hideContent() {
    this.setData({
      show: false
    })
  },


  scan() {
    wx.scanCode({
      complete: (res) => {},
      fail: (res) => {},
      scanType: ['barCode', 'qrCode'],
      success: (result) => {
        // console.log(result)
        let path = result.path
        wx.navigateTo({
          url: path,
        })
      },
    })
  },
  toSet() {
    wx.navigateTo({
      url: `../../pages/set/set`,
    })
  },
  toBalance() {
    wx.navigateTo({
      url: '../balance/balance',
    })
  },
  toPoint() {
    wx.navigateTo({
      url: '../point/point',
    })
  },
  toCard() {
    wx.navigateTo({
      url: '../buyCard/buyCard',
    })
  },
  toRecode() {
    wx.navigateTo({
      url: '../recode/recode',
    })
  },


  
  
  generateMarkers: function(res) {
    let ran = Math.ceil(Math.random() * 20);
    let markers = [];
    for (let i = 0; i < ran; i++) {
      let marker = {
        id: i,
        title: '去这里',
        iconPath: '/image/bicycle.png',
        width: 32,
        height: 20
      }
      let sign_a = Math.random();
      let sign_b = Math.random();
      let a = (Math.ceil(Math.random() * 99)) * 0.00002;
      let b = (Math.ceil(Math.random() * 99)) * 0.00002;
      marker.latitude = sign_a > 0.5 ? res.latitude + a : res.latitude - a;
      marker.longitude = sign_b > 0.5 ? res.longitude + b : res.longitude - b;
      markers.push(marker);
    }
    this.setData({
      markers
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
    this.mapCtx = wx.createMapContext('myMap');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let id = app.globalData.id;
    // userInfo.doc(id).get().then(res => {
    //   this.setData({
    //     // name: res.data.name,
    //     avatarUrl: res.data.avatarUrl
    //   })
    // })
     // 获取坐标
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
    this.getUserInfo();
    setTimeout(() => {
      this.mapCtx.getCenterLocation({
        success: (res) => {
          this.generateMarkers(res);
        }
      })
    },1000)
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      // console.log(ops.target)
    }
    return {
      title: 'bicycling-sharing',
      path: 'pages/login/login',  // 路径，传递参数到指定页面。
      // imageUrl:'../../imgs/xx.png', // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
 
  }
})