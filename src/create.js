import {maxDivisor} from './utils'

const P0 = 'data:image/gif;base64,R0lGODlh'
const P1 = 'AIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

/*
 * return base64 encoded gif
 *
 * @param  {Number} width
 * @param  {Number} height
 * @return {String}
 */
function create(width, height) {
  return P0 + encodeSize(width, height) + P1
}

/*
 * encode width and height
 * support 1 ~ 63 px (for now)
 *
 * @param  {Array} width
 * @param  {Array} height
 * @return {String}
 */
function encodeSize(width, height) {
  if (!width) width = 1
  if (!height) height = width

  let table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    index64 = table.split(''),
    code = '',
    divisor = maxDivisor(width, height)

  if (divisor > 1) {
    width = width / divisor
    height = height / divisor
  }

  if (width > 63 || height > 63) {
    if (width > height) {
      height = Math.round(63 * height / width)
      width = 63
    } else {
      width = Math.round(63 * width / height)
      height = 63
    }

  }

  code += index64[(width & 0xfc) >> 2] + index64[(width & 3) << 4]
  code += index64[(height & 0xfc) >> 6] + index64[height]

  return code
}

export default create
