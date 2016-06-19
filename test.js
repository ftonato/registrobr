const rbr = require('./index.js');
const test = require('ava');
const execa = require('execa');

test('Testando um domínio disponível', t => {
  rbr('ftonato.com.br').then(result => {
    t.true(result.available);
  });
});

test('Testando domínio indisponível', t => {
  rbr('google.com.br').then(result => {
    t.false(result.available);
  });
});

test('testando domínio com palavras reservadas', t => {
  rbr('braziljs.org').then(result => {
    t.false(result.available);
  });
});

test('deve retornar uma exceção quando a extensão é inválida', t => {
  t.throws(execa('./cli.js', ['test.com']), /A url informada deve possuir a extensão .br/);
});

test('deve retornar uma exceção quando a url é inválida', t => {
  t.throws(execa('./cli.js'), /Por favor, digite uma url válida./);
});