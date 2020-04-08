//logs.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    rightImage: '../../images/right.png',
    editImage: '../../images/edit.png',
    loveImage: '../../images/love.png',
    yqImage: '../../images/yq.png',
    hatImage: '../../images/hat_small0408.png',
    wjImage: '../../images/wj_small0408.png',
    wanImage: '../../images/wan_small0408.png',
    jsImage: '../../images/js_small0408.png'
  },
  onLoad: function (options) {
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
      {daojuId: 1, title: '帽子道具卡', image: app.globalData.imgHost + 'index/hat_small0408.png', counts: 1},
      {daojuId: 2, title: '帽子道具卡', image: app.globalData.imgHost + 'index/wj_small0408.png', counts: 0},
      {daojuId: 3, title: '帽子道具卡', image: app.globalData.imgHost + 'index/wan_small0408.png', counts: 0},
      {daojuId: 4, title: '帽子道具卡', image: app.globalData.imgHost + 'index/js_small0408.png', counts: 0}
    ];

    this.setData({
      daojuList: daojuList
    });
    
  }

})
