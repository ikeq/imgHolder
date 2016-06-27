import create from './create'
import {forEach} from './utils'

export var encode = create

export function run(node) {
  let elems = (node || document).querySelectorAll('[data-src]')

  if (!elems.length) return false

  forEach(elems, (img) => {
    let [src, width, height] = img.dataset.src.split('|'),
      imgLoader = new Image

    img.src = create(width, height)

    delete img.dataset.src

    imgLoader.onload = function() {
      img.src = src
      imgLoader = null
    }

    imgLoader.src = src
  })
}
