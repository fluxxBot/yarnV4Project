'use strict';

const _ = require('lodash');

function greet(name) {
  return `Hello, ${_.capitalize(name)}! (from @yarn-bughunt/lib)`;
}

function add(a, b) {
  return a + b;
}

module.exports = { greet, add };
