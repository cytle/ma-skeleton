Page({
  data: {
    loadingTypes: ['spin', 'chiaroscuro', 'shine', 'null'],
    selectedLoadingType: 'shine',
    bgcolor: '#FFF',
  },
  bindLoadingTypeChange(e) {
    this.setData({
      selectedLoadingType: e.detail.value,
    });
  },
  binInputBgColor(e) {
    this.setData({
      bgcolor: e.detail.value,
    });
  },
})
