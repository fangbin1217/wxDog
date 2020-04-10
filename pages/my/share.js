//logs.js
const app = getApp();
const ctx = wx.createCanvasContext('myCanvas');
var openStatus = false;
var canvasToTempFilePath = null;

Page({
  data: {
    w:500,
    h:800,
    viewWidth: 414,
    viewHeight: 662,
    isDisabled: true,
    showImg: ''
  },
  onLoad: function (options) {
    this.shareTimer = 0;
    wx.showLoading({
      title: '正在生成海报..',
    })
    this.drawBgImage();


    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        windowWidth = windowWidth * 0.62;
        var viewHeight = (800/500) * windowWidth;
        that.setData({
          viewWidth: windowWidth,
          viewHeight: viewHeight
        });
      }
    });
    
  },

  drawBgImage() {
    var remote_url = app.globalData.imgHost + 'index/shareBg0413.png';
    var w = this.data.w;
    var h = this.data.h;
    let that = this;
    wx.getImageInfo({
      src : remote_url,
      success : res => {
          //console.log(res.path);
          //res.path 为getImageInfo预加载的缓存图片地址
          ctx.drawImage( res.path, 0, 0, w, h);
          ctx.draw(true);
          that.drawQrcodeImage();
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '生成海报失败',
          image: app.globalData.image_warning,
          duration: 1500,
          mask: true
        })
      }
     });
  },

  drawQrcodeImage() {
    let that = this;
    var QrcodeImage = app.globalData.imgHost + 'index/testQrcode2.png';
    wx.getImageInfo({
      src : QrcodeImage,
      success : res => {
          ctx.restore();
          //console.log(res.path);
          //res.path 为getImageInfo预加载的缓存图片地址
          ctx.drawImage( res.path, 0, 0, 250, 250);
          ctx.draw(true);
          that.drawAvatarImage();
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '生成海报失败.',
          image: app.globalData.image_warning,
          duration: 1500,
          mask: true
        })
      }
     });
  },

  drawAvatarImage: function() {
    let that = this;
    var avatarImage = 'https://wx.qlogo.cn/mmopen/vi_32/YVLpxULLm1K6I5Hcn6cK0YeIoSzV0IYrAFK7WkJNKic4GOenJ1J6B68dteyicpY5vwtRTt0e8M9Z5AiaQWoRXLWKA/132';
    wx.getImageInfo({
      src : avatarImage,
      success : res => {
          ctx.restore();
          let x = 10;
          let y = 650;
          let w = 100;
          let h = 100;
          ctx.rect(x, y, w, h);
          ctx.beginPath();
          ctx.arc(x+w/2, y+h/2, w/2, 0, 2 * Math.PI, false);
          ctx.clip();
          //res.path 为getImageInfo预加载的缓存图片地址
          ctx.drawImage( res.path, x, y, w, h);
          ctx.draw(true);
          that.shareTimer = setTimeout(function() {
            that.saveImageEnd();
          }, 1200);
          
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '生成海报失败！',
          image: app.globalData.image_warning,
          duration: 1500,
          mask: true
        });
      }
     });
  },

  saveImageEnd: function () {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        wx.hideLoading();
        canvasToTempFilePath = res.tempFilePath; // 返回的图片地址保存到一个全局变量里
        that.setData({
          isDisabled: false,
          showImg: canvasToTempFilePath
        });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '绘制海报失败！',
          image: app.globalData.image_warning,
          duration: 1500,
          mask: true
        });
        
      }
    })
  },

  // 保存到系统相册
  saveShareImg: function () {
    let that = this;
    // 数据埋点点击保存学情海报
    that.setData({
      saveId: '保存狗狗领养记海报'
    })
    // 获取用户是否开启用户授权相册
    if (!openStatus) {
      wx.openSetting({
        success: (result) => {
          if (result) {
            if (result.authSetting["scope.writePhotosAlbum"] === true) {
              openStatus = true;
              wx.saveImageToPhotosAlbum({
                filePath: canvasToTempFilePath,
                success() {
                  that.setData({
                    showShareImg: false
                  })
                  wx.showToast({
                    title: '图片保存成功，快去分享到朋友圈吧~',
                    duration: 2000
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败.',
                    image: app.globalData.image_warning
                  })
                }
              })
            }
          }
        },
        fail: () => { },
        complete: () => { }
      });
    } else {
      wx.getSetting({
        success(res) {
          // 如果没有则获取授权
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                openStatus = true
                wx.saveImageToPhotosAlbum({
                  filePath: canvasToTempFilePath,
                  success() {
                    that.setData({
                      showShareImg: false
                    })
                    wx.showToast({
                      title: '图片保存成功，快去分享到朋友圈吧~',
                      icon: 'none',
                      duration: 2000
                    })
                  },
                  fail() {
                    wx.showToast({
                      title: '保存失败。',
                      image: app.globalData.image_warning
                    })
                  }
                })
              },
              fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                openStatus = false
                console.log('请设置允许访问相册')
                wx.showToast({
                  title: '请设置允许访问相册',
                  icon: 'none'
                })
              }
            })
          } else {
            // 有则直接保存
            openStatus = true
            wx.saveImageToPhotosAlbum({
              filePath: canvasToTempFilePath,
              success() {
                that.setData({
                  showShareImg: false
                })
                wx.showToast({
                  title: '图片保存成功，快去分享到朋友圈吧~',
                  icon: 'none',
                  duration: 2000
                })
              },
              fail() {
                wx.showToast({
                  title: '保存失败！',
                  image: app.globalData.image_warning
                })
              }
            })
          }
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },



  onShow: function() {
    if (this.shareTimer) {
      clearInterval(this.shareTimer);
      this.shareTimer = 0;
    }
    
  },
  
});
