# ma-skeleton

小程序骨架屏

## Usage

### 1. 拷贝组件

将此项目中 `/demo/components/skeleton`文件夹拷贝到你的项目中

### 2. 引入组件到页面

index.json

``` json
{
  "usingComponents": {
    "skeleton": "../../components/skeleton/skeleton"
  }
}
```

index.wxml

``` xml
<!-- 引入组件 -->
<skeleton loading="spin" bgcolor="#FFF" selector="skeleton" isDev="true"></skeleton>
```

### 3. 添加标识

index.wxml

``` xml
<!-- 引入组件 -->
<skeleton loading="spin" bgcolor="#FFF" selector="skeleton" isDev="true"></skeleton>

<!-- 标识 skeleton -->
<view class="page skeleton">
  <!-- 矩形元素标识 skeleton-rect -->
  <view class="search-bar skeleton-rect">
    Hello, Search
  </view>
  <view class="userinfo">
    <!-- 圆形元素标识 skeleton-circle -->
    <view class="userinfo__avatar skeleton-circle">
      <open-data type="userAvatarUrl"></open-data>
    </view>
    <view class="userinfo__nickname skeleton-rect">
      <open-data type="userNickName"></open-data>
    </view>
  </view>
</view>
```

### 4. 生成骨架屏数据

点击右下角按钮会预览骨架屏，同时在控制台会生成骨架屏数据，这时候想办法保存数据，然后再引入数据，这样就可以得到骨架屏了

![生成骨架屏数据](https://github.com/cytle/ma-skeleton/raw/5664f612a64a02b06ef36f8e71ba7449b0e33128/media/create-data.png)

## 骨架支持的元素

支持的元素类型

| type | selector name | desc |
|------|---------------|------|
| bg   | .${selector}-bg | 圆角矩形淡色样式 |
| rect | .${selector}-rect | 圆角矩形样式 |
| circle | .${selector}-circle | 圆形样式 |

## 组件支持的属性

``` js
// properties
{
  /**
   * 骨架屏数据
   */
  data: {
    type: Object,
    value: null,
  },
  /**
   * 是否是开发模式，如果为true, 则显示生成按钮
   */
  isDev: {
    type: Boolean,
    value: false,
  },
  /**
   * 选择器名字
   */
  selector: {
    type: String,
    value: 'skeleton',
  },
  /**
   * 骨架屏背景
   */
  bgcolor: {
    type: String,
    value: '#FFF',
  },
  /**
   * 骨架屏动画效果，可以是如下值: 'spin', 'chiaroscuro', 'shine'
   */
  loading: {
    type: String,
    value: '',
  },
},
```

## demo

![demo](https://github.com/cytle/ma-skeleton/raw/5664f612a64a02b06ef36f8e71ba7449b0e33128/media/demo.gif)
