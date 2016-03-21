/*!
 * object.pick <https://github.com/jonschlinkert/object.pick>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var File = require('vinyl');
var pick = require('./');

describe('.pick()', function() {
  it('should return an empty object when the value is falsey', function() {
    assert.deepEqual(pick(null, 'a'), {});
    assert.deepEqual(pick(false, 'a'), {});
    assert.deepEqual(pick('', 'a'), {});
  });

  it('should pick a property from an object', function() {
    assert.deepEqual(pick({a: 'a', b: 'b'}, 'a'), {a: 'a'});
  });

  it('should pick getter properties', function() {
    var file = new File({path: __filename, contents: new Buffer('foo')});
    var obj = pick(file, ['cwd', 'relative', 'base', 'contents', 'stat', 'history']);
    assert(obj.hasOwnProperty('cwd'));
    assert(obj.hasOwnProperty('base'));
    assert(obj.hasOwnProperty('relative'));
    assert(obj.hasOwnProperty('contents'));
    assert(obj.hasOwnProperty('stat'));
    assert(obj.hasOwnProperty('history'));
    assert.equal(obj.relative, 'test.js');
  });

  it('should pick a property from a function', function() {
    function fn() {}
    fn.a = 'foo';
    fn.b = 'bar';
    assert.deepEqual(pick(fn, 'a'), {a: 'foo'});
  });

  it('should pick multiple properties', function() {
    assert.deepEqual(pick({a: 'a', b: 'b', c: 'c'}, ['a', 'b']), {a: 'a', b: 'b'});
    assert.deepEqual(pick({foo: 'foo', bar: 'bar', baz: 'baz'}, ['foo', 'bar']), {foo: 'foo', bar: 'bar'});
  });

  it('should ignore keys that do not exist', function() {
    assert.deepEqual(pick({a: 'a', b: 'b', c: 'c'}, ['a', 'b', 'foo']), {a: 'a', b: 'b'});
    assert.deepEqual(pick({foo: 'foo', bar: 'bar', baz: 'baz'}, ['foo', 'bar', 'abc']), {foo: 'foo', bar: 'bar'});
  });
});
