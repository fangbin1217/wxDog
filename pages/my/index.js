//logs.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    defaultAvatar:'../../images/defaultAvatar.png',
    switchValue : false
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
    
    if (!this.data.userInfo && app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      });
    }
  },

  indexInit: function() {
  
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