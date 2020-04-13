//logs.js
const app = getApp();

Page({
  data: {
  },
  onLoad: function (options) {
    var orderList = [
      {id:1, title:'加速道具卡', sourceImage: app.globalData.imgHost + 'index/order001.png', sourceName: '小程序内购', createTime: '8月24号', statusName:'已发货'},
      {id:2, title:'狗狗靠枕', sourceImage: app.globalData.imgHost + 'index/order002.png', sourceName: '抽奖',  createTime: '8月24号', statusName:'已创建'}
    ];
    this.setData({
      orderList: orderList
    });
  },

  onShow: function() {
    
    
  }
});
