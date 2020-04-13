//logs.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    defaultAvatar:'../../images/defaultAvatar.png',
    moneyImage: '../../images/money.png',
    gutouImage: '../../images/gutou.png',
    orderImage: '../../images/dingdan2.png',
    rightImage: '../../images/right.png',
    gyImage: '../../images/guanyu.png',
    addressImage: '../../images/address.png',
    shareImage: '../../images/shareIcon.png',
    switchValue : true
  },
  onLoad: function (options) {
    this.indexInit();
  },

  switchChange: function(event){
    const detail = event.detail;
    this.setData({
        'switchValue' : detail.value
    })
    
},

  onShow: function(e) {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    }
  },

  indexInit: function() {
  
  },

  orderIndex: function() {
    wx.navigateTo({
      url: '/pages/order/index'
    });
  },

  myShare: function() {
    wx.navigateTo({
      url: '/pages/my/share'
    });
  },

  myExpress: function() {
    wx.navigateTo({
      url: '/pages/my/express'
    });
  },

  myAbout: function() {
    wx.navigateTo({
      url: '/pages/my/about'
    });
  },

  getWxInfo: function(e) {
    //console.log(e);
    var avatarUrl = '';
    var nickname = '';
    var userInfo = e.detail.userInfo || '';
    if (userInfo) {
      avatarUrl = e.detail.userInfo.avatarUrl;
      nickname = e.detail.userInfo.nickName;
      app.updQQInfo(avatarUrl, nickname);

      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res
        })
      }
    }
  }

})
