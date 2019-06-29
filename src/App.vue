<template>
  <div id="app">
    <img v-preview:scope-a src="./images/01.jpg">
    <img v-preview:scope-a src="./images/02.jpg">
    <img v-preview:scope-b src="./images/03.jpg">
    <img v-preview:scope-a src="./images/04.png">
    <img v-preview src="./images/05.png">
    <img v-preview src="./images/06.png">
    <img v-preview src="./images/07.png">
    <img v-preview src="./images/08.png">
    <img v-preview:scope-b src="./images/09.jpg">
  </div>
</template>

<script>
import createPreviewDirective from '../lib/directive'

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
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  img {
    height: 80px;
    margin-right: 10px;
  }
}
</style>
