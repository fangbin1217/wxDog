//logs.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    viewWidth: 414
  },
  onLoad: function (options) {

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var viewWidth = res.windowWidth;
        var bgLeft = (viewWidth - 300)/2;
        that.setData({
          viewWidth: viewWidth,
          bgLeft: bgLeft
        });
      }
    });
    this.indexInit();
  },


  onShow: function(e) {
    

  },

  indexInit: function() {
    var cateInfo = {
      cateId: 1,
      cateName: '泰迪犬',
      bgImage: app.globalData.imgHost + 'index/ptBg0415.png',
      pieceList: [
        {pieceImage: app.globalData.imgHost + 'index/taidi0414-1.png', lockImage: app.globalData.imgHost + 'index/lock0415-1.png', isShow: true},
        {pieceImage: app.globalData.imgHost + 'index/taidi0414-2.png', lockImage: app.globalData.imgHost + 'index/lock0415-2.png', isShow: true},
        {pieceImage: app.globalData.imgHost + 'index/taidi0414-3.png', lockImage: app.globalData.imgHost + 'index/lock0415-3.png', isShow: false}
      ],
    };

    var taskList = [
      {taskId:1, image: app.globalData.imgHost + 'index/taidiSmall1.png',name: '一号碎片', content: '邀请用户30人', isFinish: true, isLottery: false},
      {taskId:2, image: app.globalData.imgHost + 'index/taidiSmall1.png',name: '二号碎片', content: '抽奖获取', isFinish: true, isLottery: true},
      {taskId:3, image: app.globalData.imgHost + 'index/taidiSmall1.png',name: '三号碎片', content: '抽奖获取', isFinish: true, isLottery: true},
    ];

    var isDisabledBtn = true;
    var isShowCount = 0;
    for (var k in cateInfo.pieceList) {
      if (cateInfo.pieceList[k].isShow == true) {
        isShowCount++;
      }
    }
    if (isShowCount == 3) {
      isDisabledBtn = false;
    }

    this.setData({
      cateInfo: cateInfo,
      isDisabledBtn: isDisabledBtn,
      taskList: taskList
    });
    
  },

  lotteryIndex: function() {

  }

})
