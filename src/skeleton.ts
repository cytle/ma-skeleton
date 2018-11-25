const getElementsWithStyle = selector => new Promise((resolve) => {
  wx.createSelectorQuery().selectAll(selector).fields({
    dataset: true,
    id: true,
    rect: true,
    size: true,
  }).exec((res) => {
    const offestKeys = ['width', 'height', 'left', 'top'];
    resolve(res[0]
      .map(vo => offestKeys
        .map(key => `${key}:${vo[key]}rpx`)
        .join(';'),
      ));
  });
});
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
    lists: {
      type: Array,
      value: [],
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
    isShow: false,
    styleLists: [],
    systemInfo: {},
    selectorTypes: ['bg', 'rect', 'circle'],
  },
  attached() {
        // 默认的首屏宽高，防止内容闪现
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      systemInfo: {
        width: systemInfo.windowWidth,
        height: systemInfo.windowHeight,
      },
    });
  },
  methods: {
    async render() {
      // 绘制背景
      wx
        .createSelectorQuery()
        .selectAll(`.${this.data.selector}`)
        .boundingClientRect()
        .exec((res) => {
          this.setData({
            'systemInfo.height': res[0][0].height + res[0][0].top,
          });
        });
    },
        /**
         * 按钮点击
         */
    async toggleBtnTap() {
      if (this.data.isShow) {
        this.setData({
          isShow: false,
        });
        return;
      }

      const styleLists = await this.calcStyleLists();
      this.ouput(styleLists);
      this.triggerEvent('updateStyleLists', styleLists);
      this.setData({ styleLists, isShow: true });
    },
    ouput(styleLists) {
      console.log('styleLists', JSON.stringify(styleLists, null, 4));
    },
    calcStyleLists() {
      const {
        selector,
        selectorTypes,
      } = this.data;
      return Promise.all(selectorTypes
        .map(async type => ({
          type,
          elements: await getElementsWithStyle(`.${selector}-${type}`),
        })));
    },
  },
});
