# vue-photoswipe-directive

> An image previewer for vue, powered by [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe).

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)
[![downloads](https://img.shields.io/npm/dt/vue-photoswipe-directive.svg)](http://npm-stats.com/~packages/vue-photoswipe-directive)
[![GitHub stars](https://img.shields.io/github/stars/zh-rocco/vue-photoswipe-directive.svg)](https://github.com/zh-rocco/vue-photoswipe-directive/stargazers)
[![devDependencies](https://img.shields.io/david/dev/zh-rocco/vue-photoswipe-directive.svg)](https://david-dm.org/zh-rocco/vue-photoswipe-directive?type=dev)
[![npm-version](https://img.shields.io/npm/v/vue-photoswipe-directive.svg?maxAge=3600)](https://www.npmjs.com/package/vue-photoswipe-directive)
[![Github tag](https://img.shields.io/github/tag/zh-rocco/vue-photoswipe-directive.svg?maxAge=3600)](https://github.com/zh-rocco/vue-photoswipe-directive/)
[![Build Status](https://travis-ci.org/zh-rocco/vue-photoswipe-directive.svg?branch=master)](https://travis-ci.org/zh-rocco/vue-photoswipe-directive)
[![GitHub license](https://img.shields.io/github/license/zh-rocco/vue-photoswipe-directive.svg)](https://github.com/zh-rocco/vue-photoswipe-directive/blob/master/LICENSE)

## Demo

![DEMO](https://repository-images.githubusercontent.com/194109246/dc703a00-9b42-11e9-920a-e84b3b3b7ac3)

[Try it out](https://zh-rocco.github.io/vue-photoswipe-directive/)

## Requirements

- [`Vue.js 2.x`](https://cn.vuejs.org/)
- [`PhotoSwipe`](https://github.com/dimsemenov/PhotoSwipe)

## Advantages

- Simple API.
- Small bundle size: ≈7KB (≈3KB gzipped, without PhotoSwipe).

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
    preview: createPreviewDirective(photoswipeOptions)
  }
};
```

### Vue Directive

#### Base

```html
<img v-preview src="./images/01.jpg" alt="image 01" />
```

#### Scope

```html
<img v-preview:scope-a src="./images/01.jpg" alt="image 01" />
<img v-preview:scope-a src="./images/02.jpg" alt="image 02" />
<img v-preview src="./images/03.jpg" alt="image 03" />
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
    <img v-preview:scope-a src="./images/01.jpg" alt="image 01" />
    <img v-preview:scope-a src="./images/02.jpg" alt="image 02" />
    <img v-preview:scope-b src="./images/03.jpg" alt="image 03" />
    <img v-preview:scope-a src="./images/04.png" alt="image 04" />
    <img v-preview src="./images/05.png" alt="image 05" />
    <img v-preview src="./images/06.png" alt="image 06" />
    <img v-preview src="./images/07.png" alt="image 07" />
    <img v-preview src="./images/08.png" alt="image 08" />
    <img v-preview:scope-b src="./images/09.jpg" alt="image 09" />
  </div>
</template>

<script>
import createPreviewDirective from "vue-photoswipe-directive";

export default {
  directives: {
    preview: createPreviewDirective()
  }
};
</script>
```

### Include PhotoSwipe dependencies by modules

`*.vue`

```vue
<template>
  <div id="app">
    <img v-preview:scope-a src="./images/01.jpg" alt="image 01" />
    <img v-preview:scope-a src="./images/02.jpg" alt="image 02" />
    <img v-preview:scope-b src="./images/03.jpg" alt="image 03" />
    <img v-preview:scope-a src="./images/04.png" alt="image 04" />
    <img v-preview src="./images/05.png" alt="image 05" />
    <img v-preview src="./images/06.png" alt="image 06" />
    <img v-preview src="./images/07.png" alt="image 07" />
    <img v-preview src="./images/08.png" alt="image 08" />
    <img v-preview:scope-b src="./images/09.jpg" alt="image 09" />
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
    preview: createPreviewDirective(null, PhotoSwipe, PhotoSwipeUI)
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
