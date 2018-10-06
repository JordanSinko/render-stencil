# render-stencil

[![Travis branch](https://img.shields.io/travis/JordanSinko/render-stencil/master.svg)](https://travis-ci.org/JordanSinko/render-stencil)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=com.jordansinko.render-stencil&metric=alert_status)](https://sonarcloud.io/dashboard?id=com.jordansinko.render-stencil)
![npm](https://img.shields.io/npm/dm/render-stencil.svg)
![npm](https://img.shields.io/npm/l/render-stencil.svg)

Overview

## Installation

```bash
npm install render-stencil
```

## API

### `render-stencil(template, variables, options)`

Description

```js
// Works with objects and arrays:
const render = require('render-stencil');
const stencil = { name: '{{name}}', hobbies: ['{{hobby}}'] };
const rendered = render(stencil, { name: 'John', hobby: 'coding' }); // -> { name: 'John', hobbies: ['coding'] }

// Works with nested views:
const render = require('render-stencil');
const stencil = { name: '{{name.first}}' };
const rendered = render(stencil, { name: { first: 'John' } }); // -> { name: 'John' }

// Works with strings:
const render = require('render-stencil');
const rendered = render('Hello, {{name}}!', { name: 'John' }); // -> Hello, John!

// If you only need to replace string stencils, then you can also do this:
const render = require('render-stencil/string');
const rendered = render('Hello, {{name}}!', { name: 'John' }); // -> Hello, John!
```

## License

MIT
