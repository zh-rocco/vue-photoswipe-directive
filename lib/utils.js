export function getImageSize (imgSrc) {
  return new Promise(resolve => {
    const img = new Image()

    img.onload = function () {
      resolve([null, { w: this.width || 0, h: this.height || 0 }])
    }
    img.onerror = function (err) {
      resolve([err, {}])
    }

    img.src = imgSrc
  })
}

export async function setOriginImageSize (current) {
  const { src, msrc, srcLoaded } = current

  if (src !== msrc && !srcLoaded) {
    const [error, { w, h }] = await getImageSize(src)
    if (!error) {
      current.w = w
      current.h = h
      current.srcLoaded = true
    }
  }
}
