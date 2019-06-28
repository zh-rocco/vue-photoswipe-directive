<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe.
    It's a separate element as animating opacity is faster than rgba().-->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
      Don't modify these 3 pswp__item elements, data is added later on.-->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

          <button class="pswp__button pswp__button--share" title="Share"></button>

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import UI from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

const DEFAULT_OPTIONS = {
  // shareEl: false, // 隐藏分享按钮
  // fullscreenEl: false, // 隐藏全屏按钮
  // history: false, // 禁用 history 模式
  // tapToClose: false, // 禁用点击空白区退出
  // escKey: false, // 禁用 ESC 键退出
  // clickToCloseNonZoomable: false, // 禁止图像小于视口大小时，鼠标点击图像会关闭图库
  // bgOpacity: 0.9, // 背景透明度
  // allowPanToNext: false, // 禁止图片放大时滑动到上/下一页
  // pinchToClose: false // 禁用双指捏合关闭
}

export default {
  name: 'Previewer',

  methods: {
    show (index, items, opts) {
      const options = { index, ...DEFAULT_OPTIONS, ...opts }
      this.$photoswipe = new PhotoSwipe(this.$el, UI, items, options)
      this.$addListeners()
      this.$photoswipe.init()
    },

    $addListeners () {
      this.$photoswipe.listen('close', () => {
        const hideAnimationDuration = this.$photoswipe.options.hideAnimationDuration
        setTimeout(() => {
          const exhibitions = document.querySelectorAll('.v-previewer-exhibition')

          for (const exhibition of exhibitions) {
            document.body.removeChild(exhibition)
          }

          window.$previewer.$destroy()
          window.$previewer = null
          this.$photoswipe.destroy()
          this.$photoswipe = null
        }, hideAnimationDuration)
      })
    }
  }
}
</script>
