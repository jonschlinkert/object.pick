/*!
 * object.pick <https://github.com/jonschlinkert/object.pick>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

const isObject = value => value !== null && typeof value === 'object';

module.exports = function pick(obj, keys) {
  if (!isObject(obj) && typeof obj !== 'function') {
    return {};
  }

  const res = {};
  if (typeof keys === 'string') {
    if (keys in obj) {
      res[keys] = obj[keys];
    }
    return res;
  }

  const len = keys.length;
  let idx = -1;

  while (++idx < len) {
    const key = keys[idx];
    if (key in obj) {
      res[key] = obj[key];
    }
  }
  return res;
};
