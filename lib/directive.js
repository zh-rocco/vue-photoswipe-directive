import Vue from 'vue'
import PreviewerComponent from './Previewer'

const Previewer = Vue.extend(PreviewerComponent)
const previewerClass = 'v-previewer-exhibition'
const thumbnailClass = 'v-previewer-thumbnail'
const pool = {}
const scopes = {}
let count = 0

function instancePreviewer () {
  window.$previewer = new Previewer().$mount(document.createElement('div'))
  window.$previewer.$el.classList.add(previewerClass)
  document.body.appendChild(window.$previewer.$el)
}

function getImageSize (imgSrc) {
  return new Promise(resolve => {
    const img = new Image()

    img.onload = function () {
      resolve([null, { w: this.width, h: this.height }])
    }
    img.onerror = function (err) {
      resolve([err])
    }

    img.src = imgSrc
  })
}

async function setImageSize (item) {
  const { msrc, src } = item
  const [error, size] = await getImageSize(msrc || src)

  if (error) {
    item.w = 0
    item.h = 0
  } else {
    item.w = size.w
    item.h = size.h
  }
}

function clickHandler () {
  if (!window.$previewer) {
    instancePreviewer()
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
    thumbnails = [].slice.call(document.querySelectorAll(`.${thumbnailClass}[data-scope='${scope}']`))
  } else {
    index = 0
    list = pool[idx] ? [pool[idx]] : []
    thumbnails = [].slice.call(document.querySelectorAll(`.${thumbnailClass}[data-idx='${idx}']`))
  }

  if (index < 0 || !list.length || !thumbnails.length) {
    console.err('Params Error', index, list.length, thumbnails.length)
    return
  }

  window.$previewer.show(index, list, {
    getThumbBoundsFn (index) {
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      const rect = thumbnails[index].getBoundingClientRect()
      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
    },
    ...this._options
  })
}

export function createPreviewerDirective (options) {
  return {
    async inserted (el, binding, vnode, oldVnode) {
      // eslint-disable-next-line no-unused-vars
      const { value, arg: scope, modifiers } = binding

      el.classList.add(thumbnailClass)
      el.dataset.idx = count
      count++

      if (scope) {
        el.dataset.scope = scope
        scopes[scope] = scopes[scope] || []
        scopes[scope].push(el.dataset.idx)
      }

      const dataSrc = el.dataset.src
      const src = el.src

      if (src || dataSrc) {
        const item = { src: dataSrc || src, msrc: src || dataSrc }
        pool[el.dataset.idx] = item
        setTimeout(() => void setImageSize(item))
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

export default createPreviewerDirective()
