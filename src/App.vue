<template>
  <div id="app">
    <h2>Normal</h2>

    <div class="container normal">
      <img v-preview:scope-a src="./images/01.jpg" alt="image 01" />
      <img v-preview:scope-a src="./images/05.png" alt="image 05" />
      <img v-preview src="./images/07.png" alt="image 07" />
    </div>

    <h2>Lazy Load</h2>

    <div class="container lazy" v-lazy-container="{ selector: 'img' }">
      <img v-preview:scope-b :data-src="imageContext('./01.jpg')" alt="image 01" />
      <img v-preview:scope-b :data-src="imageContext('./02.jpg')" alt="image 02" />
      <img v-preview :data-src="imageContext('./03.jpg')" alt="image 03" />
      <img v-preview :data-src="imageContext('./04.png')" alt="image 04" />
      <img v-preview :data-src="imageContext('./05.png')" alt="image 05" />
      <img v-preview :data-src="imageContext('./06.png')" alt="image 06" />
      <img v-preview :data-src="imageContext('./07.png')" alt="image 07" />
      <img v-preview :data-src="imageContext('./08.png')" alt="image 08" />
      <img v-preview:scope-b :data-src="imageContext('./09.jpg')" alt="image 09" />
    </div>
  </div>
</template>

<script>
import createPreviewDirective from '../lib/directive'

const imageContext = require.context('./images/', false, /\.(png|jpg)$/)

export default {
  name: 'app',
  directives: {
    preview: createPreviewDirective({
      shareEl: false, // 隐藏分享按钮
      history: false, // 禁用 history 模式
      clickToCloseNonZoomable: false, // 禁止图像小于视口大小时，鼠标点击图像会关闭图库
      bgOpacity: 0.8, // 背景透明度
      allowPanToNext: false // 禁止图片放大时滑动到上/下一页
    })
  },
  methods: { imageContext }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h2 {
  margin-top: 50px;
}

.container {
  &.normal {
    img {
      height: 60px;
      margin-bottom: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  &.lazy img {
    width: 100%;
  }
}
</style>
