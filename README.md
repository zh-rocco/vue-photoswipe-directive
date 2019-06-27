# vue-photoswipe-directive

## Use

```vue
<template>
  <div id="app">
    <img v-previewer:a src="./images/01.jpg" />
    <img v-previewer:a src="./images/02.jpg" />
    <img v-previewer:b src="./images/03.jpg" />
    <img v-previewer:a src="./images/04.png" />
    <img v-previewer src="./images/05.png" />
    <img v-previewer src="./images/06.png" />
    <img v-previewer src="./images/07.png" />
    <img v-previewer src="./images/08.png" />
    <img v-previewer:b src="./images/09.jpg" />
  </div>
</template>

<script>
import { createPreviewerDirective } from "../lib/directive";

export default {
  directives: {
    previewer: createPreviewerDirective({
      shareEl: false, // 隐藏分享按钮
      fullscreenEl: false, // 隐藏全屏按钮
      history: false, // 禁用 history 模式
      tapToClose: false, // 禁用点击空白区退出
      escKey: false, // 禁用 ESC 键退出
      clickToCloseNonZoomable: false, // 禁止图像小于视口大小时，鼠标点击图像会关闭图库
      bgOpacity: 0.8, // 背景透明度
      allowPanToNext: false, // 禁止图片放大时滑动到上/下一页
      pinchToClose: false // 禁用双指捏合关闭
    })
  }
};
</script>
```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
