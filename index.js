#! /usr/bin/env node
'use strict';

const fetch = require('node-fetch');
const baseUrl = 'https://registro.br/ajax/avail/';

module.exports = function (url) {
  return fetch(`${baseUrl}${url}`).then(response => response.json());
};