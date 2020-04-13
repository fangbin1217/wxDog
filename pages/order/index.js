//logs.js
const app = getApp();

Page({
  data: {
    rightImage: '../../images/right.png'
  },
  onLoad: function (options) {
    var orderList = [
      {id:1, title:'加速道具卡', sourceImage: app.globalData.imgHost + 'index/order001.png', createTime: '8月24号', statusName:'已发货'},
      {id:2, title:'狗狗靠枕', sourceImage: app.globalData.imgHost + 'index/order002.png', createTime: '8月24号', statusName:'已创建'}
    ];
    this.setData({
      orderList: orderList
    });
  },

  onShow: function() {
    
    
  },

  orderDetail: function() {
    wx.navigateTo({
      url: '/pages/order/detail'
    });
  }
});
