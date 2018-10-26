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

test('deve retornar uma exceção quando a extensão não tiver .br', t => {
  t.throws(execa('./cli.js', ['test.com']), / url informada deve possuir uma das seguintes extensões:/);
});

test('deve retornar uma exceção quando a extensão se o tamanho for menor de dois caracteres', t => {
  t.throws(execa('./cli.js', ['a.com.br']), /O Hostname deve ter no mínimo de 2 e máximo de 26 caracteres./);
});

test('deve retornar uma exceção quando a extensão se o tamanho for maior que 26 caracteres', t => {
  const url = 'a'.repeat(27) + '.com.br';
  t.throws(execa('./cli.js', [url]), /O Hostname deve ter no mínimo de 2 e máximo de 26 caracteres./);
});

test('deve retornar uma exceção quando a hostname terminar com hífen', t => {
  t.throws(execa('./cli.js', ['test-.com.br']), /O Hostname não deve conter hífen no ínicio ou final./);
});

test('deve retornar uma exceção quando o hostname conter apenas números', t => {
  t.throws(execa('./cli.js', ['32132123.com.br']), /O Hostname não deve conter apenas números./);
});

test('deve retornar uma exceção quando o hostname conter caracteres inválidos', t => {
  t.throws(execa('./cli.js', ['te$t.com.br']), /O Hostname deve ser a-z, 0-9, hífen e os seguintes caracteres acentuados: à, á, â, ã, é, ê, í, ó, ô, õ, ú, ü, ç./);
});

test('deve retornar uma exceção quando a hostname iniciar com hífen', t => {
  t.throws(execa('./cli.js', ['-test.com.br']), /O Hostname não deve conter hífen no ínicio ou final./);
});

test('deve retornar uma exceção quando a url é inválida', t => {
  t.throws(execa('./cli.js'), /Por favor, digite uma url válida./);
});