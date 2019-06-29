# vue-photoswipe-directive

> An image preview directive for vue powered by [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe).

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)
[![downloads](https://img.shields.io/npm/dt/vue-photoswipe-directive.svg)](http://npm-stats.com/~packages/vue-photoswipe-directive)
[![GitHub stars](https://img.shields.io/github/stars/zh-rocco/vue-photoswipe-directive.svg)](https://github.com/zh-rocco/vue-photoswipe-directive/stargazers)
[![devDependencies](https://img.shields.io/david/dev/zh-rocco/vue-photoswipe-directive.svg)](https://david-dm.org/zh-rocco/vue-photoswipe-directive?type=dev)
[![npm-version](https://img.shields.io/npm/v/vue-photoswipe-directive.svg?maxAge=3600)](https://www.npmjs.com/package/vue-photoswipe-directive)
[![Github tag](https://img.shields.io/github/tag/zh-rocco/vue-photoswipe-directive.svg?maxAge=3600)](https://github.com/zh-rocco/vue-photoswipe-directive/)
[![Build Status](https://travis-ci.org/zh-rocco/vue-photoswipe-directive.svg?branch=master)](https://travis-ci.org/zh-rocco/vue-photoswipe-directive)
[![GitHub license](https://img.shields.io/github/license/zh-rocco/vue-photoswipe-directive.svg)](https://github.com/zh-rocco/vue-photoswipe-directive/blob/master/LICENSE) [![Greenkeeper badge](https://badges.greenkeeper.io/zh-rocco/vue-photoswipe-directive.svg)](https://greenkeeper.io/)

## Demo

[Try it out](https://zh-rocco.github.io/vue-photoswipe-directive/)

## Requirements

- [`Vue.js 2.x`](https://cn.vuejs.org/)
- `Promise`, `Symbol`

## Advantages

- Simple API.
- Small bundle size: ≈9KB, ≈3KB gzipped (without PhotoSwipe and Promise/Symbol polyfill).

## Installation

```bash
yarn add photoswipe
yarn add vue-photoswipe-directive
```

## Usage

### Registration

#### Base

```js
import createPreviewDirective from "vue-photoswipe-directive";

export default {
  directives: {
    preview: createPreviewDirective()
  }
};
```

#### Options

```js
import createPreviewDirective from "vue-photoswipe-directive";

export default {
  directives: {
    preview: createPreviewDirective({
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
```

### Vue Directive

#### Base

```html
<img v-preview src="./images/01.jpg" />
```

#### Scope

```html
<img v-preview:scope-a src="./images/01.jpg" />
<img v-preview:scope-a src="./images/02.jpg" />
<img v-preview:scope-a src="./images/03.jpg" />
```

## Example

### Include PhotoSwipe dependencies by external links

`index.html`

```html
<!-- Core CSS file -->
<link rel="stylesheet" href="https://unpkg.com/photoswipe/dist/photoswipe.css" />

<!-- Skin CSS file (styling of UI - buttons, caption, etc.)
     In the folder of skin CSS file there are also:
     - .png and .svg icons sprite, 
     - preloader.gif (for browsers that do not support CSS animations) -->
<link rel="stylesheet" href="https://unpkg.com/photoswipe/dist/default-skin/default-skin.css" />

<!-- Core JS file -->
<script src="https://unpkg.com/photoswipe/dist/photoswipe.min.js"></script>

<!-- UI JS file -->
<script src="https://unpkg.com/photoswipe/dist/photoswipe-ui-default.min.js"></script>
```

`*.vue`

```vue
<template>
  <div id="app">
    <img v-preview:scope-a src="./images/01.jpg" />
    <img v-preview:scope-a src="./images/02.jpg" />
    <img v-preview:scope-b src="./images/03.jpg" />
    <img v-preview:scope-a src="./images/04.png" />
    <img v-preview src="./images/05.png" />
    <img v-preview src="./images/06.png" />
    <img v-preview src="./images/07.png" />
    <img v-preview src="./images/08.png" />
    <img v-preview:scope-b src="./images/09.jpg" />
  </div>
</template>

<script>
import createPreviewDirective from "vue-photoswipe-directive";

export default {
  directives: {
    preview: createPreviewDirective({
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

### Include PhotoSwipe dependencies by modules

`*.vue`

```vue
<template>
  <div id="app">
    <img v-preview:scope-a src="./images/01.jpg" />
    <img v-preview:scope-a src="./images/02.jpg" />
    <img v-preview:scope-b src="./images/03.jpg" />
    <img v-preview:scope-a src="./images/04.png" />
    <img v-preview src="./images/05.png" />
    <img v-preview src="./images/06.png" />
    <img v-preview src="./images/07.png" />
    <img v-preview src="./images/08.png" />
    <img v-preview:scope-b src="./images/09.jpg" />
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import createPreviewDirective from "vue-photoswipe-directive";

export default {
  directives: {
    preview: createPreviewDirective({
      shareEl: false, // 隐藏分享按钮
      fullscreenEl: false, // 隐藏全屏按钮
      history: false, // 禁用 history 模式
      tapToClose: false, // 禁用点击空白区退出
      escKey: false, // 禁用 ESC 键退出
      clickToCloseNonZoomable: false, // 禁止图像小于视口大小时，鼠标点击图像会关闭图库
      bgOpacity: 0.8, // 背景透明度
      allowPanToNext: false, // 禁止图片放大时滑动到上/下一页
      pinchToClose: false // 禁用双指捏合关闭
    }, PhotoSwipe, PhotoSwipeUI)
  }
};
</script>
```

## Development

```bash
yarn serve
```

## Build

```bash
yarn build:lib
```

## Todo

- [ ] Expand the advanced API. 
- [ ] Add test files.

## License

MIT © [zh-rocco](https://github.com/zh-rocco)
