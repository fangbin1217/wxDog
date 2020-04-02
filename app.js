//app.js
App({

  globalData: {
    userInfo: null,
    serverHost: 'http://api.fyy6.fb/',   //https://api.fyy6.com/   http://api.fyy6.fb/
    imgHost: 'https://img.hzmulou.com/',
    image_warning: '../../images/Warning.png',
    isFlush:false,
    version: '2.0.0'
  },
  
  onLaunch: function () {
    
  },

  login: function () {
    //wx登录
    wx.login({
      success: res => {
        //console.log('code:' + res.code); 
        // 登录开始
        wx.request({
          url: this.globalData.serverHost + 'login/wheelwx',
          method: 'post',
          data: { code: res.code, wx_wheel: 1},
          success: res => {
            wx.hideLoading();
            var ret = res.data;
            console.log(ret);
            if (ret.code == 0) {
              wx.setStorageSync('access_token', ret.data.access_token)
              this.globalData.userInfo = ret.data;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(this.globalData.userInfo)
              }
            } else {
              // 这里调用你想设置的提示, 比如展示一个页面，一个toast提示
              wx.showToast({
                  title: ret.msg,
                  icon: 'none',
                  image: this.globalData.image_warning,
                  duration: 1500,
                  mask: true
              });
            }
          },
          fail: () => {
            wx.hideLoading();
            // 这里调用你想设置的提示, 比如展示一个页面，一个toast提示
            wx.showToast({
                title: '登录超时！',
                icon: 'none',
                image: this.globalData.image_warning,
                duration: 1500,
                mask: true
            });
          }
        })
      }
    });
  },

  getUserInfo: function (access_token) {
    wx.request({
      url: this.globalData.serverHost+'wheelwx/info', //接口地址
      method: 'post',
      data: { access_token: access_token, wx_wheel: 1 },
      success: res => {
        wx.hideLoading();
        
        console.log(res.data)
        var ret = res.data;
        if (ret.code == 0) {
          this.globalData.userInfo = ret.data;        
          // 所以此处加入 callback 以防止这种情况  登录成功回调
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(this.globalData.userInfo)
          }
        } else if (ret.code == 101) {  //如果access_token过期，则重新登录
          this.login();
        } else {
          this.login();
        }
      },
      fail: () => {
        wx.hideLoading();
        // 这里调用你想设置的提示, 比如展示一个页面，一个toast提示
        this.login();
      }
    }) 
  },

  updQQInfo: function (avatar, nickname) {
    wx.showLoading({
      title: '正在登录..',
    });
    var access_token = wx.getStorageSync('access_token') || ''
    wx.request({
      url: this.globalData.serverHost + 'wheelwx/updinfo', //接口地址
      method: 'post',
      data: { access_token: access_token, wx_wheel: 1, avatar: avatar, nickname: nickname, }, 
      success: res => {
        wx.hideLoading();
        //console.log(res.data)
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
          mask: true
        })
        var ret = res.data;
        if (ret.code == 0) {
          this.globalData.userInfo = ret.data;
          // 所以此处加入 callback 以防止这种情况  登录成功回调
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(this.globalData.userInfo)
          }

        } else if (ret.code == 101) {  //如果access_token过期，则重新登录
          wx.showToast({
            title: '登录过期！',
            icon: 'none',
            image: this.globalData.image_warning,
            duration: 1500,
            mask: true
          });
        } else {
          wx.showToast({
            title: '登录失败！',
            icon: 'none',
            image: this.globalData.image_warning,
            duration: 1500,
            mask: true
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '登录超时！',
          icon: 'none',
          image: this.globalData.image_warning,
          duration: 1500,
          mask: true
        });
      }
    })
  }

})
