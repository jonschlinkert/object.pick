/*!
 * object.pick <https://github.com/jonschlinkert/object.pick>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var isObject = require('isobject');

module.exports = function pick(obj, keys) {
  if (!isObject(obj) && typeof obj !== 'function') {
    return {};
  }
  var newKey;
  var aliasKeys;

  var res = {};
  if (typeof keys === 'string') {
    aliasKeys = transAliasKey(keys);
    newKey = aliasKeys.newKeys;
    keys = aliasKeys.keys;
    if (keys in obj) {
      res[newKey] = obj[keys];
    }
    return res;
  }

  var len = keys.length;
  var idx = -1;

  while (++idx < len) {
    var key = keys[idx];
    aliasKeys = transAliasKey(key);
    newKey = aliasKeys.newKeys;
    key = aliasKeys.keys;
    if (key in obj) {
      res[newKey] = obj[key];
    }
  }
  return res;
};

/**
 * Get real key from alias key
 * @param {String|Array} keys keys or alias to pick
 * @returns {Object} obj
 * @returns {String} obj.newKeys target key as alias or not
 * @returns {String} obj.keys source key to pick
 */
function transAliasKey (keys) {
  var alias = keys.trim().split(/\s+as\s+/);
  var newKeys = keys;
  if (alias.length == 2) {
    newKeys = alias[1];
    keys = alias[0];
  }
  return {
    newKeys: newKeys,
    keys: keys
  }
}