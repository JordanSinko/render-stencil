var renderString = require('./string');

var objToStr = o => Object.prototype.toString.call(o);
var objCloneBase = o => Object.create(Object.getPrototypeOf(o));
var isArray = o => typeof o === 'object' && objToStr(o) === '[object Array]';
var isObject = o => typeof o === 'object' && objToStr(o) === '[object Object]';

module.exports = function render(stencil, view, options) {
  var depth, renderer;

  if (isObject(options)) {
    depth = options.depth;
    renderer = options.renderer;
  }

  if (typeof depth === 'undefined') depth = Infinity;

  function _render(parent, child, depth, renderer) {
    if (child === null) return null;
    if (depth === 0) return child;
    if (typeof child === 'string') return renderer(child, key);
    if (typeof child !== 'object') return child;

    var clone = isArray(child) ? [] : objCloneBase(child);

    for (var index in child) {
      var key = _render(null, index, depth - 1, renderer);
      var value = _render(key, child[index], depth - 1, renderer);
      clone[key] = value;
    }

    return clone;
  }

  return _render(null, stencil, depth, (value, key) => {
    return renderer
      ? renderer(value, view, key)
      : renderString(value, view, options);
  });
};
