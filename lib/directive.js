import Vue from 'vue'
import PhotoSwipeComponent from './PhotoSwipe'
import { setOriginImageSize } from './utils'

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

async function clickHandler () {
  if (!window.$previewer) {
    createPreviewer()
  }

  const { _scope: scope, _idx: idx } = this

  if (!pool[idx]) {
    return
  }

  let index
  let list
  let thumbnails

  if (scope) {
    const items = scopes[scope]
    items.sort((a, b) => a - b) // sort scopes[scope], small to large
    index = items.indexOf(idx)
    list = items.reduce((acc, curr) => {
      pool[curr] && acc.push(pool[curr])
      return acc
    }, [])
    thumbnails = [].slice.call(document.querySelectorAll(`.${thumbnailClassName}`)).filter(({ _scope }) => _scope === scope)
  } else {
    index = 0
    list = pool[idx] ? [pool[idx]] : []
    thumbnails = [].slice.call(document.querySelectorAll(`.${thumbnailClassName}`)).filter(({ _idx }) => _idx === idx)
  }

  if (!list[index] || !thumbnails.length) {
    console.error('VuePhotoswipeDirective: current image was not collected.')
    return
  }

  await setOriginImageSize(list[index])

  window.$previewer.show(_PhotoSwipe, _PhotoSwipeUI, index, list, {
    getThumbBoundsFn (index) {
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      const rect = thumbnails[index].getBoundingClientRect()
      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
    },
    ...this._options
  })
}

function loadHandler () {
  const lazyStatus = this.getAttribute('lazy') // support vue-lazyload
  if (!lazyStatus || lazyStatus === 'loaded') {
    collectImage(this)
  }
}

function collectImage ($img) {
  const src = $img.getAttribute('src')
  const originSrc = $img.dataset.origin

  if (!src && !originSrc) {
    return
  }

  const { _idx: idx, _scope: scope, alt: title, naturalWidth: w, naturalHeight: h } = $img
  const item = { src: originSrc || src, msrc: src, title, w, h }

  pool[idx] = item

  if (scope) {
    const _scope = scopes[scope] = scopes[scope] || []
    if (_scope.indexOf(idx) === -1) {
      _scope.push(idx) // TODO: sort when collecting
    }
  }
}

export default function createPreviewDirective (options, PhotoSwipe, PhotoSwipeUI) {
  _PhotoSwipe = PhotoSwipe || window.PhotoSwipe
  _PhotoSwipeUI = PhotoSwipeUI || window.PhotoSwipeUI_Default

  return {
    inserted (el, binding) {
      if (el.tagName !== 'IMG') {
        console.warn('VuePhotoswipeDirective: only support html "img" tag.')
        return
      }

      const { arg: scope } = binding

      el.classList.add(thumbnailClassName)
      el._idx = '' + count++
      el._options = options
      if (scope) {
        el._scope = scope
      }

      el.addEventListener('load', loadHandler)
      el.addEventListener('click', clickHandler)
    },

    update (el) {
      if (pool[el._idx]) {
        return
      }

      collectImage(el)
    },

    unbind (el, binding) {
      const { arg: scope } = binding
      const idx = el._idx

      el._options = null
      el.removeEventListener('click', clickHandler)
      el.removeEventListener('load', loadHandler)
      delete pool[idx]

      if (scope) {
        const list = scopes[scope]
        if (!list) return
        list.splice(list.indexOf(idx), 1)
        if (!list.length) {
          delete scopes[scope]
        }
      }
    }
  }
}
