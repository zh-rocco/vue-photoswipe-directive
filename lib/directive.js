import Vue from 'vue'
import PhotoSwipeComponent from './PhotoSwipe'

const PhotoSwipeConstructor = Vue.extend(PhotoSwipeComponent)
const exhibitionClassName = 'v-photoswipe-exhibition'
const thumbnailClassName = 'v-photoswipe-thumbnail'
const pool = {}
const scopes = {}
let _PhotoSwipe
let _PhotoSwipeUI
let count = 0

function createPreviewer () {
  window.$previewer = new PhotoSwipeConstructor().$mount(document.createElement('div'))
  window.$previewer.$el.classList.add(exhibitionClassName)
  document.body.appendChild(window.$previewer.$el)
}

function setImageSize ($img, item) {
  const { w, h } = item
  if (w || h) return

  function imgLoadHandler () {
    item.w = this.naturalWidth
    item.h = this.naturalHeight
    $img.removeEventListener('load', imgLoadHandler)
  }

  function imgErrorHandler () {
    item.w = 0
    item.h = 0
    $img.removeEventListener('error', imgErrorHandler)
  }

  $img.addEventListener('load', imgLoadHandler)
  $img.addEventListener('error', imgErrorHandler)
}

function clickHandler () {
  if (!window.$previewer) {
    createPreviewer()
  }

  const { scope, idx } = this.dataset
  let index
  let list
  let thumbnails

  if (scope) {
    index = scopes[scope].indexOf(idx)
    list = scopes[scope].reduce((acc, curr) => {
      pool[curr] && acc.push(pool[curr])
      return acc
    }, [])
    thumbnails = [].slice.call(document.querySelectorAll(`.${thumbnailClassName}[data-scope='${scope}']`))
  } else {
    index = 0
    list = pool[idx] ? [pool[idx]] : []
    thumbnails = [].slice.call(document.querySelectorAll(`.${thumbnailClassName}[data-idx='${idx}']`))
  }

  if (index < 0 || !list.length || !thumbnails.length) {
    console.err('Params Error', index, list.length, thumbnails.length)
    return
  }

  window.$previewer.show(_PhotoSwipe, _PhotoSwipeUI, index, list, {
    getThumbBoundsFn (index) {
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      const rect = thumbnails[index].getBoundingClientRect()
      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
    },
    ...this._options
  })
}

export default function createPreviewDirective (options, PhotoSwipe, PhotoSwipeUI) {
  _PhotoSwipe = PhotoSwipe || window.PhotoSwipe
  _PhotoSwipeUI = PhotoSwipeUI || window.PhotoSwipeUI_Default
  return {
    async inserted (el, binding, vnode, oldVnode) {
      // eslint-disable-next-line no-unused-vars
      const { value, arg: scope, modifiers } = binding

      el.classList.add(thumbnailClassName)
      el.dataset.idx = count
      count++

      if (scope) {
        el.dataset.scope = scope
        scopes[scope] = scopes[scope] || []
        scopes[scope].push(el.dataset.idx)
      }

      const dataSrc = el.dataset.src
      const { src, alt: title, naturalWidth: w, naturalHeight: h } = el

      if (src || dataSrc) {
        pool[el.dataset.idx] = item
        const item = { src: dataSrc || src, msrc: src || dataSrc, title, w, h }
        setTimeout(() => void setImageSize(el, item))
      }

      el._options = options
      el.addEventListener('click', clickHandler)
    },

    unbind (el, binding) {
      const { arg: scope } = binding
      const idx = el.dataset.idx

      el._options = null
      el.removeEventListener('click', clickHandler)
      pool[idx] = null
      if (scope) {
        const list = scopes[scope]
        list.splice(list.indexOf(idx), 1)
        if (!list.length) {
          scopes[scope] = null
        }
      }
    }
  }
}
