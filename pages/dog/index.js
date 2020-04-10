//logs.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    viewWidth: 414,
    rightImage: '../../images/right.png',
    editImage: '../../images/edit.png',
    loveImage: '../../images/love.png',
    yqImage: '../../images/yq.png',
    hatImage: '../../images/hat_small0408.png',
    wjImage: '../../images/wj_small0408.png',
    wanImage: '../../images/wan_small0408.png',
    jsImage: '../../images/js_small0408.png',
    bqImage1: '../../images/bq1.png',
    bqImage2: '../../images/bq2.png',
    bqImage3: '../../images/bq3.png',
  },
  onLoad: function (options) {

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var viewWidth = res.windowWidth;
        that.setData({
          viewWidth: viewWidth
        });
      }
    });
    this.indexInit();
  },


  onShow: function(e) {
    
    if (app.globalData.userInfo || true) {
      this.setData({
        userInfo: app.globalData.userInfo,
        dogImage: app.globalData.imgHost + 'index/dog0408.png'
      });
    }

  },

  indexInit: function() {
    var daojuList = [
      {daojuId: 1, title: '帽子道具卡', image: app.globalData.imgHost + 'index/hat_small0408.png', counts: 1, isWear: false},
      {daojuId: 2, title: '围巾道具卡', image: app.globalData.imgHost + 'index/wj_small0408.png', counts: 0, isWear: false},
      {daojuId: 3, title: '金碗道具卡', image: app.globalData.imgHost + 'index/wan_small0408.png', counts: 1, isWear: true},
      {daojuId: 4, title: '加速道具卡', image: app.globalData.imgHost + 'index/js_small0408.png', counts: 0, isWear: false}
    ];

    var cateList = [
      {cateId: 5, title: '泰迪犬', smallImage: app.globalData.imgHost + 'index/taidi_small0408.png', bigImage: app.globalData.imgHost + 'index/taidi_big0409.png', totalYqCounts:14, minYqCounts: 50, minLevel: 60, isLevel: false, isCounts: false, isCate:true, isAll: true, daojuName: '泰迪品种卡'}
    ];

    this.setData({
      daojuList: daojuList,
      cateList: cateList,
      dogXqValue:0
    });
    
  }

})
