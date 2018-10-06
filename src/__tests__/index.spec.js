const test = require('tape');
const apply = require('..');

test('handles basic object', assert => {
  const stencil = { name: '{{name}}', age: 18, spouse: null };
  const view = { name: 'world' };
  const actual = apply(stencil, view);
  assert.equals(actual.name, view.name);
  assert.end();
});

test('handles nested object', assert => {
  const stencil = { name: { first: '{{name}}' } };
  const view = { name: 'world' };
  const actual = apply(stencil, view);
  assert.equals(actual.name.first, view.name);
  assert.end();
});

test('handles arrays', assert => {
  const stencil = ['{{name}}'];
  const view = { name: 'world' };
  const actual = apply(stencil, view);
  assert.equals(actual[0], view.name);
  assert.end();
});

test(`handles 'depth' option`, assert => {
  const stencil = { name: { first: '{{name}}' } };
  const view = { name: 'world' };
  const actual = apply(stencil, view, { depth: 0 });
  assert.equals(actual.name.first, stencil.name.first);
  assert.end();
});

test(`handles 'renderer' option`, assert => {
  const stencil = { name: { first: '{{name}}' } };
  const view = { name: 'world' };
  const actual = apply(stencil, view, { renderer: value => value });
  assert.equals(actual.name.first, stencil.name.first);
  assert.end();
});
