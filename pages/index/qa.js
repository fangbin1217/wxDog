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
    var qaList = [
      {id:1, title:'我的问题我的问题我的问题我的问题我的问题我的问题我的问题?', content:'史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。'},
      {id:1, title:'我的问题我的问题我的问题我的问题我的问题我的问题我的问题2?', content:'史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。'}
    ];
    this.setData({
      qaList: qaList
    });
  },

  onShow: function() {
    
    
  }
});
