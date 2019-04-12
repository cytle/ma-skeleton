//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    loadingTypes: ['spin', 'chiaroscuro', 'shine', '无'],
    selectedLoadingType: '无',
  },
  bindLoadingTypeChange(e) {

    this.setData({
      selectedLoadingType: e.detail.value,
    });
  },
})
