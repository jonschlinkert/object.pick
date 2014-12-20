/*!
 * object.pick <https://github.com/jonschlinkert/object.pick>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

module.exports = function pick(obj, keys) {
  var res = {};
  var i = 0;

  if (typeof obj !== 'object') {
    return res;
  }

  if (typeof keys === 'string') {
    if (obj.hasOwnProperty(keys)) {
      res[keys] = obj[keys];
    }
    return res;
  }

  var len = keys.length;

  while (len--) {
    var key = keys[i++];
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key];
    }
  }
  return res;
};
