const app = getApp();
const updateManager = wx.getUpdateManager();
// 在页面中定义视频广告
var videoAd = null;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null,
        viewWidth: null,
        dfcImage: '',
        dogImage:'',
        zhamenImage: '',
        isShowZhamen: true,
        zhamenLeft: 10,
        zhamenTop:0,
        dabianImage: '',
        isShowDabian: true,
        dabianLeft : 10,
        dabianTop:0,
        mailImage: '',
        bgImage: '../../images/indexBg0402.png',
        bottomLinImage: '../../images/bottom001.png',
        bottomWeiImage: '../../images/bottom002.png',
        shareImage: '../../images/share.png',
        timerNum:0,
        myTimer1:null,
        animation: {}
    },

  onReady: function () {  
    //app.globalData.userInfo = {isCollect:false};
    this.popover = this.selectComponent('#popover');
    // 调用自定义组件 popover 中的 onDisplay 方法
    this.popover.onDisplay();
  },


  // 响应popover组件中的子元素点击事件
  hideCollect: function (e) {
    // 调用自定义组件 popover 中的 onHide 方法
    this.popover.onHide();
  },


  onLoad: function(options) {
    //version update
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      wx.showModal({
        title: '升级失败',
        content: '新版本下载失败，请检查网络！',
        showCancel: false
      });
    });

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var dogLeft = 70;
        var windowWidth = res.windowWidth;
        var dogWidth = windowWidth - 2*dogLeft;
        that.setData({
          viewWidth: windowWidth,
          viewHeight: res.windowHeight,
          dogLeft: dogLeft,
          dogWidth:dogWidth,
          dogHeight:dogWidth,
          dogImage: app.globalData.imgHost + 'index/dog0405.gif',
          dfcImage: app.globalData.imgHost + 'index/dfc0331.gif',
          zhamenImage: app.globalData.imgHost + 'index/kc0321.gif',
          dabianImage: app.globalData.imgHost + 'index/dabian001.gif',
          dzpIndexImage:  app.globalData.imgHost +  'index/lotteryIndex001.gif' //dzpIndex.png
        });
      }
    });

  },

  random: function(lower, upper) {
    return Math.floor(Math.random() * (upper - lower+1)) + lower;
  },


  initIndex: function() {
    var zhamenLeft = this.random(3, 65);
    var zhamenTop = this.random(0, 47);
    var dabianLeft = this.random(3, 65);
    var dabianTop = this.random(0,20);

    var mailImage = app.globalData.imgHost + 'index/mail001.png';
    //有新邮件
    if (true) {
      mailImage = app.globalData.imgHost + 'index/mail004.gif';
    }
    this.setData({
      zhamenLeft: zhamenLeft,
      zhamenTop: zhamenTop,
      dabianLeft: dabianLeft,
      dabianTop: dabianTop,
      mailImage: mailImage,
      userImage: '../../images/defaultAvatar.png'
    });
  },

  onShow: function() {
    this.mySupports();

    if (!this.data.userInfo) {
      var access_token = wx.getStorageSync('access_token') || ''
      //wx.showLoading({
        //title: '努力拉取数据..'
      //});
      //没有access_token 就是第一次登录
      if (!access_token) {
        //app.login();
      } else {
        //否则就根据没有access_token去获取用户信息
        //app.getUserInfo(access_token);
      }

      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res
        });
        this.initIndex();
      }
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }

    if (app.globalData.isFlush || true) {
      app.globalData.isFlush = false;
      this.initIndex();
    }

  },

  mySupports: function () {
    if (this.data.myTimer1) {
      clearInterval(this.data.myTimer1);
      this.setData({
        timerNum: 0,
        myTimer1: null
      });
    }
    //创建动画实例animation1
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation = animation;

    var next = true;
    //连续动画关键步骤
    var myTimer1 = setInterval(function () {
      //2: 调用动画实例方法来描述动画
      if (this.data.timerNum < 8) {
        if (next) {
          animation.translateX(2).step();
          animation.rotate(19).step();

          next = !next;
        } else {
          animation.translateX(-2).step();
          animation.rotate(-19).step();

          next = !next;
        }
      } else {
        animation.translateX(0).step();
        animation.rotate(0).step();
      }
      this.data.timerNum++;
      if (this.data.timerNum >= 16) {
        this.data.timerNum = 0;
      }

      //3: 将动画export导出，把动画数据传递组件animation的属性
      this.setData({
        animation: animation.export(),
        timerNum: this.data.timerNum
      })
    }.bind(this), 300);
    this.setData({
      myTimer1: myTimer1
    })
},

  jumpRightXcx: function(e) {
    wx.navigateToMiniProgram({
      appId: 'wx5691458ba4e31dc9',
      extraData: {
        foo: 'bar'
      },
      success(res) {
        // 打开成功
        console.log('jump right success');
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var shareImage = app.globalData.imgHost + 'wxwheel/share0315.png';
    var shareTitle = '默认分享标题';
    if (app.globalData.userInfo) {
      shareImage = app.globalData.userInfo.shareImage;
      shareTitle = app.globalData.userInfo.shareTitle;
    }
    return {
      title: app.globalData.shareTitle, //转发的标题。当前小程序名称
      path: '/pages/index/index', //转发的路径
      imageUrl: app.globalData.shareImage, //自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4
      success: function(e) {
        
      }
    }

  }
})
