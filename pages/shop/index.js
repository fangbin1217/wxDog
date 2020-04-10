//logs.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    viewWidth: 414,
    moneyImage: '../../images/money.png'
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
      });
    }

  },

  buyTap: function(e) {
    console.log(e);
    var shopId = e.currentTarget.dataset.id;
    var payType = e.currentTarget.dataset.paytype;
    if (payType == 2) { //铜币购买

    }
  },

  indexInit: function() {
    //payType 支付类型 1：RMB 2：铜币
    var shopList = [
      {shopId: 1, title: '狗狗饲料200克', image: app.globalData.imgHost + 'index/test0409.jpg', payType: 2, cost: 200}
    ];

    this.setData({
      shopList: shopList
    });
    
  }

})
