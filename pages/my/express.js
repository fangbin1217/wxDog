// pages/login/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipsTitle: '',
    viewWidth: '',
    lotteryGiftImage: '',
    isAdmin: false,
    remark:'',
    region: ['省', '市', '区'], //['广东省', '广州市', '海珠区']
    customItem: '请选择',
    contact_name: '',
    mobile: '',
    address: '',
    detail_address: '',
    status_name: '',
    status: 0,
    color: '#80848f',
    winner_id: 0,
    is_edit: false,
    isLoading: false,
    isDisabled: false
  },

    getMobile: function (e) {
    var val = e.detail.value;
    if (val) {
      this.setData({
        mobile: val
      });
    }
  },

  getContactName: function (e) {
    var val = e.detail.value;
    if (val) {
      this.setData({
        contact_name: val
      });
    }
  },

  getAddress: function (e) {
    var val = e.detail.value;
    if (val) {
      this.setData({
        address: val
      });
    }
  },

  bindRegionChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  getRemark: function (e) {
    var val = e.detail.value;
    if (val) {
      this.setData({
        remark: val
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var winner_id = decodeURIComponent(options.winner_id);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        that.setData({
          viewWidth: windowWidth
        })
      },
    });

  },


  initIndex: function() {
    wx.showLoading();
    var access_token = wx.getStorageSync('access_token') || '';
    wx.request({
      url: app.globalData.serverHost+'express/detail', //接口地址
      method: 'post',
      data: { access_token: access_token },
      success: res => {
        wx.hideLoading();
        //console.log(res.data)
        var ret = res.data;
        if (ret.code == 0) {
          this.setData({
            contact_name: ret.data.contact_name,
            mobile: ret.data.mobile,
            detail_address: ret.data.detail_address,
            is_edit: ret.data.is_edit,
            remark: ret.data.remark
          });
        } else if (ret.code == 101) {  //如果access_token过期，则重新登录
          app.login(1);
        } else {
          wx.showToast({
            title: ret.msg,
            icon: 'none',
            image: app.globalData.image_warning,
            duration: 1500,
            mask: true
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: ret.msg,
          icon: 'none',
          image: app.globalData.image_warning,
          duration: 1500,
          mask: true
        });
      }
    });
  },

  bindRegionChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})