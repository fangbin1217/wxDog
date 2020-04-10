//logs.js
const app = getApp();

Page({
  data: {
    mail: '',
    customerImage:'',
    homeImage: '../../images/home.png',
    version: '',
  },
  onLoad: function (options) {

  },

  copyTap: function(e) {
    var copyData = e.currentTarget.dataset.id;
    wx.setClipboardData({
      data: copyData,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data);
            wx.showToast({
              title: '已复制到剪贴板',
              icon: 'success',
              duration: 1500,
              mask: true
            });
          }
        })
      }
    });    
  },

  onShow: function() {
    var customerImage = '';
    var mail = '';
    var customerNo = '';
    if (app.globalData.userInfo) {
      customerImage = app.globalData.userInfo.customerImage || '';
      mail = app.globalData.userInfo.mail || '';
      customerNo = app.globalData.userInfo.customerNo || '';
    }
    customerImage = 'https://img.fyy6.com/support/wxCode.png';
    mail = 'jsonp@sina.com';
    customerNo = 'fb475543064';
    this.setData({
      customerImage: customerImage,
      customerNo: customerNo,
      mail: mail,
      version: 'v' + app.globalData.version
    });
    
  }
});
