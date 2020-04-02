const { windowWidth, windowHeight } = wx.getSystemInfoSync();
const app = getApp();

// 三角形箭头的高度
const trangleHeight = 12;

Component({
  relations: {
    './popover-item': {
      type: 'child'
    }
  },

  data: {
    // 当前显隐状态
    visible: false,
    // popover 宽
    pw: 414,
    // popover 高
    ph: 25,
    // popover 距左距离
    px: 0,
    // popover 距上距离
    py: 0,
    // 垂直方向 top/bottom
    vertical: '',
    // 水平方向 left/center/right
    align: ''
  },

  methods: {
    onDisplay: function() {
      if (app.globalData.userInfo && !app.globalData.userInfo.isCollect) {
        console.log(123)
        return;
      }
      this.setData({
        visible: true,
        pw: windowWidth - 10,
        ph: 25,
        px: 5,
        py: 70,
        ph: this.getItemsHeight(),
        vertical: 'bottom',
        align: 'left'
      });
      
    },
    onHide: function() {
      this.setData({
        visible: false
      });
    },
    // 获取所有子元素
    getItems: function() {
      return this.getRelationNodes('./popover-item');
    },
    // 获取所有子元素的总高度
    getItemsHeight() {
      return this.getItems().map(item => item.data.height).reduce((a, b) => a + b, 0);
    }
  }

})