Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    selector: {
      type: String,
    },
    selectorTypes: {
      type: Array,
    },
  },
  data: {
    physicalRadio: 2,
  },
  attached() {
    // 默认的首屏宽高，防止内容闪现
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      physicalRadio: 750 / systemInfo.windowWidth,
    });
  },
  methods: {
    /**
     * 按钮点击
     */
    toggleBtnTap() {
      if (this.data.isShow) {
        this.triggerEvent('toggleShow', false);
        return;
      }
      this.calcStyleLists().then((styleLists) => {
        this.ouput(styleLists);
        this.triggerEvent('updateData', styleLists);
        this.triggerEvent('toggleShow', true);
      });
    },
    ouput(styleLists) {
      console.log('styleLists', JSON.stringify(styleLists, null, 2));
    },
    calcStyleLists() {
      const {
        selector,
        selectorTypes,
      } = this.data;

      const elementsPromise = Promise.all(selectorTypes
        .map(type => this.getElements(`.${selector}-${type}`)
          .then(elements => ({ type, elements })),
      ));

      return Promise.all([
        this.getElements(`.${selector}`),
        elementsPromise,
      ]).then(([container, elements]) => ({
        container: container[0] || '',
        elements,
      }));
    },

    /**
     * 得到element信息
     * @param {string} selector selector
     * @returns {Promise<Object[]>}
     */
    getElements(selector) {
      return new Promise((resolve) => {
        wx.createSelectorQuery().selectAll(selector).fields({
          dataset: true,
          id: true,
          rect: true,
          size: true,
        }).exec((res) => {
          const offestKeys = ['width', 'height', 'left', 'top'];
          const { physicalRadio } = this.data;

          const elements = res[0]
            .map(vo => offestKeys
              .map(key => `${key}:${vo[key] * physicalRadio}rpx`)
              .join(';'),
            );
          resolve(elements)
        });
      });
    },
  },
});
