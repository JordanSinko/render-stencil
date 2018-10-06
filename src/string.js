var objToStr = o => Object.prototype.toString.call(o);
var isObject = o => typeof o === 'object' && objToStr(o) === '[object Object]';
var isArray = o => typeof o === 'object' && objToStr(o) === '[object Array]';

module.exports = function render(stencil, view, options) {
  if (typeof stencil !== 'string') return stencil;

  var excludes, replaceUnknownsWith, matcher;

  if (isObject(options)) {
    excludes = options.excludes;
    replaceUnknownsWith = options.replaceUnknownsWith;
    matcher = options.matcher;
  }

  if (typeof excludes === 'undefined' || !isArray(excludes)) excludes = [];
  if (typeof matcher === 'undefined') matcher = /{{([a-zA-Z.-_0-9]+)}}/;

  var regex = new RegExp(matcher, 'g');
  var exclusions = excludes.reduce(
    (map, excl) => ((map[excl] = true), map),
    {}
  );

  var exact;
  var stenciled = stencil.replace(regex, (original, path) => {
    if (original in exclusions) return original;

    var isExact = original === stencil;
    var extracted = extractValue(path, view);

    var value =
      extracted !== undefined
        ? extracted
        : replaceUnknownsWith !== undefined
          ? replaceUnknownsWith
          : original;

    return isExact
      ? (exact = value)
      : typeof value === 'object'
        ? JSON.stringify(value)
        : String(value);
  });

  return exact === undefined ? stenciled : exact;
};

function extractValue(path, view) {
  if (view && view[path]) return view[path];

  var parts = path.split('.');
  var part;

  while (view && (part = parts.shift())) {
    view = isObject(view) && part in view ? view[part] : undefined;
  }

  return view;
}
