Component({
  properties: {
    bgcolor: {
      type: String,
      value: '#FFF',
    },
    isDev: {
      type: Boolean,
      value: false,
    },
    data: {
      type: Object,
      value: null,
    },
    loading: {
      type: String,
      value: '', // 'spin', 'chiaroscuro', 'shine'
    },
    selector: {
      type: String,
      value: 'skeleton',
    },
  },
  data: {
    isShowByDev: false,
    devData: null,
    skeletonWidth: 375,
    skeletonHeight: 667,
    selectorTypes: ['bg', 'rect', 'circle'],
  },
  attached() {
    // 默认的首屏宽高，防止内容闪现
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      skeletonHeight: systemInfo.windowHeight,
    });
  },
  methods: {
    handleToggleShow(e) {
      this.setData({ isShowByDev: e.detail });
    },
    handleUpdateData(e) {
      this.setData({ devData: e.detail });
      console.table(e.detail);
    },
  },
});
