//logs.js
const app = getApp();

Page({
  data: {
  },
  onLoad: function (options) {
    var orderInfo = {
      orderNo: 'asd1231123123',
      money: '0.01',
      sourceImage: app.globalData.imgHost + 'index/order001.png', 
      status: '已完成',
      title: '加速道具卡',
      createTime: '2020-09-19 08:01',
      contactName: '张三',
      contactMobile: '18812345678',
      address: '浙江省杭州市西湖区莱茵达大厦1903',
    };
    this.setData({
      orderInfo: orderInfo
    });
  },

  onShow: function() {
    
    
  },

  myAbout: function() {
    wx.navigateTo({
      url: '/pages/my/about'
    });
  }
});
