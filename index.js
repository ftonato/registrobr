'use strict';

const fetch = require('node-fetch');

module.exports = function (url) {
  return fetch('http://registro.br/cgi-bin/avail/?qr=' + url)
    .then(function(response) {
      return response.json()
    });
};