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
        bottomLinImage: '../../images/bottom003.png',
        bottomWeiImage: '../../images/bottom004.png',
        shareImage: '../../images/share.png',
        recordIndexImage: '../../images/recordIndex002.png',
        yifuIndexImage: '../../images/yifu.png',
        glImage: '../../images/gl.png',
        orderImage: '../../images/order.png',
        dogSmallImage: '../../images/dogSmall100.png',
        musicImage: '../../images/music.png',
        timerNum:0,
        myTimer1:null,
        animation: {},
        RecordData: {},
        xinqinData: {},
        glData: {},
        orderData: {},
        dogState: false,
        dogLeft: 70,
        bgMusicBtn: true
    },

  onReady: function () {  
    //app.globalData.userInfo = {isCollect:false};
    this.popover = this.selectComponent('#popover');
    // 调用自定义组件 popover 中的 onDisplay 方法
    this.popover.onDisplay();

    //旺旺
    this.audioCtx = wx.createInnerAudioContext('audioCtx');
    var audioSrc = app.globalData.imgHost + 'music/voiceWang0403.mp3';
    this.audioCtx.src = audioSrc;
    this.audioCtx.loop = false;

    //喘气
    this.audioCtx2 = wx.createInnerAudioContext('audioCtx');
    var audioSrc2 = app.globalData.imgHost + 'music/voiceChuan0404.mp3';
    this.audioCtx2.src = audioSrc2;
    this.audioCtx2.loop = false;
    

    this.animationRecord = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0
    });

    this.animationYifu = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0
    });


    this.animationXinqin = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0
    });

    this.animationGl = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0
    });

    this.animationOrder = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0
    });

    this.animationMusic = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0'
    });

    this.musicTimes = 0;
    this.musicTimer = -1;
    this.isBgMusic = true; 
    if (this.data.bgMusicBtn) { 
      this.startAnimationInterval();
    }

    var xcxList = [
      {xcxName:"记分助手", xcxImage:app.globalData.imgHost +  "xcx/xcx001.png", appid: "wx547bae972d6fecf9", path: "pages/index/index?dog=2020001&ald_media_id=60692&ald_link_key=fb21a10eab75b060"},
      {xcxName:"礼物抽奖", xcxImage:app.globalData.imgHost +  "xcx/xcx002.png", appid: "wx99eb6626b6d04429", path: "pages/index/index?dog=2020002&ald_media_id=60693&ald_link_key=63e116e4bc3d5332"},
    ];
    var xcxSpan = 24/(xcxList.length);
    console.log(xcxSpan);
    this.setData({
      xcxList : xcxList,
      xcxSpan: xcxSpan
    });
  },


  /**
   * 实现image旋转动画，每次旋转 120*n度
   */
  rotateAni: function (n) {
    this.animationMusic.rotate(120 * (n)).step()
    this.setData({
      musicData: this.animationMusic.export()
    })
  },

  /**
   * 开始旋转
   */
  startAnimationInterval: function () {
    var that = this;
    that.rotateAni(++this.musicTimes); // 进行一次旋转
    this.musicTimer = setInterval(function () {
      that.rotateAni(++that.musicTimes);
    },  1400); // 每间隔_ANIMATION_TIME进行一次旋转
  },

  /**
   * 停止旋转
   */
  stopAnimationInterval: function () {
    if (this.musicTimer> 0) {
      clearInterval(this.musicTimer);
      this.musicTimer = 0;
    }
  },

  startOrStopMusic: function () {
    if (this.data.bgMusicBtn) {
      if (this.isBgMusic) {
        console.log('stop');
        this.stopAnimationInterval();
        this.isBgMusic = false;
      } else {
        console.log('start');
        this.startAnimationInterval();
        this.isBgMusic = true;
      }
    }
  },


  dogRecord: function (e) {
    console.log('dog record')
  },

  dogTap: function (e) {

    var maxLen = this.data.dogLeft + this.data.dogWidth/2 - 30 - 10;
    var maxXinqinLen = -(100 + this.data.dogWidth/2 - 30) - 30;
    var maxYifuLen = -(this.data.dogLeft + this.data.dogWidth/2 - 30 - 10);
    var maxGlX = (this.data.dogLeft + this.data.dogWidth/2 - 30 - 10) * 0.71;
    var maxGlY = -maxGlX;
    var maxOrderX = -(this.data.dogLeft + this.data.dogWidth/2 - 30 - 10) * 0.71;
    var maxOrderY = maxOrderX;
    if (!this.data.dogState) {
      this.audioCtx.play();

      this.animationRecord.opacity(1).translateX(maxLen).step();
      this.animationYifu.opacity(1).translateX(maxYifuLen).step();
      this.animationXinqin.opacity(1).translateY(maxXinqinLen).step();
      this.animationGl.opacity(1).translate(maxGlX, maxGlY).step();
      this.animationOrder.opacity(1).translate(maxOrderX, maxOrderY).step();

      this.setData({
        dogState: true,
        RecordData:this.animationRecord.export(),
        yifuData:this.animationYifu.export(),
        xinqinData:this.animationXinqin.export(),
        glData:this.animationGl.export(),
        orderData:this.animationOrder.export(),
      });

    } else {
      this.audioCtx2.play();
      this.animationRecord.opacity(0).translateX(0).step();
      this.animationYifu.opacity(0).translateX(0).step();
      this.animationXinqin.opacity(0).translateY(0).step();
      this.animationGl.opacity(0).translate(0, 0).step();
      this.animationOrder.opacity(0).translate(0, 0).step();

      this.setData({
        dogState: false,
        RecordData:this.animationRecord.export(),
        yifuData:this.animationYifu.export(),
        xinqinData:this.animationXinqin.export(),
        glData:this.animationGl.export(),
        orderData:this.animationOrder.export(),

      });
    }
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
        var bottomConst = 100;
        var wanWidth = 120;
        var recordWidth = 60;
        var xinqinWidth = 150;
        var windowWidth = res.windowWidth;
        var dogWidth = windowWidth - 2* that.data.dogLeft;
        var viewHeight = res.windowHeight;
        var recordBottom = bottomConst + dogWidth/2 - recordWidth/2;
        var recordLeft = that.data.dogLeft + dogWidth/2 - recordWidth/2;
        var yifuBottom = bottomConst + dogWidth/2 - recordWidth/2;
        var yifuLeft = that.data.dogLeft + dogWidth/2 - recordWidth/2;
        var xinqinBottom = bottomConst + dogWidth/2 - xinqinWidth/2;
        var xinqinLeft = that.data.dogLeft + dogWidth/2 - xinqinWidth/2;
        var glBottom = bottomConst + dogWidth/2 - recordWidth/2;
        var glLeft = that.data.dogLeft + dogWidth/2 - recordWidth/2;
        var orderBottom = bottomConst + dogWidth/2 - recordWidth/2;
        var orderLeft = that.data.dogLeft + dogWidth/2 - recordWidth/2;
        var wanLeft = (windowWidth - wanWidth)/2;
        that.setData({
          viewWidth: windowWidth,
          viewHeight: viewHeight,
          dogWidth:dogWidth,
          dogHeight:dogWidth,
          dogImage: app.globalData.imgHost + 'index/dog0403.gif',
          dfcImage: app.globalData.imgHost + 'index/dfc0331.gif',
          zhamenImage: app.globalData.imgHost + 'index/kc0321.gif',
          dabianImage: app.globalData.imgHost + 'index/dabian001.gif',
          dzpIndexImage:  app.globalData.imgHost +  'index/lotteryIndex001.gif',
          wanImage: app.globalData.imgHost +  'index/wan004.png',
          recordBottom: recordBottom,
          recordLeft: recordLeft,
          yifuBottom: yifuBottom,
          yifuLeft: yifuLeft,
          xinqinBottom: xinqinBottom,
          xinqinLeft: xinqinLeft,
          glBottom: glBottom,
          glLeft: glLeft,
          orderBottom: glBottom,
          orderLeft: glLeft,
          wanLeft: wanLeft,
          progressBottom: dogWidth
        });
      }
    });

  },

  lin: function(e) {
    console.log(1);
  },

  wei: function(e) {
    console.log(1);
  },

  
  random: function(lower, upper) {
    return Math.floor(Math.random() * (upper - lower+1)) + lower;
  },


  initIndex: function() {
    var zhamenLeft = this.random(3, 65);
    var zhamenTop = this.random(0, 47);
    var dabianLeft = this.random(3, 65);
    var dabianTop = this.random(0,35);

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
        //调用上传OpenID
        wx.aldstat.sendOpenid(res.openid);
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

  jumpXcx: function(e) {
    var appid = e.currentTarget.dataset.id;
    var path = e.currentTarget.dataset.path;
    if (path == '') {
      path = 'pages/index/index';
    }
    console.log(e);
    wx.navigateToMiniProgram({
      appId: appid,
      path: path,
      extraData: {
        dog: 'dog'
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
    var shareTitle = '云养狗狗，完成任务饲养小狗，还有狗狗布娃娃，靠枕，快来开启您的领养之旅！';
    var path = '/pages/index/index';
    if (app.globalData.userInfo) {
      shareImage = app.globalData.userInfo.shareImage;
      shareTitle = app.globalData.userInfo.shareTitle;
      path = '/pages/index/index?from_uid=' + app.globalData.userInfo.uid;
    }
    return {
      title: app.globalData.shareTitle, //转发的标题。当前小程序名称
      path: path, //转发的路径
      imageUrl: app.globalData.shareImage, //自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4
      success: function(e) {
        
      }
    }

  }
})