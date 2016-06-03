const rbr = require('./index.js');
const test = require('ava');

test('Testando um domínio disponível', t => {
  return rbr('ftonato.com.br').then(result => {
    t.true(result.available);
  });
});

test('Testando domínio indisponível', t => {
  return rbr('google.com.br').then(result => {
    t.false(result.available);
  });
});

test('testando domínio com palavras reservadas', t => {
  return rbr('braziljs.org').then(result => {
    t.false(result.available);
  });
});