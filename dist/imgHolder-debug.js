/*!
 * imgHolder.js v0.2.0
 * https://elmorec.github.io/imgHolder.js
 *
 * Licensed MIT © Elmore Cheng
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.imgHolder = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.utils);
    global.create = mod.exports;
  }
})(this, function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var P0 = 'data:image/gif;base64,R0lGODlh';
  var P1 = 'AIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

  /*
   * return base64 encoded gif
   *
   * @param  {Number} width
   * @param  {Number} height
   * @return {String}
   */
  function create(width, height) {
    return P0 + encodeSize(width, height) + P1;
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

    var table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        index64 = table.split(''),
        code = '',
        divisor = (0, _utils.maxDivisor)(width, height);

    if (divisor > 1) {
      width = width / divisor;
      height = height / divisor;
    }

    if (width > 63 || height > 63) {
      if (width > height) {
        height = Math.round(63 * height / width);
        width = 63;
      } else {
        width = Math.round(63 * width / height);
        height = 63;
      }
    }

    code += index64[(width & 0xfc) >> 2] + index64[(width & 3) << 4];
    code += index64[(height & 0xfc) >> 6] + index64[height];

    return code;
  }

  exports.default = create;
});

},{"./utils":3}],2:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './create', './utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./create'), require('./utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.create, global.utils);
    global.index = mod.exports;
  }
})(this, function (exports, _create, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.encode = undefined;
  exports.run = run;

  var _create2 = _interopRequireDefault(_create);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var encode = exports.encode = _create2.default;

  function run(node) {
    var elems = (node || document).querySelectorAll('[data-src]');

    if (!elems.length) return false;

    (0, _utils.forEach)(elems, function (img) {
      var _img$dataset$src$spli = img.dataset.src.split('|');

      var src = _img$dataset$src$spli[0];
      var width = _img$dataset$src$spli[1];
      var height = _img$dataset$src$spli[2];
      var imgLoader = new Image();

      img.src = (0, _create2.default)(width, height);

      delete img.dataset.src;

      imgLoader.onload = function () {
        img.src = src;
        imgLoader = null;
      };

      imgLoader.src = src;
    });
  }
});

},{"./create":1,"./utils":3}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.utils = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.maxDivisor = maxDivisor;
  exports.forEach = forEach;
  function maxDivisor(a, b) {
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

  function forEach(list, fn) {
    return Array.prototype.forEach.call(list, fn);
  }
});

},{}]},{},[2])(2)
});