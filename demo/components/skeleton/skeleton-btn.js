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
      this.calcData().then((data) => {
        this.ouput(data);
        this.triggerEvent('updateData', data);
        this.triggerEvent('toggleShow', true);
      });
    },
    ouput(data) {
      console.log('data', JSON.stringify(data, null, 2));
    },
    objToStyle(obj) {
      const { physicalRadio } = this.data;
      return Object.keys(obj)
        .map(key => `${key}:${obj[key] * physicalRadio}rpx`)
        .join(';');
    },
    calcData() {
      return this.getElements(`.${this.data.selector}`)
        .then(([container]) => {
          const { width, height, top, left } = container;
          console.log(container);
          return this.calcStyleLists(container)
            .then(lists => ({
              container: this.objToStyle({ width, height, top, left }),
              lists,
            }));
        });
    },
    calcStyleLists(container) {
      const { top, left, right, bottom } = container;

      const {
        selector,
        selectorTypes,
      } = this.data;

      const promises = selectorTypes
        .map(type => this.getElements(`.${selector}-${type}`)
          .then(elements => elements
            .filter(vo =>
              vo.left < right
              && vo.right > left
              && vo.top < bottom
              && vo.bottom > top
            )
            .map(vo => this.objToStyle({
              width: vo.width,
              height: vo.height,
              left: vo.left - left,
              top: vo.top - top,
            }))
          )
          .then(elements => ({ type, elements }))
        );

      return Promise.all(promises);
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
          resolve(res[0]);
        });
      });
    },
  },
});
