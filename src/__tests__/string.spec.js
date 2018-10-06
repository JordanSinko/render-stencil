const test = require('tape');
const apply = require('../string.js');

test('handles basic', assert => {
  const stencil = 'Hello, {{name}}!';
  const view = { name: 'world' };
  assert.equals(apply(stencil, view), 'Hello, world!');
  assert.end();
});

test('handles with unknowns', assert => {
  const stencil = 'Hello, {{name}}!';
  const view = { value: 'world' };
  assert.equals(apply(stencil, view), 'Hello, {{name}}!');
  assert.end();
});

test('handles exact matches', assert => {
  const stencil = '{{address}}';
  const view = { address: { zipCode: 55555 } };
  const actual = apply(stencil, view);
  assert.equals(actual.zipCode, view.address.zipCode);
  assert.end();
});

test(`handles 'replaceUnknownsWith' option`, assert => {
  const stencil = 'Hello, {{name}}!';
  const view = { value: 'world' };
  const options = { replaceUnknownsWith: 'foo' };
  assert.equals(apply(stencil, view, options), 'Hello, foo!');
  assert.end();
});

test(`handles 'matcher' option`, assert => {
  const stencil = 'Hello, ${name}!';
  const view = { name: 'world' };
  const options = { matcher: /\${([a-zA-Z.-_0-9]+)}/ };
  assert.equals(apply(stencil, view, options), 'Hello, world!');
  assert.end();
});

test(`handles 'excludes' option`, assert => {
  const stencil = 'Hello, {{name}}!';
  const view = { name: 'world' };
  const options = { excludes: ['{{name}}'] };
  assert.equals(apply(stencil, view, options), stencil);
  assert.end();
});

test(`handles 'excludes' option`, assert => {
  const stencil = 'Hello, {{name}}!';
  const view = { name: 'world' };
  const options = { excludes: ['{{name}}'] };
  assert.equals(apply(stencil, view, options), stencil);
  assert.end();
});

test(`handles converting objects to string if needed`, assert => {
  const stencil = 'Hello, {{name}}!';
  const view = { name: { first: 'Jordan' } };
  assert.equals(apply(stencil, view), 'Hello, {"first":"Jordan"}!');
  assert.end();
});

test(`handles converting non-objects to string if needed`, assert => {
  const stencil = 'I am {{age}}!';
  const view = { age: 18 };
  assert.equals(apply(stencil, view), 'I am 18!');
  assert.end();
});

test(`handles nested objects`, assert => {
  const stencil = 'I am {{person.name}}!';
  const view = { person: { name: 'John' } };
  assert.equals(apply(stencil, view), 'I am John!');
  assert.end();
});

test(`handles non-string stencils`, assert => {
  const stencil = true;
  assert.equals(apply(stencil, {}), stencil);
  assert.end();
});
