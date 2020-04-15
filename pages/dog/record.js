//logs.js
const app = getApp();

Page({
  data: {
    current: '1'
  },

  handleChange: function ({ detail }) {
    this.setData({
        current: detail.key
    });
  },

  onLoad: function (options) {
    var feedList = [
      {createTime: '20-04 08:08', type: '抽奖', counts: 50, isAdd: true},
      {createTime: '20-04 08:07', type: '喂食', counts: 51, isAdd: false},
    ];
    this.setData({
      feedList: feedList
    });
  },

  onShow: function() {
    
    
  }
});
