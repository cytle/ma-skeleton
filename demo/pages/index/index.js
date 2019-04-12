const skeletonData = require('./skeletonData');

Page({
  data: {
    pageIsReady: false,

    skeletonLoadingTypes: ['spin', 'chiaroscuro', 'shine', 'null'],
    skeletonSelectedLoadingType: 'shine',
    skeletonIsDev: false,
    skeletonBgcolor: '#FFF',
    skeletonData,
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        pageIsReady: true,
      });
    }, 2000);
  },
  bindSwitchIsDev(e) {
    console.log(e);
    this.setData({
      skeletonIsDev: e.detail.value,
    });
  },
  bindLoadingTypeChange(e) {
    this.setData({
      skeletonSelectedLoadingType: e.detail.value,
    });
  },
  binInputBgColor(e) {
    this.setData({
      skeletonBgcolor: e.detail.value,
    });
  },
})
