/**
 * imgholder.js
 * https://github.com/elmorec/imgHolder
 * licensed under MIT license
 */

(function (window) {
'use strict';
/*
 * calc the max divisor
 */
function maxDivisor (a, b) {
  var divisor = 0,
    tmp = 1;

  while (tmp) {
    tmp = b % a;
    divisor = b / a;
    b = a;
    a = tmp;
  }

  return b;
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
  if (!width) width = 1;
  if (!height) height = width;

  var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    index64 = [],
    code = '',
    divisor = maxDivisor(width, height),
    i;

  if (divisor > 1) {
    width = width / divisor;
    height = height / divisor;
  };

  if (width > 63 || height > 63) {
    if (width > height) {
      height = Math.round(63 * height / width);
      width = 63;
    } else {
      width = Math.round(63 * width / height);
      height = 63;
    }

  }

  for (i = 0; i < table.length; i++)
    index64[i] = table[i];

  code += index64[(width & 0xfc) >> 2] + index64[(width & 3) << 4];
  code += index64[(height & 0xfc) >> 6] + index64[height];

  return code;
}

var p0 = 'data:image/gif;base64,R0lGODlh',
    p1 = 'AIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

/*
 * return gif url
 *
 * @param  {Number} width
 * @param  {Number} height
 * @return {String}
 */
function create(width, height) {
  return p0 + encodeSize(width, height) + p1;
}

function imgHolder (node) {
  var elems = (node || document).querySelectorAll('[data-src]');

  if (!elems.length) return false;

  Array.prototype.forEach.call(elems, function (img) {
    var pre = img.dataset.src.split('|'),
      src = pre[0],
      width = pre[1],
      height = pre[2],
      imgLoader = new Image;

    img.src = create(width, height);
    delete img.dataset.src;

    imgLoader.onload = function () {
      img.src = src;
      imgLoader = null;
    }

    imgLoader.src = src;
  })
}

imgHolder.create = create;

if (window.define) {
  if (define === 'function' && define.amd || define.cmd)
    define(function () { return imgHolder; });
} else {
  window.imgHolder = imgHolder;
}

})(window);
